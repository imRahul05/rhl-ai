#!/usr/bin/env node
/**
 * Automatically create `patch` changesets for publishable workspace packages
 * with unreleased changes. Run in CI before `changesets/action`.
 *
 * Usage: node scripts/auto-changeset.mjs [--base <sha>] [--head <sha>] [--dry-run]
 *
 * - per package, diffs from the last commit that changed its "version" line
 *   (its last release, or its creation) to HEAD; --base overrides this
 * - files are written but NOT committed: changesets/action resets to the pushed
 *   sha before versioning, and untracked files survive that reset
 * - private packages are ignored
 * - changes only to CHANGELOG.md, or to package.json "version" lines, are ignored
 * - packages that already have a pending changeset are skipped
 * - never runs on the release ("chore: version and publish packages") commit
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const RELEASE_COMMIT_PREFIX = 'chore: version and publish packages';

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const dryRun = flag('--dry-run');
// Optional override for testing: diff every package against this commit.
const globalBase = opt('--base') ?? null;

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

// Loop guard: never create changesets for the release commit itself
// (direct commit, squash merge, or merge of the changeset-release/* branch).
const headMessage = git('log', '-1', '--format=%B', head);
if (headMessage.startsWith(RELEASE_COMMIT_PREFIX) || headMessage.includes('changeset-release/')) {
  console.log('Release commit detected; skipping auto-changeset.');
  process.exit(0);
}

// Discover workspace packages from pnpm-workspace.yaml.
const wsGlobs = [
  ...fs.readFileSync('pnpm-workspace.yaml', 'utf8').matchAll(/^\s*-\s*['"]?([^'"\s]+)['"]?\s*$/gm),
].map((m) => m[1]);
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
    // Extra source dirs the package bundles at build time, taken from its
    // turbo.json build inputs (e.g. "../../templates/**" for @rhl-ai/scaffold).
    const extra = [];
    const turboPath = path.join(dir, 'turbo.json');
    if (fs.existsSync(turboPath)) {
      const inputs = JSON.parse(fs.readFileSync(turboPath, 'utf8'))?.tasks?.build?.inputs ?? [];
      for (const input of inputs) {
        if (!input.startsWith('../')) continue;
        extra.push(path.posix.normalize(path.posix.join(dir, input.replace(/\/\*\*$/, ''))));
      }
    }
    packages.push({ dir, name: json.name, paths: [dir, ...extra] });
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

// Base for a package = the last commit that changed its "version" line, i.e. its
// last release (or its creation). Everything after that is unreleased work.
// This is stateless: each run recomputes it, so pending bumps accumulate
// correctly in the Version Packages PR without committing changesets to main.
function releaseBase(pkgDir) {
  if (globalBase) return globalBase;
  return (
    gitOk(
      'log',
      '-1',
      '--format=%H',
      '-G',
      '^\\s*"version"\\s*:',
      head,
      '--',
      `${pkgDir}/package.json`,
    ) || null
  );
}

function isRelevant(pkgDir, file, base) {
  if (!file.startsWith(`${pkgDir}/`)) return true; // bundled source outside the package dir
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
  const base = releaseBase(pkg.dir);
  if (!base) continue;
  const files = git('diff', '--name-only', `${base}..${head}`, '--', ...pkg.paths)
    .split('\n')
    .filter(Boolean);
  if (!files.some((f) => isRelevant(pkg.dir, f, base))) continue;
  if (covered.has(pkg.name)) {
    console.log(`${pkg.name}: changed, but a changeset already exists; skipping.`);
    continue;
  }
  const pkgSubjects = [
    ...new Set(
      git('log', '--no-merges', '--format=%s', `${base}..${head}`, '--', ...pkg.paths)
        .split('\n')
        .filter(Boolean),
    ),
  ].filter((s) => !s.startsWith(RELEASE_COMMIT_PREFIX));
  const summary = (pkgSubjects.length ? pkgSubjects : [`Update ${pkg.name}`]).join('\n\n');
  const slug = pkg.name.replace(/^@/, '').replace(/[^a-zA-Z0-9]+/g, '-');
  const file = path.join(csDir, `auto-${head.slice(0, 7)}-${slug}.md`);
  const body = `---\n'${pkg.name}': patch\n---\n\n${summary}\n`;
  created.push({ file, body, name: pkg.name });
}

if (!created.length) {
  console.log('No unreleased publishable package changes.');
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
