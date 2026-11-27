/** Every public page, with a one-line summary. Drives the page map in /llms.txt. */

export interface SitePage {
  path: string;
  title: string;
  summary: string;
}

export const SITE_PAGES: SitePage[] = [
  {
    path: '/',
    title: 'Home',
    summary:
      'What RHL AI is: SKILL.md agent skills, the `rhl` CLI that installs them, project templates, a GitHub → WhatsApp notifier and the Shortlist Chrome extension.',
  },
  {
    path: '/quickstart',
    title: 'Quickstart',
    summary:
      'Four steps: list skills, install one into Claude Code, call it as a slash command, scaffold a project.',
  },
  {
    path: '/skills',
    title: 'Skills catalog',
    summary: 'Every agent skill in the repo with version, tags and install command.',
  },
  {
    path: '/products',
    title: 'Products',
    summary:
      'The RHL CLI, the Agent Skills system and the GitHub WhatsApp bot, and how they fit together.',
  },
  {
    path: '/products/rhl-cli',
    title: 'RHL CLI',
    summary:
      'The `rhl` command: skill discovery, validation, installation and project scaffolding.',
  },
  {
    path: '/products/skills',
    title: 'Agent Skills system',
    summary:
      'Why behaviour lives in Markdown skills instead of application code, and how a skill is structured.',
  },
  {
    path: '/products/whatsapp-bot',
    title: 'GitHub WhatsApp bot',
    summary:
      'An Express webhook that turns GitHub pull request and CI events into WhatsApp messages via Twilio.',
  },
  {
    path: '/products/shortlist',
    title: 'Shortlist',
    summary:
      'A free Chrome extension that scores your resume against any job page, tailors it in one click and autofills applications, entirely in the browser. Source-available (PolyForm Strict), in its own repo.',
  },
  {
    path: '/directives',
    title: 'Directives',
    summary:
      'The engineering laws the project follows: decoupled intelligence, zero `any`, agent-native formats, modular monorepo.',
  },
  {
    path: '/architecture',
    title: 'Architecture',
    summary:
      'The monorepo layout and package dependency graph (@rhl-ai/utils → skills, scaffold → cli).',
  },
  {
    path: '/about',
    title: 'About',
    summary: 'Why RHL AI exists and who builds it.',
  },
];
