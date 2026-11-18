#!/usr/bin/env node
/**
 * Pre-publish validation of what `changeset publish` will release.
 * Runs inside `pnpm release`, after the build and before publishing.
 *
 * - The monorepo root must stay `"private": true` and is never a release target.
 * - Every non-private workspace package must have: a valid name and semver
 *   version, `publishConfig.access: public` when scoped, repository metadata
 *   pointing at this repo and its own directory, and its entry points
 *   (main/module/types/bin/exports) present in the packed tarball.
 *
 * Read-only: uses `npm pack --dry-run`, never publishes.
 * Usage: node scripts/check-publishable-packages.mjs
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const REPO_URL = /^(git\+)?https:\/\/github\.com\/imRahul05\/rhl-ai(\.git)?$/;
const SEMVER = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$/;
const errors = [];

const rootPkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
if (rootPkg.private !== true) {
  errors.push(
    `Root package "${rootPkg.name}" must keep "private": true; it is the workspace container, not a release.`,
  );
}

// Same discovery pnpm and Changesets use (pnpm-workspace.yaml).
const workspace = JSON.parse(
  execFileSync('pnpm', ['ls', '-r', '--depth', '-1', '--json'], { cwd: ROOT, encoding: 'utf8' }),
);

const publishable = [];
for (const entry of workspace) {
  const dir = path.relative(ROOT, entry.path).split(path.sep).join('/');
  if (!dir) continue; // root, checked above
  const pkg = JSON.parse(fs.readFileSync(path.join(entry.path, 'package.json'), 'utf8'));
  if (pkg.private) continue;
  publishable.push(pkg.name);
  const where = `${pkg.name ?? dir} (${dir})`;

  if (!pkg.name) errors.push(`${dir}: missing "name".`);
  if (pkg.name === rootPkg.name) errors.push(`${where}: reuses the root package name.`);
  if (!SEMVER.test(pkg.version ?? '')) errors.push(`${where}: invalid version "${pkg.version}".`);
  if (pkg.name?.startsWith('@') && pkg.publishConfig?.access !== 'public') {
    errors.push(`${where}: scoped package needs "publishConfig": { "access": "public" }.`);
  }
  if (
    pkg.publishConfig?.registry &&
    !pkg.publishConfig.registry.startsWith('https://registry.npmjs.org')
  ) {
    errors.push(
      `${where}: publishConfig.registry points away from npmjs.org (${pkg.publishConfig.registry}).`,
    );
  }
  const repoUrl = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url;
  if (!REPO_URL.test(repoUrl ?? '')) {
    errors.push(
      `${where}: repository.url must be https://github.com/imRahul05/rhl-ai.git (needed for provenance).`,
    );
  }
  if (pkg.repository?.directory !== dir) {
    errors.push(
      `${where}: repository.directory must be "${dir}" (found "${pkg.repository?.directory}").`,
    );
  }

  // Entry points must exist in what npm would actually pack (catches a missing build).
  const packed = JSON.parse(
    execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
      cwd: entry.path,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }),
  )[0];
  const files = new Set(packed.files.map((f) => f.path));
  const entryPoints = new Set();
  for (const key of ['main', 'module', 'types'])
    if (typeof pkg[key] === 'string') entryPoints.add(pkg[key]);
  if (typeof pkg.bin === 'string') entryPoints.add(pkg.bin);
  else for (const p of Object.values(pkg.bin ?? {})) entryPoints.add(p);
  const walk = (v) => {
    if (typeof v === 'string') entryPoints.add(v);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(pkg.exports);
  for (const p of entryPoints) {
    const norm = p.replace(/^\.\//, '');
    if (!files.has(norm))
      errors.push(
        `${where}: entry point "${p}" is not in the packed files (build missing or "files" wrong).`,
      );
  }
}

console.log(`Root "${rootPkg.name}": private (never published).`);
console.log(`Publishable workspace packages (${publishable.length}): ${publishable.join(', ')}`);
if (errors.length) {
  console.error('\nPublish validation failed:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('Publish validation passed.');
