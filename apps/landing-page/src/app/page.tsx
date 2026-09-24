import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TerminalDemo } from '@/components/terminal-demo';
import { Button } from '@/components/ui/button';
import { ArrowRight, Terminal, Brain, MessageSquare } from 'lucide-react';

interface FeaturedProduct {
  title: string;
  category: string;
  tagline: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  pill: string;
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    title: 'RHL CLI',
    category: 'DEVELOPER TOOLING',
    tagline: 'The command center for agent workflows.',
    description:
      'Discover, validate, and install agent skills directly into your local workspace. Scaffold production-ready applications with zero friction.',
    href: '/products/rhl-cli',
    icon: <Terminal className="w-5 h-5 text-foreground" />,
    pill: '@rhl-ai/cli',
  },
  {
    title: 'Agent Skills',
    category: 'BEHAVIORAL INTELLIGENCE',
    tagline: 'Reusable intelligence for coding agents.',
    description:
      'Curated behavioral heuristics and quality frameworks encoded in declarative markdown schemas. Completely decoupled from application runtime bundles.',
    href: '/products/skills',
    icon: <Brain className="w-5 h-5 text-foreground" />,
    pill: 'skills/catalog',
  },
  {
    title: 'GitHub WhatsApp Bot',
    category: 'AUTOMATION & WEBHOOKS',
    tagline: 'Real-time developer notifications.',
    description:
      'High-signal webhook alerts for pull request reviews, merged changes, and CI/CD workflow failures delivered straight to WhatsApp.',
    href: '/products/whatsapp-bot',
    icon: <MessageSquare className="w-5 h-5 text-foreground" />,
    pill: 'whatsapp-notifier',
  },
];

interface Principle {
  title: string;
  summary: string;
  detail: string;
}

const PRINCIPLES: Principle[] = [
  {
    title: 'Strict TypeScript',
    summary: 'Absolute zero any tolerance.',
    detail: 'Every interface, package, and script is enforced with strict type checking and zero runtime compromises.',
  },
  {
    title: 'Composable Tooling',
    summary: 'Modular independent packages.',
    detail: 'Use tools individually or unified through the CLI. Every module has clear boundaries and minimal dependencies.',
  },
  {
    title: 'Agent-Native Ergonomics',
    summary: 'Designed for LLM-assisted coding.',
    detail: 'Structured prompts, YAML frontmatter, and multi-axis evaluation frameworks that AI agents follow consistently.',
  },
  {
    title: 'Open Source Community',
    summary: 'MIT permissive license.',
    detail: 'Built transparently for developers. Inspect source code, contribute custom skills, and self-host automations.',
  },
];

export default function HomePage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Header />

      <main className="flex-1">
        {/* SECTION 1: HERO */}
        <section className="py-20 md:py-28 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                RHL AI / ECOSYSTEM
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.08] mb-6">
                Engineering infrastructure for AI-assisted development.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                Reusable agent skills, developer tooling, and production workflows — designed to work together.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/products">
                  <Button size="lg" className="gap-2">
                    Explore Products
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link
                  href="https://github.com/imRahul05/rhl-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg">
                    View GitHub
                  </Button>
                </Link>
              </div>
            </div>

            {/* Restrained Architectural Composition */}
            <div className="mt-16 pt-10 border-t border-border/60">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    01 / INTELLIGENCE
                  </span>
                  <h3 className="font-semibold text-foreground">Portable Agent Skills</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Evaluated against multi-axis heuristics: correctness, type safety, architecture, security, and performance.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    02 / EXECUTION
                  </span>
                  <h3 className="font-semibold text-foreground">RHL CLI Orchestrator</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Single binary orchestrating skill installation, package scaffolding, and workspace validation.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    03 / AUTOMATION
                  </span>
                  <h3 className="font-semibold text-foreground">Webhook Integrations</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Real-time notifications bridging GitHub CI/CD webhooks with developer messaging channels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: FEATURED PRODUCTS */}
        <section className="py-20 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  PORTFOLIO
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Products built to work together
                </h2>
              </div>
              <Link
                href="/products"
                className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1 group"
              >
                <span>View all products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Editorial Product Rows (replacing card stacks) */}
            <div className="divide-y divide-border">
              {FEATURED_PRODUCTS.map((product) => (
                <div
                  key={product.title}
                  className="py-10 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group"
                >
                  <div className="md:col-span-4 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                      {product.category}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
                      {product.title}
                    </h3>
                    <p className="text-sm font-medium text-foreground/90">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="md:col-span-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="md:col-span-2 flex md:justify-end">
                    <Link href={product.href}>
                      <Button variant="outline" size="sm" className="gap-1.5 group-hover:border-foreground/30 transition-colors">
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: SEE IT IN ACTION */}
        <section className="py-20 border-b border-border bg-muted/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                WORKFLOW
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
                See it in action
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Experience real developer tooling. Test discovering skills, installing behavioral directives, or bootstrapping a notification webhook bot.
              </p>
            </div>

            <div className="max-w-4xl">
              <TerminalDemo />
            </div>
          </div>
        </section>

        {/* SECTION 4: BUILT FOR ENGINEERS */}
        <section className="py-20 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-xl mb-12">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                FOUNDATIONS
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
                Built for engineers
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Designed from the ground up for strict consistency, modularity, and reproducible agent behavior.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRINCIPLES.map((principle) => (
                <div key={principle.title} className="space-y-2">
                  <h3 className="font-semibold text-foreground text-base tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="text-xs font-mono text-primary font-medium">
                    {principle.summary}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {principle.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: FINAL CTA */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Start building with RHL AI
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Set up the monorepo, install verified coding agent skills, or scaffold your webhook bot in minutes.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
                <Link href="/quickstart">
                  <Button size="lg" className="gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/directives">
                  <Button variant="outline" size="lg">
                    Read Directives
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
