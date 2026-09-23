import fs from 'node:fs/promises';
import path from 'node:path';
import { pathExists } from '@rhl-ai/utils';
import { ValidationIssue, ValidationResult } from './types.js';
import { parseSkillMarkdown } from './parser.js';

export async function validateSkill(skillDirPath: string): Promise<ValidationResult> {
  const issues: ValidationIssue[] = [];
  const resolvedPath = path.resolve(skillDirPath);
  const dirName = path.basename(resolvedPath);

  const dirExists = await pathExists(resolvedPath);
  if (!dirExists) {
    return {
      isValid: false,
      skillName: dirName,
      issues: [
        {
          field: 'directory',
          message: `Skill directory does not exist at '${resolvedPath}'`,
          severity: 'error',
        },
      ],
    };
  }

  const skillMdPath = path.join(resolvedPath, 'SKILL.md');
  const skillMdExists = await pathExists(skillMdPath);

  if (!skillMdExists) {
    return {
      isValid: false,
      skillName: dirName,
      issues: [
        {
          field: 'SKILL.md',
          message: `Missing required 'SKILL.md' file in '${resolvedPath}'`,
          severity: 'error',
        },
      ],
    };
  }

  const content = await fs.readFile(skillMdPath, 'utf-8');
  const { metadata, instructions } = parseSkillMarkdown(content);

  if (!metadata.name) {
    issues.push({
      field: 'metadata.name',
      message: "Missing 'name' field in SKILL.md YAML frontmatter",
      severity: 'error',
    });
  } else if (metadata.name !== dirName) {
    issues.push({
      field: 'metadata.name',
      message: `Skill name '${metadata.name}' does not match directory name '${dirName}'`,
      severity: 'warning',
    });
  }

  if (!metadata.description) {
    issues.push({
      field: 'metadata.description',
      message: "Missing 'description' field in SKILL.md YAML frontmatter",
      severity: 'error',
    });
  } else if (metadata.description.length < 10) {
    issues.push({
      field: 'metadata.description',
      message: 'Description should be at least 10 characters long for agent discovery',
      severity: 'warning',
    });
  }

  if (!instructions) {
    issues.push({
      field: 'instructions',
      message: 'SKILL.md does not contain instruction content after frontmatter',
      severity: 'warning',
    });
  }

  // Check recommended subdirectories
  const subdirs = ['references', 'examples', 'scripts'] as const;
  for (const subdir of subdirs) {
    const subPath = path.join(resolvedPath, subdir);
    const subExists = await pathExists(subPath);
    if (!subExists) {
      issues.push({
        field: `directory.${subdir}`,
        message: `Recommended directory '${subdir}/' is missing`,
        severity: 'warning',
      });
    }
  }

  const hasErrors = issues.some((issue) => issue.severity === 'error');

  return {
    isValid: !hasErrors,
    skillName: metadata.name || dirName,
    issues,
  };
}
