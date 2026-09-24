import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Terminal,
  Zap,
  FolderTree,
} from 'lucide-react';

export function ArchitectureSection(): React.JSX.Element {
  return (
    <section id="architecture" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="indigo" size="md" className="mb-3">
            System Design
          </Badge>
          <h2 className="apple-heading-section font-extrabold text-white tracking-tight mb-4">
            Monorepo Architecture
          </h2>
          <p className="apple-body text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Engineered around the strict duality between executable runtime
            packages and non-bundled LLM agent prompt artifacts.
          </p>
        </div>

        {/* Visual Architecture Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Layer 1: Agent Skills */}
          <div className="glass-card p-6 sm:p-7 rounded-2xl border border-indigo-500/30 border-t-indigo-400/40 relative group">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/25 border-t-indigo-400/40 flex items-center justify-center text-indigo-400 mb-4 shadow-sm">
              <Brain className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-indigo-300 uppercase tracking-wider mb-1.5">
              Layer 1 • Intelligence
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
              skills/ & Knowledge
            </h3>
            <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-4 apple-body">
              Behavioral markdown artifacts, decision frameworks, and golden
              rules. Directly ingested by LLM agents without bundle overhead.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/8 font-mono text-xs text-indigo-300 space-y-1">
              <div>▸ skills/code-reviewer/</div>
              <div>▸ skills/frontend-performance/</div>
              <div className="text-slate-500">→ ~/.agents/skills/</div>
            </div>
          </div>

          {/* Layer 2: Executable Packages */}
          <div className="glass-card p-6 sm:p-7 rounded-2xl border border-cyan-500/30 border-t-cyan-400/40 relative group">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/25 border-t-cyan-400/40 flex items-center justify-center text-cyan-400 mb-4 shadow-sm">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-1.5">
              Layer 2 • Execution
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
              packages/ (@rhl-ai/*)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-4 apple-body">
              Strict TypeScript libraries bundled with tsup. Includes the `rhl`
              CLI binary, validation engine, and scaffolding engine.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/8 font-mono text-xs text-cyan-300 space-y-1">
              <div>▸ packages/cli/ (rhl)</div>
              <div>▸ packages/skills/</div>
              <div>▸ packages/scaffold/ & utils/</div>
            </div>
          </div>

          {/* Layer 3: Autonomous Projects & Bots */}
          <div className="glass-card p-6 sm:p-7 rounded-2xl border border-emerald-500/30 border-t-emerald-400/40 relative group">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/25 border-t-emerald-400/40 flex items-center justify-center text-emerald-400 mb-4 shadow-sm">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider mb-1.5">
              Layer 3 • Automations
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
              projects/ & Templates
            </h3>
            <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-4 apple-body">
              Production webhooks and project boilerplates. Deploys to Vercel,
              Cloudflare, or Docker with automated event routing.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/8 font-mono text-xs text-emerald-300 space-y-1">
              <div>▸ create-github-whatsapp-notifier</div>
              <div>▸ templates/nextjs/ (React 19)</div>
              <div>▸ templates/react/ & node/</div>
            </div>
          </div>
        </div>

        {/* Directory Structure Box */}
        <div className="mt-12 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 border-t-white/25">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FolderTree className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Canonical Monorepo Tree
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
            <div className="space-y-1.5 p-4 rounded-xl bg-black/50 border border-white/8">
              <div className="text-indigo-400 font-semibold">rhl-ai/</div>
              <div className="pl-4">├── skills/          # Agent behavior specifications</div>
              <div className="pl-8">├── code-reviewer/</div>
              <div className="pl-8">└── frontend-performance-engineer/</div>
              <div className="pl-4">├── packages/        # Published npm modules</div>
              <div className="pl-8">├── cli/            # rhl global executable</div>
              <div className="pl-8">├── skills/         # AST validator</div>
              <div className="pl-8">├── scaffold/       # Generator</div>
              <div className="pl-8">└── utils/          # Strict runtime helpers</div>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-black/50 border border-white/8">
              <div className="text-emerald-400 font-semibold">rhl-ai/ (continued)</div>
              <div className="pl-4">├── projects/        # Internal tools & bots</div>
              <div className="pl-8">└── github-whatsapp-bot/ # Twilio webhook bot</div>
              <div className="pl-4">├── templates/       # Production starters</div>
              <div className="pl-8">├── nextjs/         # App Router + React 19</div>
              <div className="pl-8">├── react/          # Vite + React</div>
              <div className="pl-8">└── node/           # Node ESM</div>
              <div className="pl-4">└── apps/             # Web applications & landing page</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
