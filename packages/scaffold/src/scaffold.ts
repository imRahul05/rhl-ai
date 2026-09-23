import fs from 'node:fs/promises';
import path from 'node:path';
import { ensureDir, pathExists, findMonorepoRoot } from '@rhl-ai/utils';
import { ScaffoldOptions, ScaffoldResult, TemplateInfo } from './types.js';

export async function resolveTemplatesDirectory(customDir?: string): Promise<string | null> {
  if (customDir) {
    const resolved = path.resolve(customDir);
    return (await pathExists(resolved)) ? resolved : null;
  }

  const root = await findMonorepoRoot();
  if (root) {
    const templatesPath = path.join(root, 'templates');
    if (await pathExists(templatesPath)) {
      return templatesPath;
    }
  }

  const cwdTemplatesPath = path.resolve('templates');
  if (await pathExists(cwdTemplatesPath)) {
    return cwdTemplatesPath;
  }

  return null;
}

export async function listTemplates(templatesDir?: string): Promise<readonly TemplateInfo[]> {
  const resolvedDir = await resolveTemplatesDirectory(templatesDir);
  if (!resolvedDir) {
    return [];
  }

  const entries = await fs.readdir(resolvedDir, { withFileTypes: true });
  const templateDirs = entries.filter(
    (entry) => entry.isDirectory() && !entry.name.startsWith('.'),
  );

  const templates: TemplateInfo[] = [];

  for (const dir of templateDirs) {
    const templatePath = path.join(resolvedDir, dir.name);
    let description = `Starter template for ${dir.name}`;

    const readmePath = path.join(templatePath, 'README.md');
    if (await pathExists(readmePath)) {
      try {
        const readmeContent = await fs.readFile(readmePath, 'utf-8');
        const firstLine = readmeContent
          .split('\n')
          .find((line) => line.trim().length > 0 && !line.startsWith('#'));
        if (firstLine) {
          description = firstLine.trim();
        }
      } catch {
        // Fallback to default description
      }
    }

    templates.push({
      name: dir.name,
      path: templatePath,
      description,
    });
  }

  return templates.sort((a, b) => a.name.localeCompare(b.name));
}

async function copyAndInterpolate(
  sourcePath: string,
  targetPath: string,
  replacements: Readonly<Record<string, string>>,
): Promise<void> {
  const stat = await fs.stat(sourcePath);

  if (stat.isDirectory()) {
    await ensureDir(targetPath);
    const children = await fs.readdir(sourcePath);
    for (const child of children) {
      if (child === 'node_modules' || child === '.turbo' || child === 'dist') {
        continue;
      }
      await copyAndInterpolate(
        path.join(sourcePath, child),
        path.join(targetPath, child),
        replacements,
      );
    }
  } else {
    await ensureDir(path.dirname(targetPath));
    const isTextFile = /\.(json|md|ts|tsx|js|jsx|html|css|yaml|yml|txt|env|gitignore)$/i.test(
      sourcePath,
    );

    if (isTextFile) {
      let content = await fs.readFile(sourcePath, 'utf-8');
      for (const [key, value] of Object.entries(replacements)) {
        content = content.replaceAll(key, value);
      }
      await fs.writeFile(targetPath, content, 'utf-8');
    } else {
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

export async function scaffoldProject(options: ScaffoldOptions): Promise<ScaffoldResult> {
  const templatesDir = await resolveTemplatesDirectory(options.templatesDir);
  if (!templatesDir) {
    return {
      success: false,
      template: options.template,
      projectName: options.projectName,
      targetPath: '',
      message: 'Could not locate templates directory in the repository.',
    };
  }

  const templatePath = path.join(templatesDir, options.template);
  if (!(await pathExists(templatePath))) {
    return {
      success: false,
      template: options.template,
      projectName: options.projectName,
      targetPath: templatePath,
      message: `Template '${options.template}' does not exist in '${templatesDir}'.`,
    };
  }

  const targetPath = options.targetDir
    ? path.resolve(options.targetDir, options.projectName)
    : path.resolve(process.cwd(), options.projectName);

  if (await pathExists(targetPath)) {
    if (!options.overwrite) {
      return {
        success: false,
        template: options.template,
        projectName: options.projectName,
        targetPath,
        message: `Target directory '${targetPath}' already exists. Pass overwrite to replace.`,
      };
    }
    await fs.rm(targetPath, { recursive: true, force: true });
  }

  const replacements: Record<string, string> = {
    '{{PROJECT_NAME}}': options.projectName,
    '{{PACKAGE_NAME}}': options.projectName.toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
  };

  await copyAndInterpolate(templatePath, targetPath, replacements);

  return {
    success: true,
    template: options.template,
    projectName: options.projectName,
    targetPath,
    message: `Project '${options.projectName}' created successfully from template '${options.template}'.`,
  };
}
