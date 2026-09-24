import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function FrontendPerformanceSkillPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb & Hero */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">
                RHL AI
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/skills" className="hover:text-foreground">
                Skills
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Frontend Performance</span>
            </div>

            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              AGENT SKILL
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Frontend Performance Engineer
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Evidence-driven frontend performance engineering and Core Web Vitals diagnostic analysis.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="font-mono text-xs bg-card border border-border px-3 py-2 rounded-md text-foreground flex items-center gap-2">
                <span className="text-primary font-bold">$</span>
                <span>pnpm rhl skill install frontend-performance-engineer</span>
              </div>
              <Link
                href="https://github.com/imRahul05/rhl-ai/blob/main/skills/frontend-performance-engineer/SKILL.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  View Raw SKILL.md
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* What this skill does */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              CAPABILITIES
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              What this skill does
            </h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3 max-w-2xl">
              <p>
                The Frontend Performance Engineer skill transforms an AI assistant from a generic "performance tip generator" into an evidence-driven performance engineer.
              </p>
              <p>
                It forbids speculative optimization. Instead, it guides the agent to identify the actual bottleneck first (LCP, INP, CLS, bundle weight, or rendering waterfall), select only applicable patterns, explain trade-offs, make the smallest justified change, and verify before/after impact.
              </p>
            </div>
          </div>
        </section>

        {/* When to use it */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              APPLICATION
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              When to use it
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="border-t border-border pt-3 space-y-1.5">
                <span className="font-mono text-xs text-primary font-semibold">01</span>
                <h3 className="font-semibold text-foreground text-sm">Core Web Vitals</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Diagnose real user telemetry failures in LCP (&gt;2.5s) or INP (&gt;200ms).
                </p>
              </div>

              <div className="border-t border-border pt-3 space-y-1.5">
                <span className="font-mono text-xs text-primary font-semibold">02</span>
                <h3 className="font-semibold text-foreground text-sm">Bundle & Waterfalls</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Identify oversized client chunks, duplicated modules, and blocking request chains.
                </p>
              </div>

              <div className="border-t border-border pt-3 space-y-1.5">
                <span className="font-mono text-xs text-primary font-semibold">03</span>
                <h3 className="font-semibold text-foreground text-sm">Interaction Lag</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Profile input latency, expensive React reconciliation, and layout thrashing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How the agent behaves - The 8-step loop */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                OPERATING DISCIPLINE
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                The 8-step operating loop
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="border border-border p-3.5 rounded-md bg-card space-y-1">
                <span className="font-mono text-primary font-bold">1. Frame</span>
                <p className="text-muted-foreground">Define user journey, device, network profile, and target metric.</p>
              </div>
              <div className="border border-border p-3.5 rounded-md bg-card space-y-1">
                <span className="font-mono text-primary font-bold">2. Measure</span>
                <p className="text-muted-foreground">Gather RUM/CrUX or reproducible lab traces before touching code.</p>
              </div>
              <div className="border border-border p-3.5 rounded-md bg-card space-y-1">
                <span className="font-mono text-primary font-bold">3. Localize</span>
                <p className="text-muted-foreground">Isolate whether the bottleneck is network, bundle, main-thread, or render.</p>
              </div>
              <div className="border border-border p-3.5 rounded-md bg-card space-y-1">
                <span className="font-mono text-primary font-bold">4. Match</span>
                <p className="text-muted-foreground">Select candidate patterns strictly verified for this symptom.</p>
              </div>
              <div className="border border-border p-3.5 rounded-md bg-card space-y-1">
                <span className="font-mono text-primary font-bold">5. Check Fit</span>
                <p className="text-muted-foreground">Evaluate tradeoffs, memory overhead, cache invalidation risk.</p>
              </div>
              <div className="border border-border p-3.5 rounded-md bg-card space-y-1">
                <span className="font-mono text-primary font-bold">6. Implement</span>
                <p className="text-muted-foreground">Apply the smallest justified change addressing the measured cause.</p>
              </div>
              <div className="border border-border p-3.5 rounded-md bg-card space-y-1">
                <span className="font-mono text-primary font-bold">7. Verify</span>
                <p className="text-muted-foreground">Compare the exact same metric under identical test conditions.</p>
              </div>
              <div className="border border-border p-3.5 rounded-md bg-card space-y-1">
                <span className="font-mono text-primary font-bold">8. Guard</span>
                <p className="text-muted-foreground">Add CI performance budget or telemetry alarm against regressions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Output */}
        <section className="py-16 border-b border-border bg-muted/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              STANDARDIZED DIAGNOSTIC OUTPUT
            </p>
            <div className="rounded-lg border border-border bg-card p-5 font-mono text-xs leading-relaxed space-y-2.5">
              <div className="text-primary font-semibold">
                Finding: 840ms TTFB caused by dynamic database query in root layout server component
              </div>
              <div className="text-muted-foreground">
                • Evidence: DevTools network waterfall showing 840ms waiting (TTFB) before HTML streaming begins.
                <br />
                • User Impact: 75th percentile LCP degraded to 3.4s on mobile devices.
                <br />
                • Root Cause: Uncached global user session fetch executing synchronously before any shell HTML is flushed.
                <br />
                • Recommended Fix: Wrap user metadata in React Suspense boundary to allow instant shell streaming.
              </div>
            </div>
          </div>
        </section>

        {/* Rules & Methodology */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              FOUNDATIONAL LAW
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Evidence hierarchy
            </h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3 max-w-2xl">
              <p>
                The agent must prioritize sources in strict order:
              </p>
              <div className="bg-muted/40 p-4 rounded-md border border-border font-mono text-xs space-y-1 text-foreground">
                <div>1. RUM / CrUX / production field telemetry (highest confidence)</div>
                <div>2. DevTools performance traces & network waterfalls</div>
                <div>3. Lighthouse / PageSpeed lab runs</div>
                <div>4. Bundle/build analysis (Webpack/Turbopack analyzer)</div>
                <div>5. Static code heuristics & source inspection</div>
                <div className="text-muted-foreground">6. Developer intuition (treated solely as an unproven hypothesis)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Install Frontend Performance skill
            </h2>
            <div className="font-mono text-xs sm:text-sm bg-card border border-border p-3 rounded-md max-w-lg mx-auto text-foreground">
              <span className="text-primary mr-2">$</span>
              pnpm rhl skill install frontend-performance-engineer
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
