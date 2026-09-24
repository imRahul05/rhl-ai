'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import {
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  title: string;
  version: string;
  tagline: string;
  tags: string[];
  description: string;
  frameworkSteps: string[];
  constraints: string[];
  installCommand: string;
  rawSnippet: string;
}

const SKILLS_DATA: SkillItem[] = [
  {
    id: 'code-reviewer',
    name: 'code-reviewer',
    title: 'Code Reviewer Agent Skill',
    version: '1.0.0',
    tagline:
      'Senior multi-axis AI code review skill for TypeScript and modern web stacks.',
    tags: ['code-review', 'quality', 'typescript', 'architecture'],
    description:
      'Directs AI coding assistants to conduct rigorous, multi-dimensional code reviews evaluating correctness, readability, architecture, security, and performance. Prevents bugs before they reach production.',
    frameworkSteps: [
      'Axis 1: Correctness — strict null checks, logic bugs, race conditions, edge cases',
      'Axis 2: Readability — descriptive naming, pure functions, declarative JSX',
      'Axis 3: Architecture — modular boundaries, DRY vs YAGNI balance, single responsibility',
      'Axis 4: Security — XSS prevention, sanitized inputs, credential leak prevention',
      'Axis 5: Performance — memoization prudence, bundle size impact, N+1 patterns',
    ],
    constraints: [
      'Absolute ban on `any` types under all circumstances',
      'Never recommend premature memoization without measuring cost',
      'Zero setState in useEffect — strictly prefer derived state',
      'Enforce interface definitions over ad-hoc inline objects',
    ],
    installCommand: 'pnpm rhl skill install code-reviewer',
    rawSnippet: `---
name: code-reviewer
description: Expert AI code reviewer for TypeScript and modern web stacks.
version: 1.0.0
author: RHL AI
tags: [code-review, quality, typescript, architecture]
---

# Code Reviewer
Evaluates code changes across five orthogonal axes:
1. Correctness (Edge cases, null safety, async race conditions)
2. Readability (Declarative patterns, clear naming)
3. Architecture (Coupling, abstraction layers, modularity)
4. Security (Sanitization, access control, auth leaks)
5. Performance (Render waterfalls, bundle weight)`,
  },
  {
    id: 'frontend-performance-engineer',
    name: 'frontend-performance-engineer',
    title: 'Frontend Performance Engineer Skill',
    version: '1.0.0',
    tagline:
      'Evidence-led frontend performance diagnosis and Core Web Vitals optimization.',
    tags: ['performance', 'cwv', 'lcp', 'inp', 'bundles'],
    description:
      'Guides LLM agents to act as seasoned performance engineers rather than "performance-tip generators". Never recommends an optimization without empirical bottleneck evidence and verified impact.',
    frameworkSteps: [
      'Step 1: Frame — identify user journey, network profile, and target metrics',
      'Step 2: Measure — prefer RUM/CrUX and DevTools traces over intuition',
      'Step 3: Localize — classify bottleneck (server, loading, bundle, rendering, main thread)',
      'Step 4: Generate Candidates — map symptoms to validated performance patterns',
      'Step 5: Verify — compare before/after metrics under identical lab conditions',
    ],
    constraints: [
      'Never recommend an optimization merely because it is a known "best practice"',
      'Do not solve backend/API latency with frontend memoization',
      'Profile interaction traces and long tasks before adding useMemo/useCallback',
      'Label all findings explicitly as measured, observed, or hypothesis',
    ],
    installCommand: 'pnpm rhl skill install frontend-performance-engineer',
    rawSnippet: `---
name: frontend-performance-engineer
description: Evidence-led frontend performance engineering skill.
version: 1.0.0
author: RHL AI
tags: [performance, cwv, lcp, inp, bundles]
---

# Frontend Performance Engineer
Core rule: Never recommend an optimization merely because it is a known best practice.
1. Slow LCP: inspect server TTFB, render blocking, and critical image priority
2. Poor INP: inspect interaction traces and main thread long tasks
3. Bundle size: analyze dynamic imports and tree-shaking boundaries`,
  },
];

export function SkillsCatalog(): React.JSX.Element {
  const [selectedTag, setSelectedTag] = React.useState<string>('all');
  const [activeSkillId, setActiveSkillId] = React.useState<string>(
    'code-reviewer'
  );
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const allTags = ['all', 'code-review', 'performance', 'quality', 'typescript'];

  const filteredSkills = React.useMemo(() => {
    if (selectedTag === 'all') return SKILLS_DATA;
    return SKILLS_DATA.filter((s) => s.tags.includes(selectedTag));
  }, [selectedTag]);

  const activeSkill = React.useMemo(() => {
    const found = SKILLS_DATA.find((s) => s.id === activeSkillId);
    return found ? found : SKILLS_DATA[0]!;
  }, [activeSkillId]);

  function handleCopy(id: string, text: string): void {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="cyan" size="md" className="mb-3">
            Agent Intelligence Catalog
          </Badge>
          <h2 className="apple-heading-section font-extrabold text-white tracking-tight mb-4">
            AI Agent Skills Marketplace
          </h2>
          <p className="apple-body text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Skills transform general AI assistants into specialized, disciplined
            domain experts. Each skill contains strict decision frameworks,
            anti-patterns, and golden references.
          </p>

          {/* Filter pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 capitalize ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm border-t-cyan-400/40'
                      : 'bg-white/[0.03] text-slate-400 border border-white/8 hover:text-slate-200 hover:bg-white/[0.06]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Skill Selector List (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            {filteredSkills.map((skill) => {
              const isSelected = skill.id === activeSkill.id;

              return (
                <div
                  key={skill.id}
                  onClick={() => setActiveSkillId(skill.id)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all active:scale-[0.98] ${
                    isSelected
                      ? 'bg-indigo-600/[0.14] border-indigo-500/50 border-t-indigo-400/50 shadow-lg shadow-indigo-950/40'
                      : 'glass-card border-white/8 border-t-white/18 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-white text-base tracking-tight">
                      {skill.name}
                    </span>
                    <Badge variant="indigo" size="sm">
                      v{skill.version}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-300/85 line-clamp-2 mb-3 apple-body">
                    {skill.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Hint Box */}
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] text-xs text-slate-400 flex items-start gap-2.5 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Want to create a custom skill? Run{' '}
                <code className="text-indigo-300 font-mono">
                  pnpm rhl skill create &lt;name&gt;
                </code>{' '}
                to scaffold a compliant skill structure.
              </span>
            </div>
          </div>

          {/* Active Skill Deep Inspector (8 cols) */}
          <div className="lg:col-span-8 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 border-t-white/25">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {activeSkill.title}
                  </h3>
                  <Badge variant="cyan" size="sm">
                    Verified
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/85 apple-body max-w-xl">
                  {activeSkill.description}
                </p>
              </div>

              {/* 1-click install button */}
              <button
                onClick={() =>
                  handleCopy(activeSkill.id, activeSkill.installCommand)
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-mono text-xs transition-all shrink-0 shadow-apple-button border-t border-white/25"
                title="Copy installation command"
              >
                {copiedId === activeSkill.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copied command!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Install Skill</span>
                  </>
                )}
              </button>
            </div>

            {/* Base UI Tabs for Deep Skill Inspection */}
            <div className="mt-6">
              <Tabs defaultValue="framework" className="w-full">
                <TabsList className="bg-black/40 p-1 rounded-xl mb-6 flex flex-wrap gap-1 border border-white/8">
                  <TabsTrigger
                    value="framework"
                    className="text-xs data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg px-3.5 py-1.5 transition-all active:scale-95 text-slate-400"
                  >
                    Decision Framework
                  </TabsTrigger>
                  <TabsTrigger
                    value="constraints"
                    className="text-xs data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg px-3.5 py-1.5 transition-all active:scale-95 text-slate-400"
                  >
                    Strict Constraints
                  </TabsTrigger>
                  <TabsTrigger
                    value="raw-spec"
                    className="text-xs data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg px-3.5 py-1.5 transition-all active:scale-95 text-slate-400"
                  >
                    Raw SKILL.md Spec
                  </TabsTrigger>
                </TabsList>

                {/* Tab: Decision Framework */}
                <TabsContent value="framework" className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Operating Loop & Step-by-Step Reasoning:
                  </div>
                  {activeSkill.frameworkSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </TabsContent>

                {/* Tab: Constraints */}
                <TabsContent value="constraints" className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-2">
                    Negative Rules & Non-Negotiables:
                  </div>
                  {activeSkill.constraints.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-rose-500/[0.04] border border-rose-500/20 flex items-start gap-3 text-xs sm:text-sm text-rose-200"
                    >
                      <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </TabsContent>

                {/* Tab: Raw SKILL.md */}
                <TabsContent value="raw-spec">
                  <div className="rounded-xl bg-black/60 border border-white/10 p-4 font-mono text-xs text-indigo-200 overflow-x-auto max-h-[300px]">
                    <pre>{activeSkill.rawSnippet}</pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
