#!/usr/bin/env node
/**
 * Automatically create `patch` changesets for publishable workspace packages
 * that changed in a push. Run in CI before `changesets/action`.
 *
 * Usage: node scripts/auto-changeset.mjs [--base <sha>] [--head <sha>] [--dry-run]
 *
 * - base defaults to $BEFORE_SHA (github.event.before), falling back to HEAD~1
 * - private packages are ignored
 * - changes only to CHANGELOG.md, or to package.json "version" lines, are ignored
 * - packages that already have a pending changeset are skipped
 * - never runs on the release ("chore: version and publish packages") commit
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const RELEASE_COMMIT_PREFIX = 'chore: version and publish packages';
const ZERO_SHA = /^0+$/;

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const dryRun = flag('--dry-run');

const git = (...a) =>
  execFileSync('git', a, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const gitOk = (...a) => {
  try {
    return git(...a);
  } catch {
    return null;
  }
};

const head = gitOk('rev-parse', opt('--head') ?? 'HEAD');
if (!head) throw new Error('Cannot resolve head commit');

// Resolve base: explicit/env value if it exists in history, else HEAD~1.
let base = opt('--base') ?? process.env.BEFORE_SHA ?? '';
if (!base || ZERO_SHA.test(base) || !gitOk('cat-file', '-e', `${base}^{commit}`)) {
  base = gitOk('rev-parse', `${head}~1`);
}
if (!base) {
  console.log('No base commit to diff against (initial commit); nothing to do.');
  process.exit(0);
}

// Loop guard: do not create changesets for the release commit itself.
const subjects = git('log', '--format=%s', `${base}..${head}`).split('\n').filter(Boolean);
if (subjects.length && subjects.every((s) => s.startsWith(RELEASE_COMMIT_PREFIX))) {
  console.log('Release commit detected; skipping auto-changeset.');
  process.exit(0);
}
if (subjects[0]?.startsWith(RELEASE_COMMIT_PREFIX)) {
  console.log('Head is a release commit; skipping auto-changeset.');
  process.exit(0);
}

// Discover workspace packages from pnpm-workspace.yaml.
const wsGlobs = [...fs.readFileSync('pnpm-workspace.yaml', 'utf8').matchAll(/^\s*-\s*['"]?([^'"\s]+)['"]?\s*$/gm)].map(
  (m) => m[1],
);
const packages = [];
for (const glob of wsGlobs) {
  if (!glob.endsWith('/*')) continue;
  const parent = glob.slice(0, -2);
  if (!fs.existsSync(parent)) continue;
  for (const entry of fs.readdirSync(parent, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = `${parent}/${entry.name}`;
    const pj = path.join(dir, 'package.json');
    if (!fs.existsSync(pj)) continue;
    const json = JSON.parse(fs.readFileSync(pj, 'utf8'));
    if (json.private || !json.name) continue;
    packages.push({ dir, name: json.name });
  }
}

// Packages already covered by a pending changeset.
const csDir = '.changeset';
const covered = new Set();
for (const f of fs.readdirSync(csDir)) {
  if (!f.endsWith('.md') || f.toLowerCase() === 'readme.md') continue;
  const text = fs.readFileSync(path.join(csDir, f), 'utf8');
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) continue;
  for (const m of fm[1].matchAll(/^\s*['"]?([^'":\s][^'":]*?)['"]?\s*:/gm)) covered.add(m[1]);
}

const changedFiles = git('diff', '--name-only', `${base}..${head}`).split('\n').filter(Boolean);

function isRelevant(pkgDir, file) {
  const rel = file.slice(pkgDir.length + 1);
  if (rel === 'CHANGELOG.md') return false;
  if (rel === 'package.json') {
    // Ignore version-only edits (e.g. from the release PR).
    const diff = git('diff', '-U0', `${base}..${head}`, '--', file);
    const changed = diff
      .split('\n')
      .filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l))
      .filter((l) => !/^[+-]\s*"version"\s*:/.test(l));
    return changed.length > 0;
  }
  return true;
}

const created = [];
for (const pkg of packages) {
  const files = changedFiles.filter((f) => f.startsWith(`${pkg.dir}/`));
  if (!files.some((f) => isRelevant(pkg.dir, f))) continue;
  if (covered.has(pkg.name)) {
    console.log(`${pkg.name}: changed, but a changeset already exists; skipping.`);
    continue;
  }
  const pkgSubjects = [
    ...new Set(git('log', '--format=%s', `${base}..${head}`, '--', pkg.dir).split('\n').filter(Boolean)),
  ].filter((s) => !s.startsWith(RELEASE_COMMIT_PREFIX));
  const summary = (pkgSubjects.length ? pkgSubjects : [`Update ${pkg.name}`]).join('\n\n');
  const slug = pkg.name.replace(/^@/, '').replace(/[^a-zA-Z0-9]+/g, '-');
  const file = path.join(csDir, `auto-${head.slice(0, 7)}-${slug}.md`);
  const body = `---\n'${pkg.name}': patch\n---\n\n${summary}\n`;
  created.push({ file, body, name: pkg.name });
}

if (!created.length) {
  console.log(`No publishable package changes in ${base.slice(0, 7)}..${head.slice(0, 7)}.`);
  process.exit(0);
}

for (const c of created) {
  if (dryRun) {
    console.log(`[dry-run] would write ${c.file}:\n${c.body}`);
  } else {
    fs.writeFileSync(c.file, c.body);
    console.log(`Wrote ${c.file} (${c.name}: patch)`);
  }
}
