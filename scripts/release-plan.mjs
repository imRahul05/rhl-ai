#!/usr/bin/env node
/**
 * Decides whether the Release workflow has anything to do for this push.
 * Run after `auto-changeset.mjs`, from the repo root.
 *
 * A release is needed when either:
 *   - a changeset is pending in .changeset/ (hand-written or auto-generated),
 *     so the "Version Packages" PR must be opened or updated; or
 *   - a publishable package's current version is not on npm yet (the Version
 *     Packages PR was just merged), so it must be published.
 *
 * Otherwise (landing page, docs, tests, formatting…) the build and publish
 * jobs are skipped entirely.
 *
 * Writes `release=true|false` to $GITHUB_OUTPUT and a line to the job summary.
 * Usage: node scripts/release-plan.mjs
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const reasons = [];

// 1. Pending changesets.
const pending = fs
  .readdirSync('.changeset')
  .filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md');
if (pending.length) reasons.push(`pending changesets: ${pending.join(', ')}`);

// 2. Publishable versions missing from npm.
const globs = [
  ...fs.readFileSync('pnpm-workspace.yaml', 'utf8').matchAll(/^\s*-\s*['"]?([^'"\s]+)['"]?\s*$/gm),
].map((m) => m[1]);
for (const glob of globs) {
  if (!glob.endsWith('/*')) continue;
  const parent = glob.slice(0, -2);
  if (!fs.existsSync(parent)) continue;
  for (const entry of fs.readdirSync(parent, { withFileTypes: true })) {
    const pj = path.join(parent, entry.name, 'package.json');
    if (!entry.isDirectory() || !fs.existsSync(pj)) continue;
    const { name, version, private: isPrivate } = JSON.parse(fs.readFileSync(pj, 'utf8'));
    if (isPrivate || !name || !version) continue;
    let published = '';
    try {
      published = execFileSync('npm', ['view', `${name}@${version}`, 'version'], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      }).trim();
    } catch (error) {
      // E404 = the package has never been published: that is a release.
      const stderr = String(error?.stderr ?? '');
      if (!/E404|404 Not Found/.test(stderr)) {
        // Registry unreachable: fail open so a real release is never silently skipped.
        reasons.push(`could not query npm for ${name}@${version}`);
        continue;
      }
    }
    if (published !== version) reasons.push(`${name}@${version} is not on npm`);
  }
}

const release = reasons.length > 0;
const line = release
  ? `Release needed — ${reasons.join('; ')}.`
  : 'No release needed: no pending changesets and every publishable version is already on npm.';
console.log(line);
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `release=${release}\n`);
if (process.env.GITHUB_STEP_SUMMARY)
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${line}\n`);
