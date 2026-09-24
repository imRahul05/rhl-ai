import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChevronRight } from 'lucide-react';

interface ArchitectureTier {
  number: string;
  name: string;
  tagline: string;
  description: string;
  components: {
    name: string;
    path: string;
    role: string;
  }[];
}

const TIERS: ArchitectureTier[] = [
  {
    number: '01',
    name: 'Intelligence Tier',
    tagline: 'Decoupled prompt schemas and behavioral heuristics.',
    description:
      'Contains pure markdown and YAML frontmatter skill specifications. Separated from compiled code, portable across LLM agent executors, and carrying zero bundle overhead.',
    components: [
      {
        name: 'code-reviewer',
        path: 'skills/code-reviewer/SKILL.md',
        role: 'Multi-axis code review heuristics and 3-tier severity classification.',
      },
      {
        name: 'frontend-performance-engineer',
        path: 'skills/frontend-performance-engineer/SKILL.md',
        role: 'Core Web Vitals diagnostic loops, pattern selection, and evidence rules.',
      },
    ],
  },
  {
    number: '02',
    name: 'Execution Tier',
    tagline: 'Strict TypeScript CLI binary, package scaffolding, and utilities.',
    description:
      'The core npm packages that power local development workflows. Built with native ESM, strict type checking, and Turborepo compilation caching.',
    components: [
      {
        name: '@rhl-ai/cli',
        path: 'packages/cli',
        role: 'Central command-line interface for skill management and application bootstrapping.',
      },
      {
        name: '@rhl-ai/scaffold',
        path: 'packages/scaffold',
        role: 'Template generator engine producing strict TypeScript project scaffolding.',
      },
      {
        name: '@rhl-ai/skills',
        path: 'packages/skills',
        role: 'Monorepo skill discovery, parser, and validator logic.',
      },
      {
        name: '@rhl-ai/utils',
        path: 'packages/utils',
        role: 'Shared logging, formatting, and file-system helpers.',
      },
    ],
  },
  {
    number: '03',
    name: 'Automations Tier',
    tagline: 'Webhook microservices and external notification bridges.',
    description:
      'Autonomous integration services that bridge development events (GitHub PRs, CI failures, releases) to real-time developer communication channels.',
    components: [
      {
        name: 'create-github-whatsapp-notifier',
        path: 'projects/github-whatsapp-bot',
        role: 'Standalone webhook server dispatching GitHub event alerts to WhatsApp via Twilio.',
      },
    ],
  },
];

export default function ArchitecturePage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">
                RHL AI
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Architecture
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              A 3-tier decoupled monorepo architecture unifying agent intelligence, developer CLI execution, and production automations.
            </p>
          </div>
        </section>

        {/* Monorepo Structural Diagram */}
        <section className="py-16 border-b border-border bg-muted/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              MONOREPO TOPOLOGY
            </p>
            <div className="rounded-lg border border-border bg-card p-5 font-mono text-xs leading-relaxed overflow-x-auto">
              <pre className="text-foreground/90 whitespace-pre">{`rhl-ai/
├── skills/                     # [TIER 1: INTELLIGENCE]
│   ├── code-reviewer/          # Declarative markdown skill schemas
│   └── frontend-performance/   # Decision trees, evidence heuristics
├── packages/                   # [TIER 2: EXECUTION]
│   ├── cli/                    # @rhl-ai/cli binary (Commander + ESM)
│   ├── scaffold/               # @rhl-ai/scaffold template generator
│   ├── skills/                 # @rhl-ai/skills parser & validator
│   └── utils/                  # @rhl-ai/utils shared helpers
├── projects/                   # [TIER 3: AUTOMATION]
│   └── github-whatsapp-bot/    # create-github-whatsapp-notifier
└── apps/                       # [PRESENTATION]
    └── landing-page/           # Product site & documentation catalog`}</pre>
            </div>
          </div>
        </section>

        {/* 3-Tier Breakdown */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="divide-y divide-border">
              {TIERS.map((tier) => (
                <div
                  key={tier.number}
                  className="py-12 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Left Column */}
                  <div className="lg:col-span-4 space-y-2">
                    <span className="font-mono text-xs text-primary font-bold tracking-widest">
                      TIER {tier.number}
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {tier.name}
                    </h2>
                    <p className="text-sm font-medium text-foreground/90 pt-1">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="space-y-3 pt-2">
                      {tier.components.map((comp) => (
                        <div
                          key={comp.name}
                          className="rounded-md border border-border p-3.5 bg-card/60 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-semibold text-foreground">
                              {comp.name}
                            </span>
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {comp.path}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {comp.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
