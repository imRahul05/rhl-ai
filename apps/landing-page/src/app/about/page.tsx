import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { siGithub } from 'simple-icons';

export default function AboutPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">
                RHL AI
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">About</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              About RHL AI
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              An engineering ecosystem built to elevate AI-assisted software development through reusable skills, strict type safety, and open source tooling.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
            {/* The Vision */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                The Vision
              </h2>
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3 max-w-2xl">
                <p>
                  As AI coding assistants become central to daily software engineering, the industry faces a challenge: models frequently operate without domain context, produce unvalidated type assertions, and offer superficial advice.
                </p>
                <p>
                  <strong className="text-foreground">RHL AI</strong> was created to solve this by codifying real engineering discipline into declarative, portable agent skills and developer tooling. We believe AI workflows should be governed by the same high standards we expect from senior software engineers: absolute type safety, evidence-based performance analysis, and modular software design.
                </p>
              </div>
            </div>

            {/* Maintainer & Open Source */}
            <div className="border-t border-border pt-8 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Open Source & Maintainer
              </h2>
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3 max-w-2xl">
                <p>
                  RHL AI is maintained by{' '}
                  <Link
                    href="https://github.com/imRahul05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-semibold hover:underline"
                  >
                    Rahul Kumar (@imRahul05)
                  </Link>{' '}
                  and developed as a fully open-source project under the permissive MIT License.
                </p>
                <p>
                  Contributions are welcomed across all domains: authoring new agent skills, improving CLI orchestrator ergonomics, or creating webhook automations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="https://github.com/imRahul05/rhl-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-label={siGithub.title}><path d={siGithub.path} /></svg>
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </Button>
                </Link>
                <Link
                  href="https://github.com/imRahul05"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm">
                    Follow @imRahul05
                  </Button>
                </Link>
              </div>
            </div>

            {/* License & Principles */}
            <div className="border-t border-border pt-8 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                License & Philosophy
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                All code in the monorepo is published under the MIT license, permitting commercial and personal use, modification, and distribution with attribution.
              </p>
              <div className="p-4 rounded-md border border-border bg-card font-mono text-xs text-muted-foreground max-w-md">
                LICENSE: MIT PERMISSIVE
                <br />
                COPYRIGHT: (c) 2026 Rahul Kumar
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
