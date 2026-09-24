import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  packageScope: string;
  category: string;
  version: string;
  status: string;
  headline: string;
  description: string;
  installCommand: string;
  href: string;
  features: string[];
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'rhl-cli',
    name: 'RHL CLI',
    packageScope: '@rhl-ai/cli',
    category: 'CLI ORCHESTRATOR',
    version: 'v0.1.0',
    status: 'Core Tool',
    headline: 'The central command-line engine for agent engineering workflows.',
    description:
      'Discovers, validates, and installs agent skills into local assistant directories. Scaffolds new projects, checks workspace schemas, and executes type-safe automation pipelines.',
    installCommand: 'pnpm rhl skill list',
    href: '/products/rhl-cli',
    features: [
      'Automated skill discovery across the monorepo',
      'Local schema validation against agent guidelines',
      'Project scaffolding for production bots & utilities',
      'Zero unnecessary dependencies, written in strict TypeScript',
    ],
  },
  {
    id: 'skills',
    name: 'Agent Skills System',
    packageScope: '@rhl-ai/skills',
    category: 'BEHAVIORAL INTELLIGENCE',
    version: 'v1.0.0',
    status: '2 Verified Skills',
    headline: 'Reusable behavioral intelligence and decision heuristics for coding agents.',
    description:
      'A library of structured skills that teach coding assistants how to review code, diagnose performance bottlenecks, and enforce architectural boundaries without adding runtime overhead.',
    installCommand: 'pnpm rhl skill install <name>',
    href: '/products/skills',
    features: [
      'Decoupled from application runtime bundles (0 KB footprint)',
      'Structured YAML frontmatter and markdown specifications',
      'Multi-axis decision heuristics for coding agents',
      'Seamlessly portable between Antigravity, Claude Code, and Codex',
    ],
  },
  {
    id: 'whatsapp-bot',
    name: 'GitHub WhatsApp Bot',
    packageScope: 'create-github-whatsapp-notifier',
    category: 'PRODUCTION WEBHOOK BOT',
    version: 'v1.0.6',
    status: 'npm Published',
    headline: 'Instant GitHub webhook notifications delivered directly to WhatsApp.',
    description:
      'Scaffold and deploy a robust Express webhook receiver that translates GitHub PR reviews, merges, and CI failures into high-priority WhatsApp messages via Twilio.',
    installCommand: 'npx create-github-whatsapp-notifier my-bot',
    href: '/products/whatsapp-bot',
    features: [
      'Scaffolds in under 30 seconds with complete environment config',
      'Dispatches PR review requests, status checks, and release notes',
      'Configurable username-to-phone mappings in plain TypeScript/JS',
      'Production-ready for Vercel, Railway, Render, or Docker',
    ],
  },
  {
    id: 'scaffold',
    name: 'Scaffolding Engine',
    packageScope: '@rhl-ai/scaffold',
    category: 'TEMPLATE GENERATOR',
    version: 'v0.1.0',
    status: 'Internal Package',
    headline: 'Headless project template generation for apps, bots, and agents.',
    description:
      'Underlying generator engine powering create-commands. Generates standardized directory layouts, strict tsconfigs, environment templates, and CI/CD pipelines.',
    installCommand: 'pnpm --filter @rhl-ai/scaffold build',
    href: '/architecture',
    features: [
      'Strict TypeScript configuration templates',
      'Preconfigured Turborepo & Vitest test suites',
      'Pre-commit hooks for type safety enforcement',
      'Zero-config setup for monorepo packages',
    ],
  },
  {
    id: 'utils',
    name: 'Core Utilities',
    packageScope: '@rhl-ai/utils',
    category: 'SHARED RUNTIME UTILITIES',
    version: 'v0.1.0',
    status: 'Internal Package',
    headline: 'Strictly typed shared utilities across all RHL AI tools.',
    description:
      'Common logging, ANSI formatting, validation helpers, and error boundaries shared across CLI commands and automation webhooks.',
    installCommand: 'pnpm --filter @rhl-ai/utils build',
    href: '/architecture',
    features: [
      '100% strict TypeScript types with zero any or unknown',
      'High-performance synchronous file-system helpers',
      'Standardized logging formats with picocolors',
      'Robust error handling and exit code management',
    ],
  },
];

export default function ProductsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Header />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">
                RHL AI
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Products</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Products
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Developer tools, behavioral intelligence, and automations built to work together in modern AI-assisted engineering workflows.
            </p>
          </div>
        </section>

        {/* Product Catalog */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="divide-y divide-border">
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="py-12 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Left Column: Identification */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        {product.category}
                      </span>
                      <Badge variant="outline" size="sm" className="text-[11px] font-mono">
                        {product.version}
                      </Badge>
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {product.name}
                    </h2>

                    <div className="font-mono text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded inline-block">
                      {product.packageScope}
                    </div>

                    <div className="pt-2">
                      <Link href={product.href}>
                        <Button size="sm" className="gap-1.5">
                          <span>View Product Page</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Details & Features */}
                  <div className="lg:col-span-8 space-y-5">
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-2">
                        {product.headline}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 pt-2 border-t border-border/60">
                      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        Key Capabilities
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/90">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary font-bold">―</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick Command */}
                    <div className="pt-2">
                      <div className="rounded-md border border-border bg-card p-3 font-mono text-xs flex items-center justify-between">
                        <span className="text-muted-foreground">
                          <span className="text-primary mr-2">$</span>
                          {product.installCommand}
                        </span>
                        <span className="text-[11px] text-muted-foreground uppercase">
                          {product.status}
                        </span>
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
