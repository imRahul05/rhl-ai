#!/usr/bin/env node
/**
 * Pre-publish guard for npm Trusted Publishing (GitHub OIDC).
 *
 * Fails fast when a legacy npm credential could be used instead of OIDC. If a
 * token is present, npm silently falls back to it whenever the OIDC exchange
 * fails, which surfaces as a confusing `EOTP` (token needs 2FA) or `E403`.
 *
 * Never prints secret values: only variable names, file paths and config keys.
 *
 * Usage: node scripts/check-publish-auth.mjs
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const MIN_NPM = [11, 5, 1];
const MIN_NODE = [22, 14, 0];
const EXPECTED_REGISTRY = 'https://registry.npmjs.org/';

const errors = [];
const warnings = [];
const info = (msg) => console.log(`  ${msg}`);

const parse = (v) =>
  v
    .replace(/^v/, '')
    .split('.')
    .map((n) => Number.parseInt(n, 10));
const gte = (a, b) => {
  for (let i = 0; i < 3; i++) {
    if ((a[i] ?? 0) !== b[i]) return (a[i] ?? 0) > b[i];
  }
  return true;
};
const npm = (...args) =>
  execFileSync('npm', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

console.log('npm Trusted Publishing pre-flight');

// 1. Runtime versions
const nodeVersion = process.version;
const npmVersion = npm('--version');
info(`node ${nodeVersion}, npm ${npmVersion}`);
if (!gte(parse(nodeVersion), MIN_NODE))
  errors.push(`Node ${MIN_NODE.join('.')}+ is required (found ${nodeVersion}).`);
if (!gte(parse(npmVersion), MIN_NPM))
  errors.push(
    `npm ${MIN_NPM.join('.')}+ is required for trusted publishing (found ${npmVersion}).`,
  );

// 2. OIDC availability (needs `permissions: id-token: write` on a GitHub-hosted runner)
const hasOidc = Boolean(
  process.env.ACTIONS_ID_TOKEN_REQUEST_URL && process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN,
);
info(`GitHub OIDC available: ${hasOidc ? 'yes' : 'no'}`);
if (process.env.GITHUB_ACTIONS === 'true' && !hasOidc) {
  errors.push('OIDC is not available. Add `permissions: id-token: write` to the release job.');
}

// 3. Legacy credentials in the environment
const tokenEnv = Object.keys(process.env).filter(
  (k) =>
    process.env[k] &&
    (['NPM_TOKEN', 'NODE_AUTH_TOKEN'].includes(k) ||
      /^npm_config_.*(auth|token|password)/i.test(k)),
);
if (tokenEnv.length) {
  errors.push(
    `Legacy npm credential variable(s) set: ${tokenEnv.join(', ')}. Remove them from the release ` +
      'workflow; npm would fall back to them when the OIDC exchange fails.',
  );
} else {
  info('No NPM_TOKEN / NODE_AUTH_TOKEN / npm_config_*auth* variables set');
}

// 4. Credentials in any npmrc npm will read
// (`npm config get userconfig` is protected in some npm versions, so resolve it from env.)
const candidates = new Set(
  [
    process.env.npm_config_userconfig,
    path.join(os.homedir(), '.npmrc'),
    path.resolve('.npmrc'),
    process.env.NPM_CONFIG_USERCONFIG,
  ].filter(Boolean),
);
const AUTH_KEY = /(^|:)(_authToken|_auth|_password|username)\s*=/;
for (const file of candidates) {
  if (!fs.existsSync(file)) continue;
  const keys = fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && !line.startsWith(';') && AUTH_KEY.test(line))
    .map((line) => line.split('=')[0].trim());
  if (keys.length) {
    errors.push(
      `${file} contains npm credential key(s): ${keys.join(', ')}. Remove them (e.g. drop registry-url from setup-node).`,
    );
  } else {
    info(`${file}: no credential keys`);
  }
}

// 5. Registry
const registry = npm('config', 'get', 'registry');
info(`registry: ${registry}`);
if (registry.replace(/\/?$/, '/') !== EXPECTED_REGISTRY) {
  errors.push(`Registry is ${registry}; expected ${EXPECTED_REGISTRY}.`);
}

// 6. Probe the trusted-publisher exchange for every package that is about to be
// published. npm performs this same exchange during `npm publish` but only logs
// failures at verbose level and then reports a generic ENEEDAUTH, so surface the
// registry's real reason here. The exchanged token is discarded, never printed.
if (hasOidc && !errors.length) {
  const idRes = await fetch(
    `${process.env.ACTIONS_ID_TOKEN_REQUEST_URL}&audience=${encodeURIComponent('npm:registry.npmjs.org')}`,
    { headers: { Authorization: `Bearer ${process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN}` } },
  );
  const idToken = idRes.ok ? (await idRes.json()).value : undefined;
  if (!idToken) {
    errors.push(`Could not obtain a GitHub OIDC id_token (HTTP ${idRes.status}).`);
  } else {
    // Non-secret claims, to compare with each package's Trusted Publisher settings on npmjs.com.
    const claims = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64url').toString('utf8'));
    info(
      `OIDC claims: repository=${claims.repository} workflow_ref=${claims.workflow_ref} ` +
        `environment=${claims.environment ?? '(none)'}`,
    );
    const workspace = JSON.parse(
      execFileSync('pnpm', ['ls', '-r', '--depth', '-1', '--json'], { encoding: 'utf8' }),
    );
    for (const entry of workspace) {
      const pkg = JSON.parse(fs.readFileSync(path.join(entry.path, 'package.json'), 'utf8'));
      if (pkg.private || !pkg.name) continue;
      const meta = await fetch(`${EXPECTED_REGISTRY}${pkg.name.replace('/', '%2f')}`);
      if (meta.status === 404) {
        errors.push(
          `${pkg.name}: not on npm yet. Publish it once manually from its folder (npm publish --access public), then add its Trusted Publisher.`,
        );
        continue;
      }
      const versions = meta.ok ? Object.keys((await meta.json()).versions ?? {}) : [];
      if (versions.includes(pkg.version)) continue; // nothing to publish for this package
      const ex = await fetch(
        `${EXPECTED_REGISTRY}-/npm/v1/oidc/token/exchange/package/${pkg.name.replace('/', '%2f')}`,
        {
          method: 'POST',
          // Same headers npm-registry-fetch sends during `npm publish`.
          headers: {
            Authorization: `Bearer ${idToken}`,
            'npm-command': 'publish',
            'user-agent': `npm/${npmVersion} node/${process.version} ${process.platform} ${process.arch}`,
          },
        },
      );
      const body = await ex.json().catch(() => ({}));
      if (ex.ok && body.token) {
        info(`${pkg.name}@${pkg.version}: trusted publisher OK`);
      } else {
        // Advisory only: the real `npm publish` makes the final decision, so a probe
        // that disagrees with npm must never block a release.
        warnings.push(
          `${pkg.name}: trusted-publisher exchange rejected (HTTP ${ex.status}: ${body.message ?? body.error ?? 'no message'}). ` +
            'On npmjs.com > package Settings > Trusted Publisher check: GitHub Actions, owner imRahul05, ' +
            'repository rhl-ai, workflow filename release.yml, no environment, allowed action includes npm publish.',
        );
      }
    }
  }
}

if (warnings.length) {
  console.warn('\nTrusted-publisher probe warnings (publish will still be attempted):');
  for (const w of warnings) console.warn(`  - ${w}`);
}

if (errors.length) {
  console.error('\nPre-flight failed:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('Pre-flight passed: publishing will authenticate with OIDC only.');
