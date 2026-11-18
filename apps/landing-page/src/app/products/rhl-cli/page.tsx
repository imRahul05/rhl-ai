import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroTerminal } from '@/components/home/hero-terminal';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { siGithub } from 'simple-icons';

export default function RhlCliPage(): React.JSX.Element {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground transition-colors">
      <main id="main" className="flex-1">
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
              <span className="text-foreground">RHL CLI</span>
            </div>

            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              DEVELOPER TOOLING
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              RHL CLI
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              The command center for agent workflows, skill installation, and monorepo scaffolding.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/quickstart">
                <Button size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link
                href="https://github.com/imRahul05/rhl-ai/tree/main/packages/cli"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current"
                    aria-label={siGithub.title}
                  >
                    <path d={siGithub.path} />
                  </svg>
                  View Source on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Large Product Demonstration */}
        <section className="py-16 border-b border-border bg-muted/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              DEMONSTRATION
            </p>
            <HeroTerminal />
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
                Agentic workflows are frequently fragmented across disparate scripts, undocumented
                system prompts, and manual folder copies.
              </p>
              <p>
                <strong className="text-foreground">RHL CLI</strong> unifies agent tooling under a
                single executable. It automates the discovery, validation, and installation of
                verified coding agent skills while managing project bootstrapping and environment
                configurations with zero ambiguity.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                WORKFLOW
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                How it works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-mono text-primary font-semibold">01 / DISCOVERY</span>
                <h3 className="font-semibold text-foreground text-base">Scan & Discover</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Scans local and remote skill registries for standardized YAML frontmatter schemas.
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-mono text-primary font-semibold">
                  02 / VERIFICATION
                </span>
                <h3 className="font-semibold text-foreground text-base">Validate Heuristics</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Checks that review rules, decision loops, and negative constraints adhere to
                  strict formats.
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-mono text-primary font-semibold">
                  03 / INSTALLATION
                </span>
                <h3 className="font-semibold text-foreground text-base">Mount to Assistant</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Installs skills into{' '}
                  <code className="text-foreground font-mono text-[11px]">~/.claude/skills/</code>{' '}
                  with <code className="text-foreground font-mono text-[11px]">--target</code>{' '}
                  (Claude Code) or{' '}
                  <code className="text-foreground font-mono text-[11px]">~/.agents/skills/</code>{' '}
                  by default.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Command Reference */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                CLI COMMAND REFERENCE
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Core commands
              </h2>
              <p className="text-sm text-muted-foreground mt-3">
                Run any command without installing:{' '}
                <code className="font-mono text-foreground">npx @rhl-ai/cli &lt;command&gt;</code>.
                Or install once with{' '}
                <code className="font-mono text-foreground">npm install -g @rhl-ai/cli</code> and
                use <code className="font-mono text-foreground">rhl</code>.
              </p>
            </div>

            <div className="divide-y divide-border border-y border-border">
              <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-baseline">
                <code className="text-xs font-mono font-semibold text-foreground">
                  rhl skill list
                </code>
                <div className="md:col-span-2 text-xs text-muted-foreground">
                  Lists every skill bundled with the CLI (or in your repo’s skills/ folder), with
                  version and files.
                </div>
              </div>

              <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-baseline">
                <code className="text-xs font-mono font-semibold text-foreground">
                  rhl skill install &lt;name&gt;
                </code>
                <div className="md:col-span-2 text-xs text-muted-foreground">
                  Installs a skill into an agent’s skills folder. Default{' '}
                  <code className="font-mono text-foreground">~/.agents/skills/</code>; add{' '}
                  <code className="font-mono text-foreground">--target ~/.claude/skills</code> for
                  Claude Code, then call it with{' '}
                  <code className="font-mono text-foreground">/&lt;name&gt;</code>.
                </div>
              </div>

              <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-baseline">
                <code className="text-xs font-mono font-semibold text-foreground">
                  rhl skill update [name]
                </code>
                <div className="md:col-span-2 text-xs text-muted-foreground">
                  Re-copies an installed skill (or all of them) from the latest CLI release. Takes
                  the same <code className="font-mono text-foreground">--target</code>.
                </div>
              </div>

              <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-baseline">
                <code className="text-xs font-mono font-semibold text-foreground">
                  rhl skill validate &lt;name&gt;
                </code>
                <div className="md:col-span-2 text-xs text-muted-foreground">
                  Checks a skill’s SKILL.md frontmatter and folder layout before you share it.
                </div>
              </div>

              <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-baseline">
                <code className="text-xs font-mono font-semibold text-foreground">
                  rhl skill create &lt;name&gt;
                </code>
                <div className="md:col-span-2 text-xs text-muted-foreground">
                  Scaffolds a new skill folder with a valid SKILL.md to start writing your own.
                </div>
              </div>

              <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-baseline">
                <code className="text-xs font-mono font-semibold text-foreground">
                  rhl create &lt;template&gt;
                </code>
                <div className="md:col-span-2 text-xs text-muted-foreground">
                  Scaffolds a project from a bundled template: nextjs, react, node or whatsapp-bot.
                  Run it without arguments to list them.
                </div>
              </div>

              <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-baseline">
                <code className="text-xs font-mono font-semibold text-foreground">rhl --help</code>
                <div className="md:col-span-2 text-xs text-muted-foreground">
                  Prints global options, version info, and available command flags.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              SPECIFICATION
            </p>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Technical architecture
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted-foreground pt-2">
              <div className="border border-border p-4 rounded-md bg-card">
                <div className="font-semibold text-foreground mb-1">Runtime Environment</div>
                <p>Node.js &gt;= 20.0.0, Native ES Modules (ESM), Commander architecture.</p>
              </div>
              <div className="border border-border p-4 rounded-md bg-card">
                <div className="font-semibold text-foreground mb-1">Type Safety</div>
                <p>
                  100% strict TypeScript. Zero use of <code className="text-foreground">any</code>{' '}
                  or <code className="text-foreground">unknown</code>.
                </p>
              </div>
              <div className="border border-border p-4 rounded-md bg-card">
                <div className="font-semibold text-foreground mb-1">Bundle & Dependencies</div>
                <p>
                  Featherlight bundle compiled via tsup; picocolors for zero-overhead terminal
                  output.
                </p>
              </div>
              <div className="border border-border p-4 rounded-md bg-card">
                <div className="font-semibold text-foreground mb-1">Monorepo Integration</div>
                <p>Turborepo-cached compilation with automated changeset release management.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Ready to use RHL CLI?
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Install your first skill into Claude Code and call it with a slash command in under a
              minute.
            </p>
            <div className="pt-2">
              <Link href="/quickstart">
                <Button size="lg" className="gap-2">
                  <span>Read Quickstart Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
