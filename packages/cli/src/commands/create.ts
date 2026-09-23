import path from 'node:path';
import { Command } from 'commander';
import pc from 'picocolors';
import { listTemplates, scaffoldProject } from '@rhl-ai/scaffold';
import { logError, logInfo, logSuccess } from '@rhl-ai/utils';

export interface CreateProjectOptions {
  readonly target?: string;
  readonly overwrite?: boolean;
}

export function registerCreateCommand(program: Command): void {
  program
    .command('create [template] [projectName]')
    .description('Scaffold a new project from an RHL AI starter template')
    .option('-t, --target <path>', 'Destination directory')
    .option('--overwrite', 'Overwrite destination directory if it exists', false)
    .action(
      async (
        template: string | undefined,
        projectName: string | undefined,
        options: CreateProjectOptions,
      ) => {
        try {
          const templates = await listTemplates();

          if (!template || !projectName) {
            console.log(pc.bold('\nAvailable Starter Templates:\n'));
            for (const item of templates) {
              console.log(`  ${pc.cyan('•')} ${pc.bold(item.name)}: ${pc.gray(item.description)}`);
            }
            console.log('\nUsage:');
            console.log(`  rhl create ${pc.green('<template>')} ${pc.green('<project-name>')}\n`);
            return;
          }

          const templateExists = templates.some((t) => t.name === template);
          if (!templateExists) {
            logError(`Template '${template}' not found.`);
            console.log(pc.yellow('\nAvailable templates:'));
            for (const item of templates) {
              console.log(`  - ${item.name}`);
            }
            process.exitCode = 1;
            return;
          }

          logInfo(`Scaffolding '${projectName}' from template '${template}'...`);
          const result = await scaffoldProject({
            template,
            projectName,
            targetDir: options.target,
            overwrite: options.overwrite,
          });

          if (result.success) {
            logSuccess(result.message);
            const relativeTarget = path.relative(process.cwd(), result.targetPath) || projectName;
            console.log(pc.bold('\nNext steps:\n'));
            console.log(`  cd ${relativeTarget}`);
            console.log('  pnpm install');
            console.log('  pnpm dev\n');
          } else {
            logError(result.message);
            process.exitCode = 1;
          }
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          logError(`Failed to create project: ${msg}`);
          process.exitCode = 1;
        }
      },
    );
}
