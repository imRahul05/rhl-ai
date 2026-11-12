import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CopyCommand } from '@/components/copy-command';
import { Magnetic } from '@/components/motion/magnetic';
import { Reveal } from '@/components/motion/reveal';

export function FinalCta(): React.JSX.Element {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden py-28 sm:py-40">
      <div
        aria-hidden="true"
        className="rules pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label">
            <span className="text-primary">05</span> — Start
          </p>
          <h2 id="cta-title" className="display-xl mt-6 max-w-5xl">
            One command to see what is installed.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-col items-start gap-6">
          <CopyCommand command="npx @rhl-ai/cli skill list" size="lg" />
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="/quickstart"
                className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Get started
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="https://github.com/imRahul05/rhl-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
              >
                Read the source
                <ArrowUpRight className="size-4 opacity-60" aria-hidden="true" />
              </Link>
            </Magnetic>
            <Link
              href="/directives"
              className="link-line px-2 pb-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Read the directives
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
