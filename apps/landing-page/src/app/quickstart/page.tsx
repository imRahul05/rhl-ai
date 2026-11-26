import * as React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { QUICKSTART_STEPS as STEPS } from '@/content/quickstart';

export default function QuickstartPage(): React.JSX.Element {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground transition-colors">
      <main id="main" className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">
                RHL AI
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Quickstart</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Quickstart Guide
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Get up and running with the RHL AI ecosystem, command-line tooling, and agent skills
              in under five minutes.
            </p>
          </div>
        </section>

        {/* Steps List */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="border-t border-border pt-8 grid grid-cols-1 md:grid-cols-12 gap-6"
              >
                <div className="md:col-span-4 space-y-1">
                  <span className="font-mono text-xs text-primary font-bold tracking-widest">
                    STEP {step.number}
                  </span>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">{step.title}</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    {step.description}
                  </p>
                  {step.notes ? (
                    <p className="text-[11px] font-mono text-muted-foreground/80 pt-2">
                      Note: {step.notes}
                    </p>
                  ) : null}
                </div>

                <div className="md:col-span-8">
                  <div className="rounded-lg border border-border bg-card p-4 font-mono text-xs leading-relaxed text-foreground/90 overflow-x-auto">
                    <pre className="whitespace-pre">{step.command}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
