import * as React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface QuickstartStep {
  number: string;
  title: string;
  description: string;
  command: string;
  notes?: string;
}

const STEPS: QuickstartStep[] = [
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

export default function QuickstartPage(): React.JSX.Element {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground transition-colors">
      <main id="main" className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">
                RHL AI
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Quickstart</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Quickstart Guide
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Get up and running with the RHL AI ecosystem, command-line tooling, and agent skills
              in under five minutes.
            </p>
          </div>
        </section>

        {/* Steps List */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="border-t border-border pt-8 grid grid-cols-1 md:grid-cols-12 gap-6"
              >
                <div className="md:col-span-4 space-y-1">
                  <span className="font-mono text-xs text-primary font-bold tracking-widest">
                    STEP {step.number}
                  </span>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">{step.title}</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    {step.description}
                  </p>
                  {step.notes ? (
                    <p className="text-[11px] font-mono text-muted-foreground/80 pt-2">
                      Note: {step.notes}
                    </p>
                  ) : null}
                </div>

                <div className="md:col-span-8">
                  <div className="rounded-lg border border-border bg-card p-4 font-mono text-xs leading-relaxed text-foreground/90 overflow-x-auto">
                    <pre className="whitespace-pre">{step.command}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
