#!/usr/bin/env node
/**
 * Build-time snapshot of the repo content read by the landing page
 * (skills, templates, workspace packages, and repo Markdown docs).
 *
 * Bundling this as a static JSON module avoids runtime `fs` reads inside
 * Vercel server functions — which otherwise fail with ENOENT when Vercel
 * re-renders a route, or trigger Next.js 16 Turbopack's unanchored
 * `outputFileTracingIncludes` bug that breaks pnpm symlinks in node_modules/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_DIR = path.resolve(__dirname, '..');
const OUT_FILE = path.join(APP_DIR, 'src', 'generated', 'repo-content.json');

const SOURCE_DOC_FILES = [
  'README.md',
  'docs/architecture.md',
  'packages/cli/README.md',
  'packages/skills/README.md',
  'packages/scaffold/README.md',
  'packages/utils/README.md',
  'skills/README.md',
  'projects/github-whatsapp-bot/README.md',
];

function findRepoRoot() {
  let dir = APP_DIR;
  for (let i = 0; i < 6; i += 1) {
    if (fs.existsSync(path.join(dir, 'pnpm-workspace.yaml'))) return dir;
    dir = path.dirname(dir);
  }
  throw new Error(`Could not locate monorepo root (pnpm-workspace.yaml) from ${APP_DIR}`);
}

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function readFirstDescriptionLine(readmePath) {
  try {
    const line = fs
      .readFileSync(readmePath, 'utf8')
      .split('\n')
      .find((l) => l.trim().length > 0 && !l.startsWith('#'));
    return line?.trim() ?? '';
  } catch {
    return '';
  }
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

const repoRoot = findRepoRoot();

const skillsDir = path.join(repoRoot, 'skills');
const skills = listDirs(skillsDir)
  .filter((slug) => fs.existsSync(path.join(skillsDir, slug, 'SKILL.md')))
  .map((slug) => {
    const raw = fs.readFileSync(path.join(skillsDir, slug, 'SKILL.md'), 'utf8');
    const pkg = readJson(path.join(skillsDir, slug, 'package.json'));
    return {
      slug,
      raw,
      npmName: typeof pkg?.name === 'string' ? pkg.name : null,
      packageVersion: typeof pkg?.version === 'string' ? pkg.version : null,
    };
  });

const packagesDir = path.join(repoRoot, 'packages');
const packages = listDirs(packagesDir).filter((name) =>
  fs.existsSync(path.join(packagesDir, name, 'package.json')),
);

const packageVersions = {};
for (const name of packages) {
  const relDir = `packages/${name}`;
  const pkg = readJson(path.join(repoRoot, relDir, 'package.json'));
  if (typeof pkg?.version === 'string') {
    packageVersions[relDir] = pkg.version;
  }
}

const templatesDir = path.join(repoRoot, 'templates');
const templates = listDirs(templatesDir).map((name) => ({
  name,
  description: readFirstDescriptionLine(path.join(templatesDir, name, 'README.md')),
}));

const docs = {};
for (const relFile of SOURCE_DOC_FILES) {
  const fullPath = path.join(repoRoot, relFile);
  if (fs.existsSync(fullPath)) {
    docs[relFile] = fs.readFileSync(fullPath, 'utf8').trim();
  }
}

const snapshot = {
  skills,
  packages,
  packageVersions,
  templates,
  docs,
};

const serialized = `${JSON.stringify(snapshot, null, 2)}\n`;
fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
const existing = fs.existsSync(OUT_FILE) ? fs.readFileSync(OUT_FILE, 'utf8') : null;
if (existing !== serialized) {
  fs.writeFileSync(OUT_FILE, serialized, 'utf8');
}
