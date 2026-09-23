import { describe, it, expect } from 'vitest';
import { parseSkillMarkdown } from '../src/parser.js';

describe('@rhl-ai/skills', () => {
  it('parses frontmatter and instructions accurately', () => {
    const markdown = `---
name: code-reviewer
description: Expert AI code reviewer for TypeScript and modern web stacks.
version: 1.0.0
author: Rahul
tags:
  - review
  - typescript
---

# Code Reviewer

## Overview
Perform deep code review.
`;

    const { metadata, instructions } = parseSkillMarkdown(markdown);

    expect(metadata.name).toBe('code-reviewer');
    expect(metadata.description).toBe(
      'Expert AI code reviewer for TypeScript and modern web stacks.',
    );
    expect(metadata.version).toBe('1.0.0');
    expect(metadata.author).toBe('Rahul');
    expect(metadata.tags).toEqual(['review', 'typescript']);
    expect(instructions).toContain('# Code Reviewer');
  });

  it('handles markdown without frontmatter gracefully', () => {
    const rawMarkdown = '# Just instructions\n\nNo frontmatter here.';
    const { metadata, instructions } = parseSkillMarkdown(rawMarkdown);

    expect(metadata.name).toBe('');
    expect(metadata.description).toBe('');
    expect(instructions).toBe(rawMarkdown);
  });
});
