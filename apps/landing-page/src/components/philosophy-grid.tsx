import * as React from 'react';
import {
  Brain,
  Terminal,
  Zap,
  Layers,
  CheckCircle2,
  FileCode,
  Workflow,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BentoCardProps {
  icon: React.ReactNode;
  badgeText: string;
  badgeVariant?: 'indigo' | 'cyan' | 'emerald' | 'amber';
  title: string;
  description: string;
  features: string[];
  footerCode?: string;
  className?: string;
}

function BentoCard({
  icon,
  badgeText,
  badgeVariant = 'indigo',
  title,
  description,
  features,
  footerCode,
  className = '',
}: BentoCardProps): React.JSX.Element {
  return (
    <div
      className={`glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group border border-white/10 border-t-white/25 ${className}`}
    >
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-white/[0.04] to-transparent rounded-bl-full pointer-events-none group-hover:from-indigo-500/[0.08] transition-colors duration-300" />

      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/12 border-t-white/25 flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:border-indigo-500/40 transition-all duration-200 shadow-sm">
            {icon}
          </div>
          <Badge variant={badgeVariant} size="sm">
            {badgeText}
          </Badge>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 tracking-tight group-hover:text-indigo-200 transition-colors">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-6 apple-body">
          {description}
        </p>

        <ul className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {footerCode ? (
        <div className="mt-4 pt-4 border-t border-white/[0.08]">
          <div className="font-mono text-xs text-indigo-300 bg-black/40 px-3 py-2 rounded-xl border border-white/8 flex items-center justify-between">
            <span className="truncate">{footerCode}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest ml-2">
              CLI
            </span>
          </div>
        </div>
      ) : null}

      {/* Lugano Living Lab Expanding Line */}
      <div className="mt-5 -mx-6 sm:-mx-8 h-[1.5px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
}

export function PhilosophyGrid(): React.JSX.Element {
  return (
    <section id="what-we-do" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Apple Optical Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" size="md" className="mb-3">
            Core Philosophy & Mission
          </Badge>
          <h2 className="apple-heading-section font-extrabold text-white tracking-tight mb-4">
            What is RHL AI & What Do We Do?
          </h2>
          <p className="apple-body text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            RHL AI fundamentally decouples{' '}
            <span className="text-white font-medium">executable code</span> from{' '}
            <span className="text-white font-medium">
              agent behavioral knowledge
            </span>
            . We build tools that make both developers and autonomous coding
            agents extraordinarily effective.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Agent Skills Engine */}
          <BentoCard
            icon={<Brain className="w-6 h-6 text-indigo-400" />}
            badgeText="Agent Intelligence"
            badgeVariant="indigo"
            title="Decoupled Agent Skills"
            description="Knowledge, decision frameworks, and golden rules for AI assistants (Antigravity, Claude Code, Cursor) stored as versioned behavioral artifacts, never bloating executable bundles."
            features={[
              'Structured YAML Frontmatter specifications',
              'Multi-axis decision checklists & golden tests',
              'Instant installation to local ~/.agents/skills/',
              'Machine-validated skill schemas with zero drift',
            ]}
            footerCode="pnpm rhl skill validate <name>"
          />

          {/* Card 2: Unified CLI */}
          <BentoCard
            icon={<Terminal className="w-6 h-6 text-cyan-400" />}
            badgeText="Developer Tooling"
            badgeVariant="cyan"
            title="Unified `rhl` CLI Orchestrator"
            description="A high-performance command-line hub for managing agent skills, scaffolding production applications, and validating code compliance across workflows."
            features={[
              'List, create, validate, and install skills in seconds',
              'Bootstraps Next.js, React, and Node starters',
              'Colored, interactive shell diagnostics with picocolors',
              'Zero config required; auto-discovers monorepo context',
            ]}
            footerCode="pnpm rhl create nextjs my-app"
          />

          {/* Card 3: Production Webhooks */}
          <BentoCard
            icon={<Zap className="w-6 h-6 text-emerald-400" />}
            badgeText="Real-time Automation"
            badgeVariant="emerald"
            title="Production Webhook Bots"
            description="Turn passive developer notifications into actionable, rich messaging. Bridging GitHub webhooks with real-time WhatsApp alerts via Twilio."
            features={[
              'Immediate alerts on Pull Requests, Reviews, and Assignments',
              'Failure alerts for CI / CD GitHub Action workflow runs',
              'Vercel & serverless deployment ready in under 2 minutes',
              'Maps GitHub usernames to private phone numbers securely',
            ]}
            footerCode="npx create-github-whatsapp-notifier my-bot"
          />

          {/* Card 4: Strict TypeScript (spans 2 columns on lg) */}
          <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group border border-white/10 border-t-white/25">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/12 border-t-white/25 flex items-center justify-center text-amber-400 shadow-sm">
                <FileCode className="w-6 h-6" />
              </div>
              <Badge variant="amber" size="sm">
                Strict Engineering
              </Badge>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 tracking-tight">
                100% Strict Type Safety & Monorepo Cohesion
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-6 apple-body">
                Every line of code across RHL AI adheres to the strictest
                standards: absolutely zero <code className="text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded font-mono">any</code> or unhandled types,
                interface-first definitions, and shared runtime utilities under{' '}
                <code className="text-indigo-300 font-mono">@rhl-ai/utils</code>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-3.5 rounded-xl bg-black/30 border border-white/8 backdrop-blur-md">
                  <div className="text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Turborepo Pipelines
                  </div>
                  <div className="text-xs text-slate-400">
                    Parallelized build, test, and typecheck caching.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/30 border border-white/8 backdrop-blur-md">
                  <div className="text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                    Changesets Versioning
                  </div>
                  <div className="text-xs text-slate-400">
                    Independent semantic versioning for each package.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/30 border border-white/8 backdrop-blur-md">
                  <div className="text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    Zero Radix Overhead
                  </div>
                  <div className="text-xs text-slate-400">
                    Base UI primitives powering accessible modern UX.
                  </div>
                </div>
              </div>
            </div>

            {/* Lugano Living Lab Expanding Line */}
            <div className="mt-5 -mx-6 sm:-mx-8 h-[1.5px] bg-gradient-to-r from-amber-400 via-indigo-500 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>

          {/* Card 5: Author & Open Source */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group border border-white/10 border-t-white/25">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/12 border-t-white/25 flex items-center justify-center text-indigo-400 shadow-sm">
                <Workflow className="w-6 h-6" />
              </div>
              <Badge variant="indigo" size="sm">
                Open Source
              </Badge>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                Created by Rahul Kumar
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-4 apple-body">
                Architected under MIT license for the modern software engineering
                community. Contributions and new skills welcome.
              </p>
              <div className="p-3 rounded-xl bg-black/30 border border-white/8 flex items-center justify-between">
                <span className="text-xs text-slate-400">Maintainer</span>
                <span className="text-xs font-mono text-indigo-300 font-semibold">
                  @imRahul05
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/[0.08] text-xs text-slate-400 flex items-center justify-between">
              <span>License</span>
              <span className="text-slate-200 font-medium">MIT Open Source</span>
            </div>

            {/* Lugano Living Lab Expanding Line */}
            <div className="mt-5 -mx-6 sm:-mx-8 h-[1.5px] bg-gradient-to-r from-indigo-400 via-cyan-400 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
