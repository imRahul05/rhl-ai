import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Spotlight } from '@/components/motion/spotlight';
import type { SkillEntry } from '@/lib/skills';
import type { TemplateEntry } from '@/lib/repo';
import { NotifierDemo } from './notifier-demo';

export interface ProductBentoProps {
  skills: readonly SkillEntry[];
  templates: readonly TemplateEntry[];
}

interface CliCommand {
  usage: string;
  does: string;
}

const CLI_COMMANDS: CliCommand[] = [
  { usage: 'rhl skill list', does: 'List every skill in the catalog' },
  { usage: 'rhl skill create <name>', does: 'Scaffold a new skill folder' },
  { usage: 'rhl skill validate <name>', does: 'Check structure and SKILL.md metadata' },
  { usage: 'rhl skill install <name>', does: 'Copy a skill to ~/.agents/skills' },
  { usage: 'rhl skill update [name]', does: 'Refresh installed skills' },
  { usage: 'rhl create <template> <name>', does: 'Start a project from a template' },
];

interface CellHeaderProps {
  index: string;
  kicker: string;
  title: string;
  href: string;
  linkLabel: string;
}

function CellHeader({ index, kicker, title, href, linkLabel }: CellHeaderProps): React.JSX.Element {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="label">
          <span className="text-primary">{index}</span> {kicker}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
          {title}
        </h3>
      </div>
      <Link
        href={href}
        aria-label={linkLabel}
        className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 after:absolute after:inset-0 after:content-[''] hover:border-primary hover:text-primary"
      >
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover/cell:rotate-45"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}

const CELL = 'group/cell h-full bg-background p-6 sm:p-8';

/** Products as a ruled sheet: shared hairlines, a spotlight that follows the cursor. */
export function ProductBento({ skills, templates }: ProductBentoProps): React.JSX.Element {
  return (
    <section aria-labelledby="products-title" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="label">
              <span className="text-primary">03</span> — What ships
            </p>
            <h2 id="products-title" className="display-lg mt-5 max-w-2xl">
              Three tools. One way of working.
            </h2>
          </div>
          <Link
            href="/products"
            className="link-line self-start pb-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:self-auto"
          >
            All products →
          </Link>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-6">
          {/* CLI */}
          <Reveal className="lg:col-span-4">
            <Spotlight className={CELL}>
              <CellHeader
                index="A"
                kicker="@rhl-ai/cli"
                title="One binary for the whole loop."
                href="/products/rhl-cli"
                linkLabel="RHL CLI details"
              />
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                The <code className="font-mono text-foreground">rhl</code> command discovers,
                validates and installs skills, and scaffolds new projects. Strict TypeScript,
                published on npm.
              </p>
              <ul className="mt-8 border-t border-border font-mono text-[12px] sm:text-[13px]">
                {CLI_COMMANDS.map((command) => (
                  <li
                    key={command.usage}
                    className="group/row grid grid-cols-1 gap-x-6 gap-y-0.5 border-b border-border py-2.5 transition-colors hover:bg-muted/60 sm:grid-cols-[minmax(0,17rem)_1fr] sm:px-2"
                  >
                    <span className="text-foreground">
                      <span className="mr-2 text-primary opacity-40 transition-opacity group-hover/row:opacity-100">
                        ❯
                      </span>
                      {command.usage}
                    </span>
                    <span className="font-sans text-muted-foreground max-sm:pl-5">
                      {command.does}
                    </span>
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>

          {/* Skills */}
          <Reveal className="lg:col-span-2" delay={0.08}>
            <Spotlight className={CELL}>
              <CellHeader
                index="B"
                kicker="skills/"
                title="Agent Skills"
                href="/skills"
                linkLabel="Skills catalog"
              />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Behavior packs written in Markdown. Also published to npm as{' '}
                <code className="font-mono text-foreground">@rhl-ai/skill-*</code>.
              </p>
              <ul className="mt-8 space-y-3">
                {skills.map((skill) => (
                  <li key={skill.slug}>
                    <Link
                      href={`/skills/${skill.slug}`}
                      className="relative z-10 block rounded-md border border-border bg-card p-3.5 transition-colors hover:border-foreground/40"
                    >
                      <span className="flex items-center justify-between gap-2 font-mono text-[12px] text-foreground">
                        <span className="truncate">{skill.slug}</span>
                        {skill.metadata.version ? (
                          <span className="shrink-0 text-muted-foreground">
                            v{skill.metadata.version}
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1.5 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">
                        {skill.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>

          {/* Notifier */}
          <Reveal className="lg:col-span-3">
            <Spotlight className={CELL}>
              <CellHeader
                index="C"
                kicker="create-github-whatsapp-notifier"
                title="GitHub, on your phone."
                href="/products/whatsapp-bot"
                linkLabel="GitHub WhatsApp notifier details"
              />
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                A scaffolded Express webhook that turns pull request assignments, review requests
                and CI events into WhatsApp messages through Twilio.
              </p>
              <div className="mt-8">
                <NotifierDemo />
              </div>
            </Spotlight>
          </Reveal>

          {/* Templates */}
          <Reveal className="lg:col-span-3" delay={0.08}>
            <Spotlight className={CELL}>
              <CellHeader
                index="D"
                kicker="templates/"
                title="Start from a known-good base."
                href="/products/rhl-cli"
                linkLabel="Project templates in the RHL CLI"
              />
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                <code className="font-mono text-foreground">rhl create</code> copies a starter and
                gets out of the way.
              </p>
              <ul className="mt-8 border-t border-border">
                {templates.map((template) => (
                  <li
                    key={template.name}
                    className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-4 border-b border-border py-3"
                  >
                    <span className="font-mono text-[13px] text-foreground">{template.name}</span>
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      {template.description}
                    </span>
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
