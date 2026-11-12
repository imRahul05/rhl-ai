import fs from 'node:fs';
import path from 'node:path';

export interface TemplateEntry {
  readonly name: string;
  readonly description: string;
}

export interface RepoFacts {
  /** Workspace packages under `packages/`. */
  readonly packages: readonly string[];
  /** Starter templates under `templates/`. */
  readonly templates: readonly TemplateEntry[];
}

function findRepoRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 5; i += 1) {
    if (fs.existsSync(path.join(dir, 'pnpm-workspace.yaml'))) return dir;
    dir = path.dirname(dir);
  }
  throw new Error(`Could not locate the monorepo root from ${process.cwd()}`);
}

function listDirs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b));
}

/** Same rule the scaffold engine uses: first non-heading line of the README. */
function readDescription(readmePath: string): string {
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

/**
 * Real counts read from the repo at build time, so the numbers on the landing
 * page can never drift from what actually ships.
 */
export function getRepoFacts(): RepoFacts {
  const root = findRepoRoot();
  const templatesDir = path.join(root, 'templates');
  return {
    packages: listDirs(path.join(root, 'packages')).filter((name) =>
      fs.existsSync(path.join(root, 'packages', name, 'package.json'))
    ),
    templates: listDirs(templatesDir).map((name) => ({
      name,
      description: readDescription(path.join(templatesDir, name, 'README.md')),
    })),
  };
}
