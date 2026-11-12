import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

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
}

/**
 * Locates the repo-level `skills/` directory. The app runs with
 * cwd=apps/landing-page, but we walk upwards so it also works from the repo root.
 */
function resolveSkillsRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 5; i += 1) {
    const candidate = path.join(dir, 'skills');
    const hasSkills =
      fs.existsSync(candidate) &&
      fs
        .readdirSync(candidate, { withFileTypes: true })
        .some((e) => e.isDirectory() && fs.existsSync(path.join(candidate, e.name, 'SKILL.md')));
    if (hasSkills) return candidate;
    dir = path.dirname(dir);
  }
  throw new Error(`Could not locate the repo-level skills/ directory from ${process.cwd()}`);
}

function toTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function firstSentence(text: string): string {
  const match = /^(.+?[.!?])(\s|$)/.exec(text);
  return match?.[1] ?? text;
}

function readSkill(root: string, slug: string): SkillEntry {
  const raw = fs.readFileSync(path.join(root, slug, 'SKILL.md'), 'utf8');
  const { metadata, instructions } = parseSkillMarkdown(raw);
  return {
    slug,
    title: toTitle(slug),
    metadata,
    summary: firstSentence(metadata.description),
    body: instructions.replace(/^#\s+.*\r?\n+/, ''),
  };
}

export function getAllSkills(): SkillEntry[] {
  const root = resolveSkillsRoot();
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(root, e.name, 'SKILL.md')))
    .map((e) => readSkill(root, e.name))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getSkill(slug: string): SkillEntry | undefined {
  return getAllSkills().find((s) => s.slug === slug);
}
