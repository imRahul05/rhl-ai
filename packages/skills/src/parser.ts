import YAML from 'yaml';
import { SkillMetadata } from './types.js';

interface RawFrontmatterRecord {
  readonly name?: string;
  readonly description?: string;
  readonly version?: string | number;
  readonly author?: string;
  readonly tags?: readonly string[];
}

export interface ParsedSkillContent {
  readonly metadata: SkillMetadata;
  readonly instructions: string;
}

export function parseSkillMarkdown(fileContent: string): ParsedSkillContent {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return {
      metadata: {
        name: '',
        description: '',
      },
      instructions: fileContent.trim(),
    };
  }

  const rawYaml = match[1] ?? '';
  const instructions = (match[2] ?? '').trim();

  let parsed: RawFrontmatterRecord = {};
  try {
    const rawParsed = YAML.parse(rawYaml) as RawFrontmatterRecord | null;
    if (rawParsed && typeof rawParsed === 'object') {
      parsed = rawParsed;
    }
  } catch {
    // Malformed YAML will result in empty metadata, which validator flags
  }

  const metadata: SkillMetadata = {
    name: typeof parsed.name === 'string' ? parsed.name.trim() : '',
    description: typeof parsed.description === 'string' ? parsed.description.trim() : '',
    version: parsed.version !== undefined ? String(parsed.version).trim() : undefined,
    author: typeof parsed.author === 'string' ? parsed.author.trim() : undefined,
    tags: Array.isArray(parsed.tags)
      ? parsed.tags.filter((tag): tag is string => typeof tag === 'string')
      : undefined,
  };

  return {
    metadata,
    instructions,
  };
}
