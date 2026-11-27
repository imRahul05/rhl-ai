import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { Magnetic } from '@/components/motion/magnetic';
import { Reveal } from '@/components/motion/reveal';
import { SHORTLIST, SHORTLIST_FEATURES } from '@/content/shortlist';
import { IsoMatch } from './iso-match';

/** Home-page spotlight for Shortlist, the job-match Chrome extension. */
export function ShortlistSpotlight(): React.JSX.Element {
  return (
    <section
      aria-labelledby="shortlist-title"
      className="relative overflow-hidden border-b border-border py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-full [mask-image:radial-gradient(ellipse_at_75%_50%,black,transparent_60%)] lg:w-2/3"
      >
        <div className="iso-grid size-full opacity-60" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-10 gap-y-14 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="label">
              <span className="text-primary">04</span> — Also built
            </p>
            <h2 id="shortlist-title" className="display-lg mt-5">
              {SHORTLIST.name}. <span className="text-muted-foreground">{SHORTLIST.tagline}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {SHORTLIST.summary}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 border-t border-border">
              {SHORTLIST_FEATURES.map((feature) => (
                <li
                  key={feature.tag}
                  className="grid grid-cols-[4.5rem_1fr] gap-x-4 border-b border-border py-3"
                >
                  <span className="pt-0.5 font-mono text-[11px] uppercase tracking-wider text-primary">
                    {feature.tag}
                  </span>
                  <span className="text-sm">
                    <span className="font-medium text-foreground">{feature.title}</span>
                    {feature.ai ? (
                      <span className="ml-2 rounded-[4px] border border-border px-1.5 py-px font-mono text-[10px] text-muted-foreground">
                        optional
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={SHORTLIST.download}
                className="group inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="size-4" aria-hidden="true" />
                Add to Chrome — free
              </a>
            </Magnetic>
            <Link
              href="/products/shortlist"
              className="group inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
            >
              How it works
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href={SHORTLIST.site}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line inline-flex items-center gap-1 px-2 pb-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              shortliistt.vercel.app
              <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
            </a>
          </Reveal>
          <p className="mt-5 font-mono text-[11px] text-muted-foreground">
            Free · no sign-in · no API keys · {SHORTLIST.browsers} · source-available
          </p>
        </div>

        <div className="flex justify-center lg:col-span-6 lg:justify-end">
          <IsoMatch />
        </div>
      </div>
    </section>
  );
}
