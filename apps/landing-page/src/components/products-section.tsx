'use client';

import * as React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Terminal,
  Cpu,
  Layers,
  Wrench,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  version: string;
  isNpmPublished: boolean;
  npmPackageName: string;
  description: string;
  category: 'CLI' | 'Engine' | 'Scaffolding' | 'Utility' | 'Bot';
  icon: React.ReactNode;
  installCommand: string;
  features: string[];
  deepDetails: {
    overview: string;
    exports: string[];
    usageSample: string;
  };
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'cli',
    name: '@rhl-ai/cli',
    version: '0.1.0',
    isNpmPublished: false,
    npmPackageName: '@rhl-ai/cli',
    description:
      'The central command-line engine for RHL AI tools. Discovers, validates, and installs agent skills into local assistant directories, and bootstraps production applications.',
    category: 'CLI',
    icon: <Terminal className="w-5 h-5 text-indigo-400" />,
    installCommand: 'pnpm add -g @rhl-ai/cli # publishing soon',
    features: [
      'Interactive skill discovery with `rhl skill list`',
      'Automated skill installation to `~/.agents/skills/<name>`',
      'Validates YAML frontmatter, decision checklists, and schemas',
      'Scaffolds Next.js, React, and Node starters with `rhl create`',
    ],
    deepDetails: {
      overview:
        'The @rhl-ai/cli package is compiled via tsup and provides the global `rhl` binary. It seamlessly coordinates between the @rhl-ai/skills discovery engine and the @rhl-ai/scaffold template generator.',
      exports: ['bin/rhl', 'rhl skill', 'rhl create'],
      usageSample: `# View available commands
pnpm rhl --help

# List all agent skills in the monorepo
pnpm rhl skill list

# Validate and install a skill
pnpm rhl skill validate code-reviewer
pnpm rhl skill install code-reviewer`,
    },
  },
  {
    id: 'skills-engine',
    name: '@rhl-ai/skills',
    version: '0.1.0',
    isNpmPublished: false,
    npmPackageName: '@rhl-ai/skills',
    description:
      'High-performance programmatic engine for discovering, parsing, and validating AI agent skills without bundling heavy markdown artifacts into runtime dependencies.',
    category: 'Engine',
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    installCommand: 'pnpm add @rhl-ai/skills # publishing soon',
    features: [
      'Strict schema validation for YAML frontmatter and markdown sections',
      'Locates and registers skills in monorepos or external directories',
      'Zero runtime dependency footprint on client applications',
      'Exports clean TypeScript AST & metadata types',
    ],
    deepDetails: {
      overview:
        'A dedicated core library designed to read and validate AI agent specifications (decision frameworks, constraints, golden examples) before deploying them to LLM environments.',
      exports: ['discoverSkills()', 'validateSkill()', 'installSkill()'],
      usageSample: `import { discoverSkills, validateSkill } from '@rhl-ai/skills';

// Discover all skills
const skills = await discoverSkills({ searchPaths: ['./skills'] });

// Validate specific skill metadata
const result = await validateSkill('code-reviewer');
console.log(result.isValid);`,
    },
  },
  {
    id: 'scaffold-engine',
    name: '@rhl-ai/scaffold',
    version: '0.1.0',
    isNpmPublished: false,
    npmPackageName: '@rhl-ai/scaffold',
    description:
      'Production-ready project scaffolding engine. Copies, transforms, and customizes starter templates with automated git initialization and dependency mapping.',
    category: 'Scaffolding',
    icon: <Layers className="w-5 h-5 text-amber-400" />,
    installCommand: 'pnpm add @rhl-ai/scaffold # publishing soon',
    features: [
      'Templates for Next.js App Router (React 19), React Vite, and Node ESM',
      'Variable replacement for package names and project configurations',
      'Clean directory validation and dry-run execution modes',
      'Shared between the CLI and standalone programmatic workflows',
    ],
    deepDetails: {
      overview:
        'The scaffolding engine handles directory copying, template variable substitution (e.g. {{PACKAGE_NAME}}), and dependency setup to eliminate boilerplate when spinning up new projects.',
      exports: ['scaffoldProject()', 'listTemplates()', 'type ScaffoldOptions'],
      usageSample: `import { scaffoldProject } from '@rhl-ai/scaffold';

await scaffoldProject({
  template: 'nextjs',
  targetDirectory: './apps/my-app',
  packageName: 'my-app',
});`,
    },
  },
  {
    id: 'utils',
    name: '@rhl-ai/utils',
    version: '0.1.0',
    isNpmPublished: false,
    npmPackageName: '@rhl-ai/utils',
    description:
      'Shared strictly typed filesystem, process execution, and colored logger helpers powering the entire RHL AI ecosystem with zero code duplication.',
    category: 'Utility',
    icon: <Wrench className="w-5 h-5 text-emerald-400" />,
    installCommand: 'pnpm add @rhl-ai/utils # publishing soon',
    features: [
      'Strict filesystem reading/writing with full type guards',
      'Colorized terminal logger utility with debug levels',
      'Cross-platform path resolution and directory traversal',
      '100% strict TypeScript types — zero `any` guarantee',
    ],
    deepDetails: {
      overview:
        'The foundational layer of the monorepo, keeping all packages lean and consistent. Imported as a workspace package via `workspace:*`.',
      exports: ['logger', 'readJsonFile()', 'ensureDir()', 'execCommand()'],
      usageSample: `import { logger, readJsonFile } from '@rhl-ai/utils';

logger.info('Starting workflow...');
const config = await readJsonFile('./rhl.json');
logger.success('Loaded configuration successfully');`,
    },
  },
  {
    id: 'whatsapp-bot-pkg',
    name: 'create-github-whatsapp-notifier',
    version: '1.0.6',
    isNpmPublished: true,
    npmPackageName: 'create-github-whatsapp-notifier',
    description:
      'Scaffold an automated GitHub webhook bot that intercepts pull requests, reviews, and CI failures, sending formatted WhatsApp alerts via Twilio in real time.',
    category: 'Bot',
    icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
    installCommand: 'npx create-github-whatsapp-notifier my-bot',
    features: [
      'Published on npmjs: v1.0.6 by Rahul Kumar (@imRahul05)',
      'Listens for pull_request (assigned, review_requested, closed/merged)',
      'Listens for pull_request_review (approved) & workflow_run (failures)',
      'Ready for instant 1-click deployment on Vercel or cloud functions',
    ],
    deepDetails: {
      overview:
        'A complete microservice generator. Generates an Express webhook endpoint that validates GitHub signatures, translates events into markdown WhatsApp alerts, and calls the Twilio API.',
      exports: ['CLI initializer: bin/create-github-whatsapp-notifier.js'],
      usageSample: `# 1. Scaffold your bot
npx create-github-whatsapp-notifier my-bot

# 2. Configure credentials in .env
TWILIO_SID=your_sid
TWILIO_TOKEN=your_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# 3. Start webhook server
npm start`,
    },
  },
];

export function ProductsSection(): React.JSX.Element {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  function handleCopy(id: string, text: string): void {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }

  return (
    <section id="products" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <Badge variant="indigo" size="md" className="mb-3">
              Products & Modular Tooling
            </Badge>
            <h2 className="apple-heading-section font-extrabold text-white tracking-tight mb-4">
              All Products & Monorepo Packages
            </h2>
            <p className="apple-body text-base sm:text-lg text-slate-400 leading-relaxed">
              Every tool in RHL AI is designed for modularity, extreme type
              safety, and independent semantic versioning via Changesets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              NPM status:{' '}
              <strong className="text-emerald-400 font-medium">
                Live & Upcoming
              </strong>
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, pIndex) => {
            const isCopied = copiedId === product.id;
            const indexNumber = String(pIndex + 1).padStart(2, '0');

            return (
              <div
                key={product.id}
                className="glass-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between group relative border border-white/10 border-t-white/25 hover:border-indigo-500/30 transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Top Bar with Lugano-style index and dual-arrow */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/12 border-t-white/25 flex items-center justify-center shadow-sm">
                        {product.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono font-semibold text-slate-500 tracking-wider">
                          [ {indexNumber} ]
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {product.isNpmPublished ? (
                        <Badge
                          variant="emerald"
                          size="sm"
                        >
                          npm live v{product.version}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          size="sm"
                          className="text-[11px] text-slate-400 border-white/10"
                        >
                          v{product.version} (npm soon)
                        </Badge>
                      )}

                      {/* Lugano Living Lab Dual-Arrow Hover Button */}
                      <div className="relative w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                        <ArrowUpRight className="w-4 h-4 text-slate-400 absolute transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full" />
                        <ArrowUpRight className="w-4 h-4 text-indigo-400 absolute transition-transform duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-200 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-5 apple-body">
                    {product.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-400">
                    {product.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-0.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Actions */}
                <div>
                  {/* Copy command bar */}
                  <div className="mb-3.5 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/40 border border-white/8 font-mono text-xs text-slate-300">
                    <span className="truncate">{product.installCommand}</span>
                    <button
                      onClick={() =>
                        handleCopy(product.id, product.installCommand)
                      }
                      className="text-slate-400 hover:text-white p-1 rounded-lg transition-all active:scale-90 shrink-0"
                      title="Copy install command"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Deep Details Dialog */}
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" size="sm" className="w-full justify-center gap-1.5 border-white/10 hover:border-white/20 text-xs" />}>
                      Inspect Details & API
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl bg-[#0b0f19] border border-white/10 text-slate-100">
                      <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                            {product.icon}
                          </div>
                          <div>
                            <DialogTitle className="text-xl font-bold text-white">
                              {product.name}
                            </DialogTitle>
                            <span className="text-xs font-mono text-indigo-400">
                              Version {product.version} • {product.category}
                            </span>
                          </div>
                        </div>
                        <DialogDescription className="text-slate-300 text-sm">
                          {product.deepDetails.overview}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="mt-4 space-y-4">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Key Capabilities:
                          </div>
                          <ul className="space-y-1 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                            {product.features.map((feat, idx) => (
                              <li key={idx}>{feat}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Usage Sample:
                          </div>
                          <pre className="p-3 rounded-lg bg-black/60 border border-white/5 font-mono text-xs text-indigo-200 overflow-x-auto">
                            {product.deepDetails.usageSample}
                          </pre>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs text-slate-400">
                          <span>Maintained by Rahul Kumar</span>
                          {product.isNpmPublished ? (
                            <Link
                              href={`https://www.npmjs.com/package/${product.npmPackageName}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:underline flex items-center gap-1"
                            >
                              View on npmjs.com
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          ) : (
                            <span className="text-indigo-300">
                              Publishing to npmjs soon
                            </span>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Lugano Living Lab Expanding Underline */}
                <div className="mt-5 -mx-6 sm:-mx-7 h-[1.5px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
