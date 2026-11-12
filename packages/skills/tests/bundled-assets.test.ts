import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getBundledSkillsDirectory, resolveSkillsDirectory } from '../src/discoverer.js';

describe('skills directory resolution fallback', () => {
  let tmp: string;
  let originalCwd: string;
  let createdBundled = false;
  const bundled = getBundledSkillsDirectory();

  beforeEach(async () => {
    originalCwd = process.cwd();
    tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'rhl-skills-'));
    process.chdir(tmp);
    // Simulate a published install: bundled assets exist next to the module.
    try {
      await fs.access(bundled);
    } catch {
      await fs.mkdir(path.join(bundled, 'demo'), { recursive: true });
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

  it('falls back to bundled assets with no monorepo root and no cwd skills/', async () => {
    expect(await resolveSkillsDirectory()).toBe(bundled);
  });

  it('prefers cwd skills/ over bundled assets', async () => {
    await fs.mkdir(path.join(tmp, 'skills'));
    const resolved = await resolveSkillsDirectory();
    expect(await fs.realpath(resolved as string)).toBe(
      await fs.realpath(path.join(tmp, 'skills')),
    );
  });

  it('prefers an explicit custom dir', async () => {
    const custom = path.join(tmp, 'custom');
    await fs.mkdir(custom);
    expect(await resolveSkillsDirectory(custom)).toBe(custom);
  });
});
