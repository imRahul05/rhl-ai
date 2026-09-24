import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function CodeReviewerSkillPage(): React.JSX.Element {
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
              <span className="text-foreground">Code Reviewer</span>
            </div>

            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              AGENT SKILL
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Code Reviewer
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Expert AI code review for modern TypeScript applications using structured engineering heuristics.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="font-mono text-xs bg-card border border-border px-3 py-2 rounded-md text-foreground flex items-center gap-2">
                <span className="text-primary font-bold">$</span>
                <span>pnpm rhl skill install code-reviewer</span>
              </div>
              <Link
                href="https://github.com/imRahul05/rhl-ai/blob/main/skills/code-reviewer/SKILL.md"
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
                The Code Reviewer skill instructs autonomous coding agents to evaluate pull requests and code changes with the depth and skepticism of a staff engineer.
              </p>
              <p>
                Rather than offering superficial syntax nitpicks, it systematically inspects changes against five distinct dimensions: Correctness, Type Safety, Architecture, Security, and Performance.
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
                <h3 className="font-semibold text-foreground text-sm">Pull Request Gate</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Automatically run against PR diffs before requesting human peer reviews.
                </p>
              </div>

              <div className="border-t border-border pt-3 space-y-1.5">
                <span className="font-mono text-xs text-primary font-semibold">02</span>
                <h3 className="font-semibold text-foreground text-sm">Pre-Commit Sanity</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Verify local branch changes against absolute zero-any type policies.
                </p>
              </div>

              <div className="border-t border-border pt-3 space-y-1.5">
                <span className="font-mono text-xs text-primary font-semibold">03</span>
                <h3 className="font-semibold text-foreground text-sm">Architecture Audits</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ensure package and module boundaries are strictly respected during refactors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How the agent behaves */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                DECISION FRAMEWORK
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                How the agent behaves
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-md border border-destructive/20 bg-destructive/5 space-y-1">
                <span className="font-mono text-xs font-bold text-destructive uppercase tracking-wider">
                  Tier 1: Blocking (Must Fix)
                </span>
                <p className="text-muted-foreground">
                  Use of <code className="text-foreground font-mono">any</code>, unsafe type casts, unhandled promise rejections, race conditions, injection vulnerabilities, and breaking API changes without backward compatibility.
                </p>
              </div>

              <div className="p-4 rounded-md border border-amber-500/20 bg-amber-500/5 space-y-1">
                <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Tier 2: Non-Blocking (Should Fix)
                </span>
                <p className="text-muted-foreground">
                  Unnecessary re-renders, redundant object allocations, N+1 query patterns, lack of unit test coverage, and overly cryptic variable naming.
                </p>
              </div>

              <div className="p-4 rounded-md border border-border bg-card space-y-1">
                <span className="font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Tier 3: Nitpick (Optional)
                </span>
                <p className="text-muted-foreground">
                  Purely stylistic suggestions that should ideally be handled by automated ESLint or Prettier rules.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Output */}
        <section className="py-16 border-b border-border bg-muted/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              EXAMPLE REVIEW OUTPUT
            </p>
            <div className="rounded-lg border border-border bg-card p-5 font-mono text-xs leading-relaxed space-y-3">
              <div className="text-destructive font-semibold">
                [BLOCKING] apps/web/src/hooks/useUser.ts:24 - Unsafe Type Assertion
              </div>
              <div className="text-muted-foreground">
                Observation: Casting `response.data as any` bypasses TypeScript compile-time safety and exposes downstream components to unhandled undefined properties if the API shape mutates.
              </div>
              <div className="pt-2 text-foreground font-semibold">
                Suggested Replacement:
              </div>
              <pre className="p-3 rounded bg-muted/60 text-foreground overflow-x-auto">
{`interface UserResponse {
  id: string;
  email: string;
  displayName: string;
}

export function parseUser(data: unknown): UserResponse {
  return UserSchema.parse(data);
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Rules & Methodology */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              RULES
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Core review methodology
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">―</span>
                <span><strong className="text-foreground">Zero any tolerance:</strong> Never allow `any` in function parameters, return types, or assertions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">―</span>
                <span><strong className="text-foreground">Concrete solution requirement:</strong> Every critique must provide an actionable, copy-pasteable replacement diff.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">―</span>
                <span><strong className="text-foreground">Edge case verification:</strong> Explicitly evaluate behavior under network timeouts, empty payloads, and concurrent requests.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Installation */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Install Code Reviewer skill
            </h2>
            <div className="font-mono text-xs sm:text-sm bg-card border border-border p-3 rounded-md max-w-md mx-auto text-foreground">
              <span className="text-primary mr-2">$</span>
              pnpm rhl skill install code-reviewer
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
