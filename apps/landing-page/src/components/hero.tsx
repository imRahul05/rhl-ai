'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import {
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Bot,
  ExternalLink,
} from 'lucide-react';

interface TerminalTab {
  id: string;
  label: string;
  command: string;
  output: string[];
}

const TERMINAL_TABS: TerminalTab[] = [
  {
    id: 'skill-list',
    label: 'rhl skill list',
    command: 'pnpm rhl skill list',
    output: [
      '🔍 Scanning monorepo skills catalog...',
      '✔ Found 2 verified agent skills:',
      '',
      '  ▸ code-reviewer (v1.0.0)',
      '    Expert AI code reviewer for TypeScript and modern web stacks',
      '    Tags: [code-review, quality, typescript, architecture]',
      '',
      '  ▸ frontend-performance-engineer (v1.0.0)',
      '    Evidence-led frontend performance engineering & CWV diagnostic',
      '    Tags: [performance, cwv, lcp, inp, bundles]',
      '',
      '✨ Tip: Run `pnpm rhl skill install <name>` to install into ~/.agents/skills/',
    ],
  },
  {
    id: 'skill-install',
    label: 'rhl skill install',
    command: 'pnpm rhl skill install code-reviewer',
    output: [
      '📦 Installing skill: code-reviewer',
      '✔ Read specification from skills/code-reviewer/SKILL.md',
      '✔ Validated 5-axis decision framework and golden references',
      '✔ Copied behavioral prompt to ~/.agents/skills/code-reviewer/SKILL.md',
      '',
      '🚀 Installed successfully! Agent assistants (Claude, Antigravity, Cursor) will now apply code-reviewer rules.',
    ],
  },
  {
    id: 'whatsapp-bot',
    label: 'whatsapp-bot',
    command: 'npx create-github-whatsapp-notifier my-bot',
    output: [
      '🚀 Initializing create-github-whatsapp-notifier v1.0.6...',
      '✔ Scaffolding webhook service with Express + Twilio SDK',
      '✔ Generating GitHub event listeners (PRs, reviews, CI workflow runs)',
      '✔ Created .env template & config/user-phones.js mapper',
      '',
      'Success! Run:',
      '  cd my-bot && npm install',
      '  cp .env.example .env',
      '  npm start',
    ],
  },
  {
    id: 'create-app',
    label: 'rhl create nextjs',
    command: 'pnpm rhl create nextjs my-awesome-app',
    output: [
      '🛠️  Generating project from template: nextjs',
      '✔ Copying Next.js App Router starter (React 19, Strict TS, Tailwind)',
      '✔ Configuring Turborepo task pipeline',
      '✔ Initialized Git repository',
      '',
      '✨ Project initialized at ./my-awesome-app. Ready for takeoff!',
    ],
  },
];

export function Hero(): React.JSX.Element {
  const [activeTabId, setActiveTabId] = React.useState<string>('skill-list');
  const [copied, setCopied] = React.useState<boolean>(false);

  const activeTab = React.useMemo(() => {
    const found = TERMINAL_TABS.find((t) => t.id === activeTabId);
    return found ? found : TERMINAL_TABS[0]!;
  }, [activeTabId]);

  function handleCopyCommand(): void {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(activeTab.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 bg-white/[0.04] backdrop-blur-xl text-xs font-medium text-slate-200 shadow-sm hover:border-white/20 transition-all active:scale-[0.98]">
            <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="tracking-tight">RHL AI Monorepo v0.1.0 • Built for Next-Gen Agentic Tooling</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        {/* Hero Title & Subtitle with Apple Keynote Optical Typography */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h1 className="apple-display-hero font-extrabold text-white mb-6">
            Engineering{' '}
            <span className="bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
              Agentic Workflows
            </span>{' '}
            & High-Impact Tooling
          </h1>
          <p className="text-base sm:text-lg text-slate-300/80 leading-relaxed font-normal max-w-2xl mx-auto apple-body">
            A unified monorepo bridging{' '}
            <strong className="text-white font-medium">
              AI agent behavioral skills
            </strong>
            , modular CLI automation, zero-config project scaffolds, and
            real-time GitHub-to-WhatsApp webhook bots.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link href="#skills">
              <Button
                size="lg"
                className="px-6 font-semibold"
              >
                <Bot className="w-4 h-4 mr-2" />
                Browse Skills Catalog
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>

            <Link href="#whatsapp-bot">
              <Button
                variant="glass"
                size="lg"
                className="px-6 border-emerald-500/30 text-emerald-300 hover:border-emerald-400/50"
              >
                <Zap className="w-4 h-4 mr-2 text-emerald-400" />
                Live WhatsApp Bot
              </Button>
            </Link>

            <Link
              href="https://github.com/imRahul05/rhl-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="px-5 text-slate-200"
              >
                <Code2 className="w-4 h-4 mr-2 text-slate-400" />
                View Repository
                <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-slate-400" />
              </Button>
            </Link>
          </div>

          {/* Quick Pillars Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/8 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Strict TypeScript
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/8 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Turborepo Powered
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/8 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Base UI Primitives
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Zero Radix Overhead
            </span>
          </div>
        </div>

        {/* Interactive Terminal Playground with Apple Hardware Glass Styling & Motion Spring Tab Pill */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/12 border-t-white/25 bg-[#090c13]/90 shadow-2xl shadow-black/80 backdrop-blur-2xl overflow-hidden transition-all duration-300">
            {/* macOS Window Titlebar */}
            <div className="px-4 py-3 bg-[#0c0f18]/80 border-b border-white/[0.08] flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/50 inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]/50 inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]/50 inline-block shadow-sm" />
                <span className="ml-2 text-xs font-mono text-slate-400 font-medium hidden sm:inline-block">
                  rhl-terminal — zsh
                </span>
              </div>

              {/* Segmented Controls with Fluid Motion Pill */}
              <div className="relative flex items-center p-0.5 rounded-xl bg-black/40 border border-white/[0.08] overflow-x-auto">
                {TERMINAL_TABS.map((tab) => {
                  const isActive = tab.id === activeTabId;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      className={`relative z-10 px-3 py-1 text-xs font-mono rounded-lg transition-colors whitespace-nowrap active:scale-95 ${
                        isActive
                          ? 'text-white font-medium'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isActive ? (
                        <motion.div
                          layoutId="heroTerminalTabPill"
                          transition={{ type: 'spring', damping: 26, stiffness: 350 }}
                          className="absolute inset-0 bg-white/[0.1] border border-white/15 rounded-lg shadow-sm"
                        />
                      ) : null}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Copy Command */}
              <button
                onClick={handleCopyCommand}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 transition-all"
                title="Copy command"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-mono">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="font-mono">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto min-h-[220px]">
              {/* Command line */}
              <div className="flex items-center gap-2 text-indigo-400 mb-3 select-all">
                <span className="text-emerald-400 font-bold">~/rhl-ai</span>
                <span className="text-slate-500">$</span>
                <span className="text-white font-semibold">{activeTab.command}</span>
                <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-0.5" />
              </div>

              {/* Terminal Logs Output */}
              <div className="space-y-1 text-slate-300">
                {activeTab.output.map((line, idx) => {
                  let styleClass = 'text-slate-300';
                  if (line.startsWith('✔') || line.startsWith('✨')) {
                    styleClass = 'text-emerald-400 font-medium';
                  } else if (line.startsWith('🚀') || line.startsWith('📦')) {
                    styleClass = 'text-indigo-300 font-semibold';
                  } else if (line.startsWith('🔍') || line.startsWith('🛠️')) {
                    styleClass = 'text-cyan-300';
                  } else if (line.startsWith('  ▸')) {
                    styleClass = 'text-amber-300 font-semibold';
                  } else if (line.includes('Tags:')) {
                    styleClass = 'text-slate-400 text-xs';
                  }

                  return (
                    <div key={idx} className={styleClass}>
                      {line || '\u00A0'}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              4
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Core Packages (@rhl-ai/*)
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 tracking-tight">
              2
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Verified Agent Skills
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">
              v1.0.6
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              GitHub WhatsApp Notifier
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tracking-tight">
              0
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              `any` Types (Strict Strictness)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
