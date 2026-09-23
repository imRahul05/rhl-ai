import fs from 'node:fs/promises';
import path from 'node:path';

export async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function readJsonFile<T>(filePath: string): Promise<T> {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content) as T;
}

export async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  const content = JSON.stringify(data, null, 2) + '\n';
  await fs.writeFile(filePath, content, 'utf-8');
}

export async function findMonorepoRoot(startDir: string = process.cwd()): Promise<string | null> {
  let currentDir = path.resolve(startDir);
  const rootAnchor = path.parse(currentDir).root;

  while (currentDir !== rootAnchor) {
    const pnpmWorkspacePath = path.join(currentDir, 'pnpm-workspace.yaml');
    const turboPath = path.join(currentDir, 'turbo.json');
    const hasWorkspace = await pathExists(pnpmWorkspacePath);
    const hasTurbo = await pathExists(turboPath);

    if (hasWorkspace || hasTurbo) {
      return currentDir;
    }

    currentDir = path.dirname(currentDir);
  }

  return null;
}
