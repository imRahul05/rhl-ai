import fs from 'node:fs';
import path from 'node:path';
import { CLI_COMMANDS } from '@/content/cli';
import { DIRECTIVES } from '@/content/directives';
import { QUICKSTART_STEPS } from '@/content/quickstart';
import { SITE_PAGES } from '@/content/site';
import { SHORTLIST, SHORTLIST_FEATURES, SHORTLIST_INSTALL } from '@/content/shortlist';
import { findRepoRoot, getPackageVersion, getRepoFacts, skillInstallCommand } from './repo';
import { getAllSkills, getSkillSource } from './skills';

/**
 * Builds /llms.txt (a short, linked index — https://llmstxt.org) and
 * /llms-full.txt (the whole site and its source docs in one Markdown file),
 * so an agent handed the site URL can read everything without crawling HTML.
 * Everything is read from the repo at build time, like the rest of the site.
 */

const REPO_URL = 'https://github.com/imRahul05/rhl-ai';
const RAW_URL = 'https://raw.githubusercontent.com/imRahul05/rhl-ai/main';

/** Public origin for absolute links: SITE_URL, else Vercel's production host, else relative. */
function siteOrigin(): string {
  const explicit = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return vercel ? `https://${vercel}` : '';
}

function url(pathname: string): string {
  return `${siteOrigin()}${pathname}`;
}

/** Repo Markdown files included verbatim in llms-full.txt, in reading order. */
const SOURCE_DOCS: { file: string; title: string }[] = [
  { file: 'README.md', title: 'Repository README' },
  { file: 'docs/architecture.md', title: 'Architecture' },
  { file: 'packages/cli/README.md', title: '@rhl-ai/cli' },
  { file: 'packages/skills/README.md', title: '@rhl-ai/skills' },
  { file: 'packages/scaffold/README.md', title: '@rhl-ai/scaffold' },
  { file: 'packages/utils/README.md', title: '@rhl-ai/utils' },
  { file: 'skills/README.md', title: 'Skills folder' },
  { file: 'projects/github-whatsapp-bot/README.md', title: 'GitHub WhatsApp notifier' },
];

function readRepoFile(relative: string): string | undefined {
  try {
    return fs.readFileSync(path.join(findRepoRoot(), relative), 'utf8').trim();
  } catch {
    return undefined;
  }
}

/** Pushes every heading in embedded Markdown down `by` levels so it nests under ours. */
function demoteHeadings(markdown: string, by: number): string {
  let inFence = false;
  return markdown
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
      if (inFence) return line;
      const match = /^(#{1,6})(\s.*)$/.exec(line);
      if (!match) return line;
      const level = Math.min(6, (match[1] ?? '').length + by);
      return `${'#'.repeat(level)}${match[2] ?? ''}`;
    })
    .join('\n');
}

const SUMMARY =
  'RHL AI packages engineering judgment as SKILL.md files ("agent skills") and ships a CLI ' +
  '(`@rhl-ai/cli`, binary `rhl`) that installs them into Claude Code (`~/.claude/skills`) or any ' +
  "agent's skills folder, where they are used as slash commands such as `/code-reviewer`. It also " +
  'ships project templates and a GitHub → WhatsApp notifier. Open source, MIT licensed.';

function keyFacts(): string[] {
  const cliVersion = getPackageVersion('packages/cli');
  return [
    `- Try it with no install: \`npx @rhl-ai/cli skill list\` (Node.js >= 20).`,
    `- Install a skill into Claude Code: \`${skillInstallCommand('code-reviewer')}\`, then type \`/code-reviewer\` in a Claude Code session.`,
    "- Without `--target`, skills install to `~/.agents/skills`; point `--target` at any agent's skills directory.",
    '- A skill is a plain folder: `SKILL.md` (YAML frontmatter + instructions), plus optional `references/`, `examples/` and `scripts/`. No runtime or SDK.',
    `- Source: ${REPO_URL}${cliVersion ? ` · current CLI version: ${cliVersion}` : ''}`,
  ];
}

/** /llms.txt — the index. */
export function buildLlmsTxt(): string {
  const skills = getAllSkills();
  const { templates } = getRepoFacts();
  const out: string[] = [];

  out.push('# RHL AI', '', `> ${SUMMARY}`, '', ...keyFacts(), '');

  out.push('## Docs', '');
  out.push(
    `- [Full site content for LLMs](${url('/llms-full.txt')}): every page, every SKILL.md and the repo docs in one Markdown file. Read this if you need more than the index.`,
  );
  for (const page of SITE_PAGES) {
    out.push(`- [${page.title}](${url(page.path)}): ${page.summary}`);
  }
  out.push('');

  out.push('## Agent skills', '');
  for (const skill of skills) {
    const version = skill.version ? ` v${skill.version}` : '';
    out.push(
      `- [${skill.slug}${version}](${url(`/skills/${skill.slug}`)}): ${skill.metadata.description} Raw SKILL.md: ${RAW_URL}/skills/${skill.slug}/SKILL.md · install: \`${skillInstallCommand(skill.slug)}\``,
    );
  }
  out.push('');

  out.push('## CLI', '');
  for (const command of CLI_COMMANDS) out.push(`- \`${command.usage}\`: ${command.does}`);
  out.push('');

  out.push('## Templates', '');
  for (const template of templates) {
    out.push(`- \`rhl create ${template.name} <project-name>\`: ${template.description}`);
  }
  out.push('');

  out.push('## Other products', '');
  out.push(
    `- [${SHORTLIST.name}](${url('/products/shortlist')}): ${SHORTLIST.summary} Download: ${SHORTLIST.download} · website: ${SHORTLIST.site} · source: ${SHORTLIST.repo} · licence: ${SHORTLIST.license} (source-available, not open source).`,
  );
  out.push('');

  out.push('## Optional', '');
  out.push(`- [Source code on GitHub](${REPO_URL})`);
  for (const doc of SOURCE_DOCS)
    out.push(`- [${doc.title} (raw Markdown)](${RAW_URL}/${doc.file})`);
  out.push('');

  return out.join('\n');
}

/** /llms-full.txt — everything, inline. */
export function buildLlmsFullTxt(): string {
  const skills = getAllSkills();
  const { templates, packages } = getRepoFacts();
  const out: string[] = [];

  out.push('# RHL AI — full content', '', `> ${SUMMARY}`, '');
  out.push(
    `This file is generated from the repository at build time. The short index is at ${url('/llms.txt')}.`,
    '',
    ...keyFacts(),
    '',
  );

  out.push('## Site map', '');
  for (const page of SITE_PAGES) out.push(`- [${page.title}](${url(page.path)}): ${page.summary}`);
  for (const skill of skills) {
    out.push(`- [${skill.title}](${url(`/skills/${skill.slug}`)}): ${skill.summary}`);
  }
  out.push('');

  out.push('## Quickstart', '');
  for (const step of QUICKSTART_STEPS) {
    out.push(`### ${step.number}. ${step.title}`, '', step.description, '');
    out.push('```bash', step.command, '```', '');
    if (step.notes) out.push(step.notes, '');
  }

  out.push('## CLI reference', '');
  for (const command of CLI_COMMANDS) out.push(`- \`${command.usage}\` — ${command.does}`);
  out.push('', `Workspace packages: ${packages.map((p) => `@rhl-ai/${p}`).join(', ')}.`, '');

  out.push('## Templates', '');
  for (const template of templates) out.push(`- \`${template.name}\` — ${template.description}`);
  out.push('');

  out.push('## Directives', '');
  for (const directive of DIRECTIVES) {
    out.push(`### ${directive.number}. ${directive.name}`, '');
    out.push(`${directive.tagline}`, '', directive.description, '');
    out.push(`Enforcement: ${directive.enforcement}`, '');
    out.push('```', directive.codeExample, '```', '');
  }

  out.push(`## ${SHORTLIST.name} (Chrome extension)`, '');
  out.push(`${SHORTLIST.tagline} ${SHORTLIST.summary}`, '');
  out.push(
    `Page: ${url('/products/shortlist')} · website: ${SHORTLIST.site} · source: ${SHORTLIST.repo} · privacy policy: ${SHORTLIST.privacy}`,
    '',
  );
  for (const feature of SHORTLIST_FEATURES) {
    out.push(
      `- **${feature.title}** (${feature.ai ? 'optional AI' : 'no AI needed'}): ${feature.body}`,
    );
  }
  out.push('', 'Install:', '');
  SHORTLIST_INSTALL.forEach((step, index) => out.push(`${index + 1}. ${step}`));
  out.push('', `Download: ${SHORTLIST.download}`, '');
  out.push(`Licence: ${SHORTLIST.license}. ${SHORTLIST.licenseNote}`, '');

  out.push('## Agent skills', '');
  for (const skill of skills) {
    out.push(`### Skill: ${skill.slug}`, '');
    const meta = [
      skill.version ? `version ${skill.version}` : undefined,
      skill.npmName ? `npm \`${skill.npmName}\`` : undefined,
      skill.metadata.tags?.length ? `tags: ${skill.metadata.tags.join(', ')}` : undefined,
    ].filter(Boolean);
    if (meta.length) out.push(meta.join(' · '), '');
    out.push(`Install: \`${skillInstallCommand(skill.slug)}\` — then call \`/${skill.slug}\`.`, '');
    out.push(`Page: ${url(`/skills/${skill.slug}`)}`, '');
    out.push('Full SKILL.md:', '', '````markdown', getSkillSource(skill.slug).trim(), '````', '');
  }

  out.push('## Repository documentation', '');
  for (const doc of SOURCE_DOCS) {
    const body = readRepoFile(doc.file);
    if (!body) continue;
    out.push(`### ${doc.title} (\`${doc.file}\`)`, '', demoteHeadings(body, 3), '');
  }

  return `${out.join('\n').trim()}\n`;
}
