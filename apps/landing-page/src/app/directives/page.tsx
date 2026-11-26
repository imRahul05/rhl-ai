import * as React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { DIRECTIVES } from '@/content/directives';

export default function DirectivesPage(): React.JSX.Element {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground transition-colors">
      <main id="main" className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">
                RHL AI
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Directives</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Directives
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              The foundational engineering laws governing RHL AI software architecture, type safety,
              and agent behaviors.
            </p>
          </div>
        </section>

        {/* Directives List */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="divide-y divide-border">
              {DIRECTIVES.map((directive) => (
                <div
                  key={directive.id}
                  className="py-12 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Left Column: Directive Title & Number */}
                  <div className="lg:col-span-4 space-y-2">
                    <span className="font-mono text-xs text-primary font-bold tracking-widest">
                      DIRECTIVE {directive.number}
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {directive.name}
                    </h2>
                    <p className="text-xs font-mono text-muted-foreground pt-1">
                      {directive.enforcement}
                    </p>
                  </div>

                  {/* Right Column: Statement & Code */}
                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-sm font-medium text-foreground">{directive.tagline}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {directive.description}
                    </p>

                    <div className="pt-2">
                      <div className="rounded-md border border-border bg-card p-4 font-mono text-xs text-foreground/90 overflow-x-auto">
                        <pre className="whitespace-pre">{directive.codeExample}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
