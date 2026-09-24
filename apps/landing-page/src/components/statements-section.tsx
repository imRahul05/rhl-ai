'use client';

import * as React from 'react';
import {
  Brain,
  ShieldCheck,
  Zap,
  Rocket,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface StatementItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  badgeColor: string;
  icon: React.ReactNode;
  terminalCommand: string;
  stat: string;
  statLabel: string;
  gradient: string;
}

const STATEMENTS: StatementItem[] = [
  {
    id: 'architect',
    number: '01',
    title: 'We Architect',
    tagline: 'Decoupled Intelligence & Zero Bundle Overhead',
    description:
      'We separate LLM behavioral prompt artifacts from compiled runtime code. Agent skills live in structured markdown schemas, while packages remain feather-light and lightning fast.',
    category: 'INTELLIGENCE DUALITY',
    badgeColor: 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10',
    icon: <Brain className="w-5 h-5 text-indigo-400" />,
    terminalCommand: 'pnpm rhl skill list',
    stat: '0 KB',
    statLabel: 'Client bundle overhead for agent prompts',
    gradient: 'from-indigo-600/30 via-indigo-950/40 to-black',
  },
  {
    id: 'enforce',
    number: '02',
    title: 'We Enforce',
    tagline: 'Absolute Zero Any & Multi-Axis Quality Gates',
    description:
      'Zero `any` type tolerance. Every API, package, and component is governed by strict TypeScript, schema validation, and 5-axis code reviewer golden rules before entering production.',
    category: 'STRICT TYPE SAFETY',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
    icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
    terminalCommand: 'pnpm rhl skill validate code-reviewer',
    stat: '100%',
    statLabel: 'Strict compiler conformance & zero any',
    gradient: 'from-cyan-600/30 via-cyan-950/40 to-black',
  },
  {
    id: 'automate',
    number: '03',
    title: 'We Automate',
    tagline: 'Direct-to-Device Webhooks & WhatsApp Alerts',
    description:
      'Turn silent GitHub notifications into real-time WhatsApp actionable cards. Instant alerts on Pull Request reviews, team assignments, and CI/CD workflow build breaks.',
    category: 'REAL-TIME DISPATCH',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    icon: <Zap className="w-5 h-5 text-emerald-400" />,
    terminalCommand: 'npx create-github-whatsapp-notifier my-bot',
    stat: '< 450ms',
    statLabel: 'Webhook receive to WhatsApp delivery latency',
    gradient: 'from-emerald-600/30 via-emerald-950/40 to-black',
  },
  {
    id: 'ship',
    number: '04',
    title: 'We Ship',
    tagline: 'Deterministic Turborepo Pipelines & SemVer',
    description:
      'Independent semantic releases powered by Changesets, remote cache orchestration, and zero-configuration scaffolding for modern Next.js and Node.js environments.',
    category: 'CONTINUOUS DELIVERY',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    icon: <Rocket className="w-5 h-5 text-amber-400" />,
    terminalCommand: 'pnpm rhl create nextjs my-app',
    stat: '0 Config',
    statLabel: 'Instant scaffold with Turborepo caching',
    gradient: 'from-amber-600/30 via-amber-950/40 to-black',
  },
];

// Staggered delay array inspired by Lugano Living Lab pixel masks (16 pixels)
const PIXEL_DELAYS: number[] = [
  0.12, 0.33, 0.05, 0.27, 0.18, 0.39, 0.22, 0.08, 0.31, 0.16, 0.04, 0.29, 0.36,
  0.14, 0.24, 0.38,
];

export function StatementsSection(): React.JSX.Element {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  return (
    <section
      id="directives"
      className="py-24 md:py-36 relative overflow-hidden bg-[#040609]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section Header with Lugano Swiss Bracketed micro-label */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-indigo-400 uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>[ CORE DIRECTIVES ]</span>
            </div>
            <h2 className="apple-heading-section font-extrabold text-white tracking-tight mb-4">
              How We Build & Operate
            </h2>
            <p className="apple-body text-base sm:text-lg text-slate-400 leading-relaxed">
              Four non-negotiable architectural principles that dictate every
              skill, package, and automation shipped in the RHL AI ecosystem.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Hover to reveal system mechanics</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
          </div>
        </div>

        {/* The 4 Architectural Statement Rows (Lugano Living Lab style) */}
        <div className="space-y-0 border-t border-white/[0.12]">
          {STATEMENTS.map((item) => {
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative border-b border-white/[0.12] py-8 sm:py-12 transition-colors duration-300 hover:bg-white/[0.015]"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Number + Title */}
                  <div className="flex items-baseline sm:items-center gap-4 sm:gap-8 flex-1">
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-slate-500 group-hover:text-indigo-400 transition-colors">
                      [ {item.number} ]
                    </span>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-slate-200 group-hover:to-indigo-300 transition-all duration-300">
                          {item.title}
                        </h3>
                        <span
                          className={`hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${item.badgeColor}`}
                        >
                          {item.category}
                        </span>
                      </div>

                      <p className="text-sm sm:text-base text-slate-400 font-normal max-w-xl group-hover:text-slate-300 transition-colors">
                        {item.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Middle / Right: Interactive Visual Pixel Grid Overlay Preview */}
                  <div className="flex items-center gap-6 self-start lg:self-center">
                    <div className="relative w-44 sm:w-56 h-28 sm:h-32 rounded-xl overflow-hidden border border-white/12 bg-black/60 shadow-xl group-hover:border-white/30 transition-all duration-300">
                      {/* Underneath Content / Metric Preview */}
                      <div
                        className={`absolute inset-0 p-4 bg-gradient-to-br ${item.gradient} flex flex-col justify-between`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="p-1.5 rounded-lg bg-black/50 border border-white/10">
                            {item.icon}
                          </div>
                          <span className="font-mono text-[10px] text-slate-400 uppercase">
                            LIVE METRIC
                          </span>
                        </div>
                        <div>
                          <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
                            {item.stat}
                          </div>
                          <div className="text-[10px] text-slate-300 line-clamp-1">
                            {item.statLabel}
                          </div>
                        </div>
                      </div>

                      {/* 16-Pixel Staggered Dissolving Mask (Lugano Living Lab signature) */}
                      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none">
                        {PIXEL_DELAYS.map((delay, pIdx) => (
                          <div
                            key={pIdx}
                            className="w-full h-full bg-[#080b12] border-[0.5px] border-black/40 transition-opacity duration-300 ease-out"
                            style={{
                              opacity: isHovered ? 0 : 0.94,
                              transitionDelay: `${delay}s`,
                            }}
                          />
                        ))}
                      </div>

                      {/* Center Hint when not hovered */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
                          isHovered ? 'opacity-0' : 'opacity-80'
                        }`}
                      >
                        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-black/70 px-2 py-0.5 rounded border border-white/10">
                          HOVER REVEAL
                        </span>
                      </div>
                    </div>

                    {/* Arrow Action Indicator */}
                    <div className="hidden sm:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center text-slate-500 group-hover:text-white group-hover:border-indigo-400 group-hover:bg-indigo-500/10 transition-all duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Expanding Underline (Lugano Living Lab style) */}
                <div
                  className={`mt-6 h-[1.5px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-600 origin-left transition-transform duration-700 ease-out ${
                    isHovered ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
