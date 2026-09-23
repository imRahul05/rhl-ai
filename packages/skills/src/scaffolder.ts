import fs from 'node:fs/promises';
import path from 'node:path';
import { ensureDir, pathExists } from '@rhl-ai/utils';
import { CreateSkillOptions } from './types.js';
import { resolveSkillsDirectory } from './discoverer.js';

export async function createSkill(
  skillName: string,
  options: CreateSkillOptions = {},
): Promise<string> {
  const sanitizedName = skillName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-');
  if (!sanitizedName) {
    throw new Error('Skill name cannot be empty');
  }

  let targetBaseDir = options.skillsDir;
  if (!targetBaseDir) {
    const discoveredDir = await resolveSkillsDirectory();
    targetBaseDir = discoveredDir ?? path.resolve('skills');
  }

  const skillPath = path.join(targetBaseDir, sanitizedName);
  if (await pathExists(skillPath)) {
    throw new Error(`Skill directory already exists at '${skillPath}'`);
  }

  await ensureDir(skillPath);
  await ensureDir(path.join(skillPath, 'references'));
  await ensureDir(path.join(skillPath, 'examples'));
  await ensureDir(path.join(skillPath, 'scripts'));

  const description =
    options.description ?? `AI agent instructions and decision framework for ${sanitizedName}.`;
  const author = options.author ?? 'RHL AI';

  const skillMdContent = `---
name: ${sanitizedName}
description: ${description}
version: 0.1.0
author: ${author}
tags: []
---

# ${sanitizedName}

## Overview
${description}

## Decision Framework
- Define the principles and triggers for when this skill should be activated.
- Clarify trade-offs and decision criteria.

## Workflows
1. **Step 1**: Analyze the input requirements.
2. **Step 2**: Execute the domain logic according to best practices.
3. **Step 3**: Validate outputs against acceptance criteria.

## Constraints
- Never compromise on type safety or code quality.
- Strictly adhere to specified boundary constraints.

## References
- See files under \`references/\` for supplemental documentation.
`;

  await fs.writeFile(path.join(skillPath, 'SKILL.md'), skillMdContent, 'utf-8');
  await fs.writeFile(
    path.join(skillPath, 'references', 'README.md'),
    '# References\n\nStore detailed specs, API documentation, or domain guidelines here.\n',
    'utf-8',
  );
  await fs.writeFile(
    path.join(skillPath, 'examples', 'README.md'),
    '# Examples\n\nStore canonical input/output examples or usage demonstrations here.\n',
    'utf-8',
  );
  await fs.writeFile(
    path.join(skillPath, 'scripts', 'README.md'),
    '# Scripts\n\nStore automation or validation scripts here.\n',
    'utf-8',
  );

  return skillPath;
}
