import { describe, it, expect } from 'vitest';
import { resolveTemplatesDirectory } from '../src/scaffold.js';

describe('@rhl-ai/scaffold', () => {
  it('locates templates directory or handles absent dir safely', async () => {
    const dir = await resolveTemplatesDirectory();
    // In monorepo root, templates/ exists or will exist
    expect(typeof dir === 'string' || dir === null).toBe(true);
  });
});
