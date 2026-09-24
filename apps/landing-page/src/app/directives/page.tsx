import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChevronRight } from 'lucide-react';

interface DirectiveItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  enforcement: string;
  codeExample: string;
}

const DIRECTIVES: DirectiveItem[] = [
  {
    id: 'decoupled-intelligence',
    number: '01',
    name: 'Decoupled Intelligence Duality',
    tagline: 'Separate LLM prompt artifacts from compiled runtime code.',
    description:
      'We separate LLM behavioral prompt artifacts from compiled runtime code. Agent skills live in structured markdown schemas with declarative YAML frontmatter, while packages remain feather-light with 0 KB bundle overhead.',
    enforcement: 'Enforced by RHL CLI registry validation and skills catalog linter.',
    codeExample: `# skills/code-reviewer/SKILL.md
---
name: code-reviewer
description: Expert AI code reviewer for strict TypeScript.
version: 1.0.0
---
## Decision Framework
1. Blocking (Must Fix)
2. Non-Blocking (Should Fix)
3. Nitpick (Optional)`,
  },
  {
    id: 'strict-type-safety',
    number: '02',
    name: 'Absolute Zero Any Type Safety',
    tagline: 'Zero any tolerance across all packages, tools, and interfaces.',
    description:
      'The usage of any is strictly banned across all repositories, packages, tools, and APIs. Unsafe casts, implicit anys, and loose records are blocked at compile time with strict TypeScript and zero-warning ESLint rules.',
    enforcement: 'Enforced by CI typecheck with noImplicitAny and strict compiler flags.',
    codeExample: `// Strictly forbidden:
function handleData(data: any): any { ... }

// Enforced alternative:
function handleData<T extends Record<string, unknown>>(
  data: T
): ValidatedPayload<T> { ... }`,
  },
  {
    id: 'agent-native-ergonomics',
    number: '03',
    name: 'Agent-Native Ergonomics',
    tagline: 'Structured markdown formats designed for AI reasoning.',
    description:
      'Prompts and operating directives are formatted for machine readability and cognitive clarity. Clear operating loops, negative constraints, and exact output contracts ensure autonomous coding agents deliver deterministic results.',
    enforcement: 'Enforced by standardized SKILL.md template guidelines and validation scripts.',
    codeExample: `## Operating Loop
1. Frame -> Target device, user journey, target metric
2. Measure -> RUM, CrUX, or reproducible traces
3. Localize -> Network, bundle, rendering, or interaction
4. Implement -> Smallest justified change
5. Verify -> Measure exact same metric under same conditions`,
  },
  {
    id: 'monorepo-cohesion',
    number: '04',
    name: 'Modular Monorepo Cohesion',
    tagline: 'Independent packages unified through Turborepo.',
    description:
      'Every package in the @rhl-ai namespace functions as an independent, single-responsibility module with explicit boundaries. High-performance Turborepo caching guarantees instantaneous incremental builds.',
    enforcement: 'Enforced by pnpm workspaces and turborepo pipeline configurations.',
    codeExample: `pnpm-workspace.yaml:
packages:
  - 'packages/*'
  - 'apps/*'
  - 'projects/*'`,
  },
];

export default function DirectivesPage(): React.JSX.Element {
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
              <span className="text-foreground">Directives</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Directives
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              The foundational engineering laws governing RHL AI software architecture, type safety, and agent behaviors.
            </p>
          </div>
        </section>

        {/* Directives List */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="divide-y divide-border">
              {DIRECTIVES.map((directive) => (
                <div
                  key={directive.id}
                  className="py-12 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Left Column: Directive Title & Number */}
                  <div className="lg:col-span-4 space-y-2">
                    <span className="font-mono text-xs text-primary font-bold tracking-widest">
                      DIRECTIVE {directive.number}
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {directive.name}
                    </h2>
                    <p className="text-xs font-mono text-muted-foreground pt-1">
                      {directive.enforcement}
                    </p>
                  </div>

                  {/* Right Column: Statement & Code */}
                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-sm font-medium text-foreground">
                      {directive.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {directive.description}
                    </p>

                    <div className="pt-2">
                      <div className="rounded-md border border-border bg-card p-4 font-mono text-xs text-foreground/90 overflow-x-auto">
                        <pre className="whitespace-pre">{directive.codeExample}</pre>
                      </div>
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
