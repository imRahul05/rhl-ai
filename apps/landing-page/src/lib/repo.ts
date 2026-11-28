import { REPO_CONTENT } from './repo-content';

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

/** `version` from a workspace package.json (path relative to the repo root), read at build time. */
export function getPackageVersion(relativeDir: string): string {
  return REPO_CONTENT.packageVersions[relativeDir] ?? '';
}

/** Where Claude Code loads personal skills from. */
export const CLAUDE_SKILLS_DIR = '~/.claude/skills';

/** The install command shown everywhere a skill is offered. */
export function skillInstallCommand(slug: string): string {
  return `npx @rhl-ai/cli skill install ${slug} --target ${CLAUDE_SKILLS_DIR}`;
}

/**
 * Real counts read from the repo at build time, so the numbers on the landing
 * page can never drift from what actually ships.
 */
export function getRepoFacts(): RepoFacts {
  return {
    packages: REPO_CONTENT.packages,
    templates: REPO_CONTENT.templates,
  };
}
