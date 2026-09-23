import path from 'node:path';
import { Command } from 'commander';
import pc from 'picocolors';
import {
  discoverSkills,
  createSkill,
  validateSkill,
  installSkill,
  resolveSkillsDirectory,
} from '@rhl-ai/skills';
import { logError, logInfo, logSuccess, logWarn } from '@rhl-ai/utils';

export interface CreateCommandOptions {
  readonly description?: string;
  readonly author?: string;
}

export interface InstallCommandOptions {
  readonly target?: string;
  readonly overwrite?: boolean;
}

export interface UpdateCommandOptions {
  readonly target?: string;
}

export function registerSkillCommands(program: Command): void {
  const skill = program
    .command('skill')
    .description('Manage, create, validate, and install AI agent skills');

  skill
    .command('list')
    .description('List all available AI agent skills in the monorepo')
    .action(async () => {
      try {
        const skills = await discoverSkills();
        if (skills.length === 0) {
          logInfo('No skills found. Create one with `rhl skill create <name>`.');
          return;
        }

        console.log(pc.bold(`\nAvailable AI Agent Skills (${skills.length}):\n`));
        for (const item of skills) {
          const versionTag = item.metadata.version ? pc.dim(`v${item.metadata.version}`) : '';
          const authorTag = item.metadata.author ? pc.dim(`by ${item.metadata.author}`) : '';
          console.log(`  ${pc.cyan('•')} ${pc.bold(item.name)} ${versionTag} ${authorTag}`);
          console.log(`    ${pc.gray(item.metadata.description || 'No description provided')}`);
          console.log(
            `    ${pc.dim(
              `Files: ${item.files.references.length} references, ${item.files.examples.length} examples, ${item.files.scripts.length} scripts`,
            )}\n`,
          );
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        logError(`Failed to list skills: ${msg}`);
        process.exitCode = 1;
      }
    });

  skill
    .command('create <name>')
    .description('Scaffold a new skill directory with SKILL.md and assets')
    .option('-d, --description <desc>', 'Short summary of what the skill does')
    .option('-a, --author <author>', 'Author name')
    .action(async (name: string, options: CreateCommandOptions) => {
      try {
        logInfo(`Creating new AI skill '${name}'...`);
        const skillPath = await createSkill(name, {
          description: options.description,
          author: options.author,
        });
        logSuccess(`Skill created at ${pc.bold(skillPath)}`);
        logInfo('Next steps:');
        console.log(
          `  1. Edit ${path.join(skillPath, 'SKILL.md')} to define workflows & constraints.`,
        );
        console.log(`  2. Add reference docs under ${path.join(skillPath, 'references/')}.`);
        console.log(`  3. Run \`rhl skill validate ${name}\` to verify.`);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        logError(`Failed to create skill: ${msg}`);
        process.exitCode = 1;
      }
    });

  skill
    .command('validate <name>')
    .description('Validate a skill directory and its SKILL.md specification')
    .action(async (name: string) => {
      try {
        const skillsDir = await resolveSkillsDirectory();
        const targetPath = skillsDir ? path.join(skillsDir, name) : path.resolve(name);

        logInfo(`Validating skill '${name}' at ${targetPath}...`);
        const result = await validateSkill(targetPath);

        if (result.issues.length === 0) {
          logSuccess(`Skill '${name}' is valid and ready for agents!`);
          return;
        }

        for (const issue of result.issues) {
          if (issue.severity === 'error') {
            logError(`[${issue.field}] ${issue.message}`);
          } else {
            logWarn(`[${issue.field}] ${issue.message}`);
          }
        }

        if (result.isValid) {
          logSuccess(`Skill '${name}' passed validation with warnings.`);
        } else {
          logError(`Skill '${name}' failed validation.`);
          process.exitCode = 1;
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        logError(`Validation error: ${msg}`);
        process.exitCode = 1;
      }
    });

  skill
    .command('install <name>')
    .description('Install a skill to the local agent skills directory (~/.agents/skills/)')
    .option('-t, --target <path>', 'Custom destination directory')
    .option('--overwrite', 'Overwrite existing skill in destination', false)
    .action(async (name: string, options: InstallCommandOptions) => {
      try {
        logInfo(`Installing skill '${name}'...`);
        const result = await installSkill(name, {
          targetDir: options.target,
          overwrite: options.overwrite,
        });

        if (result.success) {
          logSuccess(result.message);
        } else {
          logError(result.message);
          process.exitCode = 1;
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        logError(`Failed to install skill: ${msg}`);
        process.exitCode = 1;
      }
    });

  skill
    .command('update [name]')
    .description('Update an installed skill or all installed skills to latest monorepo version')
    .option('-t, --target <path>', 'Custom agent skills directory')
    .action(async (name: string | undefined, options: UpdateCommandOptions) => {
      try {
        const skillsToUpdate: string[] = [];

        if (name) {
          skillsToUpdate.push(name);
        } else {
          const allSkills = await discoverSkills();
          for (const s of allSkills) {
            skillsToUpdate.push(s.name);
          }
        }

        if (skillsToUpdate.length === 0) {
          logInfo('No skills to update.');
          return;
        }

        logInfo(`Updating ${skillsToUpdate.length} skill(s)...`);
        for (const skillName of skillsToUpdate) {
          const res = await installSkill(skillName, {
            targetDir: options.target,
            overwrite: true,
          });
          if (res.success) {
            logSuccess(`Updated ${skillName}`);
          } else {
            logWarn(`Skipped ${skillName}: ${res.message}`);
          }
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        logError(`Failed to update skills: ${msg}`);
        process.exitCode = 1;
      }
    });
}
