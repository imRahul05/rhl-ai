import { describe, it, expect } from 'vitest';
import { createCli } from '../src/index.js';

describe('@rhl-ai/cli', () => {
  it('creates commander instance with correct commands', () => {
    const program = createCli();
    expect(program.name()).toBe('rhl');

    const commandNames = program.commands.map((cmd) => cmd.name());
    expect(commandNames).toContain('skill');
    expect(commandNames).toContain('create');
  });

  it('skill command has subcommands', () => {
    const program = createCli();
    const skillCmd = program.commands.find((c) => c.name() === 'skill');
    expect(skillCmd).toBeDefined();

    const subcommands = skillCmd?.commands.map((c) => c.name()) ?? [];
    expect(subcommands).toContain('list');
    expect(subcommands).toContain('create');
    expect(subcommands).toContain('validate');
    expect(subcommands).toContain('install');
    expect(subcommands).toContain('update');
  });
});
