'use client';

import * as React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check, GitBranch } from 'lucide-react';

interface StepItem {
  number: string;
  title: string;
  description: string;
  command: string;
}

const QUICKSTART_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Clone & Build Monorepo',
    description:
      'Clone the repository and install all workspace packages in one command via pnpm.',
    command: 'git clone https://github.com/imRahul05/rhl-ai.git && cd rhl-ai && pnpm install && pnpm build',
  },
  {
    number: '02',
    title: 'Install AI Agent Skills',
    description:
      'Inject senior review or performance intelligence directly into your coding agents (Antigravity, Claude Code, Cursor).',
    command: 'pnpm rhl skill install code-reviewer',
  },
  {
    number: '03',
    title: 'Scaffold Production Apps or Bot',
    description:
      'Spin up a new Next.js App Router project or scaffold your own GitHub to WhatsApp webhook bot.',
    command: 'pnpm rhl create nextjs my-app # Or: npx create-github-whatsapp-notifier my-bot',
  },
];

export function QuickstartSection(): React.JSX.Element {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  function handleCopy(idx: number, command: string): void {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(command);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  }

  return (
    <section id="quickstart" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="amber" size="md" className="mb-3">
            Developer Experience
          </Badge>
          <h2 className="apple-heading-section font-extrabold text-white tracking-tight mb-4">
            Get Up & Running in Minutes
          </h2>
          <p className="apple-body text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Follow the 3-step rapid setup to start using the CLI, skills, and
            scaffolding engines.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {QUICKSTART_STEPS.map((step, idx) => {
            const isCopied = copiedIndex === idx;

            return (
              <div
                key={idx}
                className="glass-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between group relative border border-white/10 border-t-white/25"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold font-mono text-indigo-400/90 tracking-tight">
                      {step.number}
                    </span>
                    <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                      Step {idx + 1}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-indigo-200 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-6 apple-body">
                    {step.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/50 border border-white/8 font-mono text-xs text-indigo-300">
                    <span className="truncate">{step.command}</span>
                    <button
                      onClick={() => handleCopy(idx, step.command)}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white active:scale-90 transition-all shrink-0"
                      title="Copy command"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#111624]/80 to-[#0a0d15]/90 border border-white/12 border-t-white/25 shadow-2xl backdrop-blur-2xl text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              Ready to elevate your agentic workflows?
            </h3>
            <p className="text-slate-300/85 text-xs sm:text-sm max-w-xl mx-auto mb-6 apple-body">
              Clone the repository, explore the skills, or run the WhatsApp
              webhook bot in production today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="https://github.com/imRahul05/rhl-ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="px-6 font-semibold"
                >
                  <GitBranch className="w-4 h-4 mr-2" />
                  Star on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
