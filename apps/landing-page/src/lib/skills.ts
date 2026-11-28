import YAML from 'yaml';
import { REPO_CONTENT, type RawSkillSnapshot } from './repo-content';

export interface SkillMetadata {
  readonly name: string;
  readonly description: string;
  readonly version?: string;
  readonly author?: string;
  readonly tags?: readonly string[];
}

interface RawFrontmatter {
  name?: unknown;
  description?: unknown;
  version?: unknown;
  author?: unknown;
  tags?: unknown;
}

/**
 * Mirrors `parseSkillMarkdown` from `@rhl-ai/skills`. That package is not imported
 * here because its barrel pulls in installer/scaffolder code, which makes the
 * Next.js bundler trace the whole repo.
 */
function parseSkillMarkdown(content: string): { metadata: SkillMetadata; instructions: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(content);
  if (!match) {
    return { metadata: { name: '', description: '' }, instructions: content.trim() };
  }
  let raw: RawFrontmatter = {};
  const parsed: unknown = YAML.parse(match[1] ?? '');
  if (parsed && typeof parsed === 'object') raw = parsed as RawFrontmatter;
  const str = (v: unknown): string | undefined => (typeof v === 'string' ? v.trim() : undefined);
  return {
    metadata: {
      name: str(raw.name) ?? '',
      description: str(raw.description) ?? '',
      version: raw.version !== undefined ? String(raw.version).trim() : undefined,
      author: str(raw.author),
      tags: Array.isArray(raw.tags)
        ? raw.tags.filter((t): t is string => typeof t === 'string')
        : undefined,
    },
    instructions: (match[2] ?? '').trim(),
  };
}

export interface SkillEntry {
  /** Directory name under the repo-level `skills/` folder, used as the URL slug. */
  readonly slug: string;
  readonly title: string;
  readonly metadata: SkillMetadata;
  /** First sentence of the description, used as a tagline. */
  readonly summary: string;
  /** Markdown body without the leading H1 (the page renders its own title). */
  readonly body: string;
  /** npm package name from the skill's package.json, if it is published. */
  readonly npmName?: string;
  /** Published package version (package.json), falling back to SKILL.md frontmatter. */
  readonly version?: string;
}

const ACRONYMS = new Set(['pr', 'ai', 'api', 'cli', 'ui', 'ci']);

function toTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => (ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

function firstSentence(text: string): string {
  const match = /^(.+?[.!?])(\s|$)/.exec(text);
  return match?.[1] ?? text;
}

function toSkillEntry(snapshot: RawSkillSnapshot): SkillEntry {
  const { metadata, instructions } = parseSkillMarkdown(snapshot.raw);
  return {
    npmName: snapshot.npmName ?? undefined,
    version: snapshot.packageVersion ?? metadata.version,
    slug: snapshot.slug,
    title: toTitle(snapshot.slug),
    metadata,
    summary: firstSentence(metadata.description),
    body: instructions.replace(/^#\s+.*\r?\n+/, ''),
  };
}

export function getAllSkills(): SkillEntry[] {
  return REPO_CONTENT.skills.map(toSkillEntry);
}

export function getSkill(slug: string): SkillEntry | undefined {
  const snapshot = REPO_CONTENT.skills.find((s) => s.slug === slug);
  return snapshot ? toSkillEntry(snapshot) : undefined;
}

/** Raw SKILL.md text for a skill, or an empty string when it does not exist. */
export function getSkillSource(slug: string): string {
  return REPO_CONTENT.skills.find((s) => s.slug === slug)?.raw ?? '';
}
