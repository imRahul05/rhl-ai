#!/usr/bin/env node
/**
 * Post-build guard:
 * 1. Verifies the build-time repo content snapshot is populated so server
 *    functions never depend on runtime `fs` reads of the monorepo root.
 * 2. Verifies no server function trace leaks `node_modules` markdown files
 *    (which collide with pnpm symlinks in standalone output and break Vercel's
 *    VHS packager with ENOENT).
 */
import fs from 'node:fs';
import path from 'node:path';

const APP_DIR = path.join('.next', 'server', 'app');
const SNAPSHOT_PATH = path.join('src', 'generated', 'repo-content.json');

function traces(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return traces(full);
    return entry.name.endsWith('.js.nft.json') ? [full] : [];
  });
}

if (!fs.existsSync(SNAPSHOT_PATH)) {
  console.error(`check-trace: ${SNAPSHOT_PATH} not found; run scripts/sync-repo-content.mjs first.`);
  process.exit(1);
}

const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
if (
  !Array.isArray(snapshot.skills) ||
  snapshot.skills.length === 0 ||
  !Array.isArray(snapshot.packages) ||
  snapshot.packages.length === 0 ||
  !Array.isArray(snapshot.templates) ||
  snapshot.templates.length === 0
) {
  console.error('check-trace: repo-content.json is missing skills, packages, or templates.');
  process.exit(1);
}

if (!fs.existsSync(APP_DIR)) {
  console.error(`check-trace: ${APP_DIR} not found; run next build first.`);
  process.exit(1);
}

const traceFiles = traces(APP_DIR);
const failures = [];
for (const file of traceFiles) {
  const { files } = JSON.parse(fs.readFileSync(file, 'utf8'));
  const leakedMd = files
    .map((f) => f.replaceAll('\\', '/'))
    .filter((f) => /(^|\/)node_modules\/.+\.md$/i.test(f));
  if (leakedMd.length) {
    failures.push(`${file}: traced ${leakedMd.length} node_modules markdown file(s)`);
  }
}

if (failures.length) {
  console.error('check-trace: server function traces contain invalid entries:\n' + failures.join('\n'));
  process.exit(1);
}

console.log(
  `check-trace: ${snapshot.skills.length} skills bundled cleanly across ${traceFiles.length} server functions.`,
);
