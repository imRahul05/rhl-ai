/** `rhl` commands shown on the home page. Also served to agents through /llms.txt. */

export interface CliCommand {
  usage: string;
  does: string;
}

export const CLI_COMMANDS: CliCommand[] = [
  { usage: 'rhl skill list', does: 'List every skill in the catalog' },
  { usage: 'rhl skill create <name>', does: 'Scaffold a new skill folder' },
  { usage: 'rhl skill validate <name>', does: 'Check structure and SKILL.md metadata' },
  {
    usage: 'rhl skill install <name> -t ~/.claude/skills',
    does: 'Install into Claude Code; call it with /<name>',
  },
  { usage: 'rhl skill update [name]', does: 'Refresh installed skills' },
  { usage: 'rhl create <template> <name>', does: 'Start a project from a template' },
];
