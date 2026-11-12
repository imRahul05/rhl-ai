import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';
import { configureLogger } from '@rhl-ai/utils';
import { registerSkillCommands } from './commands/skill.js';
import { registerCreateCommand } from './commands/create.js';

export function createCli(): Command {
  const program = new Command();

  program
    .name('rhl')
    .description('RHL AI - Developer & AI Tooling Suite CLI')
    .version('0.1.0')
    .option('-v, --verbose', 'Enable verbose logging output')
    .option('-s, --silent', 'Suppress standard console output')
    .hook('preAction', (thisCommand) => {
      const opts = thisCommand.opts<{ verbose?: boolean; silent?: boolean }>();
      configureLogger({
        isVerbose: Boolean(opts.verbose),
        isSilent: Boolean(opts.silent),
      });
    });

  registerSkillCommands(program);
  registerCreateCommand(program);

  return program;
}

export function runCli(argv: readonly string[] = process.argv): void {
  const program = createCli();
  program.parse(argv as string[]);
}

function isMainModule(): boolean {
  const entry = process.argv[1];
  if (!entry) {
    return false;
  }
  try {
    // Resolve symlinks: package managers expose bins (node_modules/.bin/rhl) as symlinks.
    return realpathSync(entry) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

// Automatically run when executed as binary
if (isMainModule()) {
  runCli();
}
