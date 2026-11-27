#!/usr/bin/env node
/**
 * Post-build guard: every server function must ship the repo files that
 * src/lib reads with `fs` (see REPO_CONTENT in next.config.mjs). If one is
 * missing, the page works when prerendered but crashes when Vercel re-renders
 * it ("Could not locate the repo-level skills/ directory from /var/task/...").
 * Fails the build instead of the deployment.
 */
import fs from 'node:fs';
import path from 'node:path';

const APP_DIR = path.join('.next', 'server', 'app');
const REQUIRED = [
  /(^|\/)pnpm-workspace\.yaml$/,
  /(^|\/)skills\/[^/]+\/SKILL\.md$/,
  /(^|\/)skills\/[^/]+\/package\.json$/,
  /(^|\/)templates\/[^/]+\/README\.md$/,
  /(^|\/)packages\/[^/]+\/package\.json$/,
];

function traces(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return traces(full);
    return entry.name.endsWith('.js.nft.json') ? [full] : [];
  });
}

if (!fs.existsSync(APP_DIR)) {
  console.error(`check-trace: ${APP_DIR} not found; run next build first.`);
  process.exit(1);
}

const failures = [];
for (const file of traces(APP_DIR)) {
  const { files } = JSON.parse(fs.readFileSync(file, 'utf8'));
  const missing = REQUIRED.filter((re) => !files.some((f) => re.test(f.replaceAll('\\', '/'))));
  if (missing.length) failures.push(`${file}: missing ${missing.map(String).join(', ')}`);
}

if (failures.length) {
  console.error('check-trace: server functions are missing repo content:\n' + failures.join('\n'));
  process.exit(1);
}
console.log(`check-trace: repo content traced into ${traces(APP_DIR).length} server functions.`);
