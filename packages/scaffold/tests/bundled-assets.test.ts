import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { listTemplates, resolveTemplatesDirectory, scaffoldProject } from '../src/scaffold.js';

const bundled = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'assets',
  'templates',
);

describe('templates directory resolution fallback', () => {
  let tmp: string;
  let originalCwd: string;
  let createdBundled = false;

  beforeEach(async () => {
    originalCwd = process.cwd();
    tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'rhl-templates-'));
    process.chdir(tmp);
    try {
      await fs.access(bundled);
    } catch {
      const t = path.join(bundled, 'demo');
      await fs.mkdir(t, { recursive: true });
      await fs.writeFile(path.join(t, 'package.json'), '{"name":"{{PACKAGE_NAME}}"}');
      createdBundled = true;
    }
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    if (createdBundled) {
      await fs.rm(path.dirname(bundled), { recursive: true, force: true });
      createdBundled = false;
    }
    await fs.rm(tmp, { recursive: true, force: true });
  });

  it('falls back to bundled assets with no monorepo root and no cwd templates/', async () => {
    expect(await resolveTemplatesDirectory()).toBe(bundled);
    expect((await listTemplates()).length).toBeGreaterThan(0);
  });

  it('prefers cwd templates/ over bundled assets', async () => {
    await fs.mkdir(path.join(tmp, 'templates'));
    const resolved = await resolveTemplatesDirectory();
    expect(await fs.realpath(resolved as string)).toBe(
      await fs.realpath(path.join(tmp, 'templates')),
    );
  });

  it('restores gitignore to .gitignore when scaffolding', async () => {
    const src = path.join(tmp, 'tpl');
    await fs.mkdir(path.join(src, 'x'), { recursive: true });
    await fs.writeFile(path.join(src, 'x', 'gitignore'), 'dist\n');
    const result = await scaffoldProject({
      template: 'x',
      projectName: 'out',
      templatesDir: src,
      targetDir: tmp,
    });
    expect(result.success).toBe(true);
    await expect(fs.readFile(path.join(tmp, 'out', '.gitignore'), 'utf-8')).resolves.toBe(
      'dist\n',
    );
  });
});
