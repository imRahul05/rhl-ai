import fs from 'node:fs/promises';
import path from 'node:path';
import { pathExists, findMonorepoRoot } from '@rhl-ai/utils';
import { Skill, SkillFiles } from './types.js';
import { parseSkillMarkdown } from './parser.js';

export async function resolveSkillsDirectory(customDir?: string): Promise<string | null> {
  if (customDir) {
    const resolved = path.resolve(customDir);
    return (await pathExists(resolved)) ? resolved : null;
  }

  const root = await findMonorepoRoot();
  if (root) {
    const skillsPath = path.join(root, 'skills');
    if (await pathExists(skillsPath)) {
      return skillsPath;
    }
  }

  const cwdSkillsPath = path.resolve('skills');
  if (await pathExists(cwdSkillsPath)) {
    return cwdSkillsPath;
  }

  return null;
}

async function listFilesInDir(dirPath: string): Promise<readonly string[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

export async function loadSkill(skillDirPath: string): Promise<Skill | null> {
  const resolvedPath = path.resolve(skillDirPath);
  const skillMdPath = path.join(resolvedPath, 'SKILL.md');

  if (!(await pathExists(skillMdPath))) {
    return null;
  }

  const content = await fs.readFile(skillMdPath, 'utf-8');
  const { metadata, instructions } = parseSkillMarkdown(content);
  const dirName = path.basename(resolvedPath);

  const references = await listFilesInDir(path.join(resolvedPath, 'references'));
  const examples = await listFilesInDir(path.join(resolvedPath, 'examples'));
  const scripts = await listFilesInDir(path.join(resolvedPath, 'scripts'));

  const files: SkillFiles = {
    references,
    examples,
    scripts,
  };

  return {
    name: metadata.name || dirName,
    path: resolvedPath,
    metadata,
    instructions,
    files,
  };
}

export async function discoverSkills(skillsDir?: string): Promise<readonly Skill[]> {
  const resolvedSkillsDir = await resolveSkillsDirectory(skillsDir);
  if (!resolvedSkillsDir) {
    return [];
  }

  const entries = await fs.readdir(resolvedSkillsDir, { withFileTypes: true });
  const skillDirs = entries.filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'));

  const skills: Skill[] = [];

  for (const dir of skillDirs) {
    const skillPath = path.join(resolvedSkillsDir, dir.name);
    const skill = await loadSkill(skillPath);
    if (skill) {
      skills.push(skill);
    }
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}
