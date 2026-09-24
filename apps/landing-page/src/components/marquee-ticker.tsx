'use client';

import * as React from 'react';
import {
  Sparkles,
  Bot,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  Code2,
  Workflow,
  MessageSquare,
} from 'lucide-react';

interface MarqueeItem {
  label: string;
  badge: string;
  icon: React.ReactNode;
}

const ROW_ONE_ITEMS: MarqueeItem[] = [
  {
    label: 'Google Antigravity',
    badge: 'Agent Platform',
    icon: <Sparkles className="w-3.5 h-3.5 text-indigo-400" />,
  },
  {
    label: 'Claude Code',
    badge: 'AI Assistant',
    icon: <Bot className="w-3.5 h-3.5 text-cyan-400" />,
  },
  {
    label: 'Next.js 15 App Router',
    badge: 'Framework',
    icon: <Cpu className="w-3.5 h-3.5 text-purple-400" />,
  },
  {
    label: 'React 19 & Base UI',
    badge: 'Primitives',
    icon: <Layers className="w-3.5 h-3.5 text-blue-400" />,
  },
  {
    label: 'TypeScript 5.7 Strict',
    badge: 'Zero Any',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
  },
  {
    label: 'Turborepo Workspaces',
    badge: 'Monorepo',
    icon: <Workflow className="w-3.5 h-3.5 text-amber-400" />,
  },
  {
    label: 'Lenis Smooth Scroll',
    badge: 'Butter Motion',
    icon: <Zap className="w-3.5 h-3.5 text-rose-400" />,
  },
  {
    label: 'Tailwind CSS v3.4',
    badge: 'Design System',
    icon: <Code2 className="w-3.5 h-3.5 text-teal-400" />,
  },
];

const ROW_TWO_ITEMS: MarqueeItem[] = [
  {
    label: 'GitHub Webhook Bots',
    badge: 'Real-time',
    icon: <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />,
  },
  {
    label: 'Twilio WhatsApp API',
    badge: 'Messaging',
    icon: <Zap className="w-3.5 h-3.5 text-cyan-400" />,
  },
  {
    label: 'Multi-Axis Code Review',
    badge: '5-Axis Eval',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />,
  },
  {
    label: 'Changesets Automation',
    badge: 'SemVer Releases',
    icon: <Workflow className="w-3.5 h-3.5 text-amber-400" />,
  },
  {
    label: 'tsup High-Speed Bundler',
    badge: 'ESM / CJS',
    icon: <Terminal className="w-3.5 h-3.5 text-purple-400" />,
  },
  {
    label: 'Zod & AST Validation',
    badge: 'Zero Drift',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />,
  },
  {
    label: 'Core Web Vitals CWV',
    badge: 'Diagnostic',
    icon: <Zap className="w-3.5 h-3.5 text-rose-400" />,
  },
  {
    label: 'MIT Open Source',
    badge: 'Community',
    icon: <Sparkles className="w-3.5 h-3.5 text-yellow-400" />,
  },
];

function MarqueeRow({
  items,
  direction = 'left',
  speedSeconds = 34,
}: {
  items: MarqueeItem[];
  direction?: 'left' | 'right';
  speedSeconds?: number;
}): React.JSX.Element {
  // Duplicate 4x to ensure uninterrupted butter-smooth looping
  const repeatedItems = React.useMemo(
    () => [...items, ...items, ...items, ...items],
    [items]
  );

  const animationStyle: React.CSSProperties = {
    animationDuration: `${speedSeconds}s`,
  };

  return (
    <div className="relative flex overflow-hidden select-none py-2 mask-gradient group">
      <div
        className={`flex shrink-0 items-center gap-4 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        } group-hover:[animation-play-state:paused] will-change-transform`}
        style={animationStyle}
      >
        {repeatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06] backdrop-blur-md transition-all duration-200"
          >
            <div className="p-1 rounded-md bg-white/[0.05] border border-white/10 shrink-0">
              {item.icon}
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-xs font-semibold text-slate-200 tracking-tight">
                {item.label}
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-400 border border-white/5">
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MarqueeTicker(): React.JSX.Element {
  return (
    <section
      aria-label="Ecosystem & Architecture Marquee"
      className="py-12 border-y border-white/[0.08] bg-[#030508]/80 relative overflow-hidden"
    >
      {/* Subtle ambient lateral vignette fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#030508] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#030508] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            [ RHL AI ECOSYSTEM & TOOLING INTEGRATIONS ]
          </span>
        </div>
        <div className="text-xs text-slate-500 font-mono hidden sm:inline-block">
          Scroll-reactive • Continuous sync
        </div>
      </div>

      <div className="space-y-3">
        <MarqueeRow items={ROW_ONE_ITEMS} direction="left" speedSeconds={38} />
        <MarqueeRow items={ROW_TWO_ITEMS} direction="right" speedSeconds={42} />
      </div>
    </section>
  );
}
