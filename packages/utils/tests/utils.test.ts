import { describe, it, expect } from 'vitest';
import path from 'node:path';
import { pathExists, findMonorepoRoot, configureLogger } from '../src/index.js';

describe('@rhl-ai/utils', () => {
  it('correctly checks path existence', async () => {
    const cwd = process.cwd();
    const exists = await pathExists(cwd);
    expect(exists).toBe(true);

    const nonExistent = await pathExists(path.join(cwd, 'non-existent-file-12345.xyz'));
    expect(nonExistent).toBe(false);
  });

  it('can configure logger without throwing', () => {
    expect(() => {
      configureLogger({ isVerbose: true, isSilent: false });
    }).not.toThrow();
  });

  it('finds monorepo root', async () => {
    const root = await findMonorepoRoot(process.cwd());
    expect(root).not.toBeNull();
  });
});
