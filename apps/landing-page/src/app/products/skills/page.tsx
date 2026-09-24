import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Github, ChevronRight } from 'lucide-react';

export default function SkillsProductPage(): React.JSX.Element {
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
              <Link href="/products" className="hover:text-foreground">
                Products
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Skills System</span>
            </div>

            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              BEHAVIORAL INTELLIGENCE
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Agent Skills System
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Reusable behavioral intelligence and decision heuristics for autonomous coding agents.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/skills">
                <Button size="lg" className="gap-2">
                  Browse Skills Catalog
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link
                href="https://github.com/imRahul05/rhl-ai/tree/main/skills"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <Github className="w-4 h-4" />
                  View Skills on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Product Visual / Schema Demonstration */}
        <section className="py-16 border-b border-border bg-muted/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              SPECIFICATION ANATOMY
            </p>
            <div className="rounded-lg border border-border bg-card p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto shadow-sm">
              <div className="text-muted-foreground mb-1"># skills/code-reviewer/SKILL.md</div>
              <div className="text-primary font-semibold">---</div>
              <div><span className="text-foreground font-semibold">name</span>: code-reviewer</div>
              <div><span className="text-foreground font-semibold">description</span>: Expert AI code reviewer for strict TypeScript and performance.</div>
              <div><span className="text-foreground font-semibold">version</span>: 1.0.0</div>
              <div><span className="text-foreground font-semibold">tags</span>: [code-review, typescript, architecture, security]</div>
              <div className="text-primary font-semibold">---</div>
              <div className="mt-3 text-muted-foreground">## Operating Framework</div>
              <div className="text-foreground/90">1. Evaluate diff against 5 core axes (Correctness, Type Safety, Architecture, Security, Performance)</div>
              <div className="text-foreground/90">2. Classify feedback into 3 strict tiers (Blocking, Non-Blocking, Nitpick)</div>
              <div className="text-foreground/90">3. Synthesize exact line-targeted replacement solutions</div>
            </div>
          </div>
        </section>

        {/* Why it exists */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              PURPOSE
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Why it exists
            </h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl space-y-3">
              <p>
                Hardcoding LLM prompt instructions into frontend JavaScript bundles bloats user payload sizes, couples prompts to application build pipelines, and makes prompt updates tedious.
              </p>
              <p>
                <strong className="text-foreground">The RHL AI Skills System</strong> decouples intelligence from code. Skills live in declarative markdown schemas with standardized YAML frontmatter, resulting in <strong className="text-foreground">0 KB bundle overhead</strong> and universal portability across AI agent runtimes.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                METHODOLOGY
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                How it works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-mono text-primary font-semibold">01 / ENCODE</span>
                <h3 className="font-semibold text-foreground text-base">Standardized Rules</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Engineering domain expertise is written in structured, unambiguous decision trees and negative constraints.
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-mono text-primary font-semibold">02 / MOUNT</span>
                <h3 className="font-semibold text-foreground text-base">Zero Runtime Bundling</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Installed to agent instruction directories (<code className="text-foreground font-mono text-[11px]">~/.agents/skills/</code>) without adding code to your app build.
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-mono text-primary font-semibold">03 / ENFORCE</span>
                <h3 className="font-semibold text-foreground text-base">Consistent Execution</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Agents follow precise 3-tier severity classification and actionable code diff generation on every task.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Skills */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  VERIFIED SKILLS
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Available in the catalog
                </h2>
              </div>
              <Link href="/skills" className="text-xs font-medium text-muted-foreground hover:text-foreground">
                View all skills →
              </Link>
            </div>

            <div className="divide-y divide-border border-y border-border">
              <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground text-lg">Code Reviewer</h3>
                    <Badge variant="outline" size="sm" className="font-mono text-[10px]">v1.0.0</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-xl">
                    Expert AI code reviewer enforcing strict TypeScript, 5-axis inspections, and multi-tier feedback.
                  </p>
                </div>
                <Link href="/skills/code-reviewer">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    View Skill Page
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>

              <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground text-lg">Frontend Performance Engineer</h3>
                    <Badge variant="outline" size="sm" className="font-mono text-[10px]">v1.0.0</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-xl">
                    Evidence-led web performance diagnostics for Core Web Vitals (LCP, INP, CLS) and bundle optimization.
                  </p>
                </div>
                <Link href="/skills/frontend-performance">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    View Skill Page
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Installation & CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Install a skill into your agent today
            </h2>
            <div className="font-mono text-xs sm:text-sm bg-card border border-border p-3 rounded-md max-w-md mx-auto text-muted-foreground">
              <span className="text-primary mr-2">$</span>
              pnpm rhl skill install code-reviewer
            </div>
            <div className="pt-2">
              <Link href="/skills">
                <Button size="lg" className="gap-2">
                  Browse Full Skills Catalog
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
