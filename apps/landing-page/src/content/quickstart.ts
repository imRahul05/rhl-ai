/** The quickstart steps. Also served to agents through /llms.txt and /llms-full.txt. */

export interface QuickstartStep {
  number: string;
  title: string;
  description: string;
  command: string;
  notes?: string;
}

export const QUICKSTART_STEPS: QuickstartStep[] = [
  {
    number: '01',
    title: 'See which skills are available',
    description:
      'No clone or global install needed: the published CLI ships with every skill and template. Run it with npx from any folder.',
    command: 'npx @rhl-ai/cli skill list',
    notes:
      'Requires Node.js >= 20. Prefer a global command? npm install -g @rhl-ai/cli, then use rhl.',
  },
  {
    number: '02',
    title: 'Install a skill into Claude Code',
    description:
      'Copy a skill into the folder your coding agent reads. For Claude Code that is ~/.claude/skills (all projects) or .claude/skills inside a repo (shared with your team).',
    command: 'npx @rhl-ai/cli skill install code-reviewer --target ~/.claude/skills',
    notes:
      'Without --target the skill goes to ~/.agents/skills, for agents that read that shared folder. Point --target at any other agent’s skills directory.',
  },
  {
    number: '03',
    title: 'Use it from your agent',
    description:
      'Start a new Claude Code session in your project and call the skill by name, or just describe the task and let the agent pick the skill up automatically.',
    command: `/code-reviewer
/pr-description-writer
/frontend-performance-engineer the product page is slow on mobile`,
    notes:
      'In other agents, name the skill in your prompt: “Use the code-reviewer skill to review my changes”.',
  },
  {
    number: '04',
    title: 'Scaffold a project',
    description:
      'Generate a starter from the bundled templates: Next.js, React, Node, or the GitHub → WhatsApp notifier bot.',
    command: `npx @rhl-ai/cli create
npx @rhl-ai/cli create nextjs my-app
npx @rhl-ai/cli create whatsapp-bot my-bot`,
    notes: 'Running create without arguments lists every template.',
  },
];
