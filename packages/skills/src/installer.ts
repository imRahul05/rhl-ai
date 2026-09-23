import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { ensureDir, pathExists } from '@rhl-ai/utils';
import { InstallResult, InstallSkillOptions } from './types.js';
import { resolveSkillsDirectory } from './discoverer.js';

export async function installSkill(
  skillName: string,
  options: InstallSkillOptions = {},
): Promise<InstallResult> {
  const sanitizedName = skillName.trim().toLowerCase();
  const sourceSkillsDir = await resolveSkillsDirectory(options.sourceSkillsDir);

  if (!sourceSkillsDir) {
    return {
      success: false,
      skillName: sanitizedName,
      sourcePath: '',
      targetPath: '',
      message: 'Could not locate source skills directory in the repository.',
    };
  }

  const sourceSkillPath = path.join(sourceSkillsDir, sanitizedName);
  if (!(await pathExists(sourceSkillPath))) {
    return {
      success: false,
      skillName: sanitizedName,
      sourcePath: sourceSkillPath,
      targetPath: '',
      message: `Skill '${sanitizedName}' not found in '${sourceSkillsDir}'.`,
    };
  }

  // Default target is ~/.agents/skills/<skillName>
  const defaultTargetDir = path.join(os.homedir(), '.agents', 'skills', sanitizedName);
  const targetPath = options.targetDir
    ? path.resolve(options.targetDir, sanitizedName)
    : defaultTargetDir;

  const targetAlreadyExists = await pathExists(targetPath);
  if (targetAlreadyExists && !options.overwrite) {
    return {
      success: false,
      skillName: sanitizedName,
      sourcePath: sourceSkillPath,
      targetPath,
      message: `Destination '${targetPath}' already exists. Use overwrite option to replace.`,
    };
  }

  await ensureDir(path.dirname(targetPath));
  await fs.cp(sourceSkillPath, targetPath, { recursive: true });

  return {
    success: true,
    skillName: sanitizedName,
    sourcePath: sourceSkillPath,
    targetPath,
    message: `Skill '${sanitizedName}' successfully installed to '${targetPath}'.`,
  };
}
