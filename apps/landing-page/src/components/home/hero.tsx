import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CopyCommand } from '@/components/copy-command';
import { Magnetic } from '@/components/motion/magnetic';
import { ScrambleNumber } from '@/components/motion/scramble-number';
import { GlyphFieldLazy } from './glyph-field-lazy';
import { HeroTerminal } from './hero-terminal';

export interface HeroFact {
  value: number;
  label: string;
  detail: string;
}

export interface HeroProps {
  /** Raw SKILL.md printed on the backdrop grid. */
  skillSource: string;
  facts: HeroFact[];
}

const HEADLINE: string[][] = [
  ['Agents', 'follow', 'instructions.'],
  ['Write', 'them', 'once.'],
];

export function Hero({ skillSource, facts }: HeroProps): React.JSX.Element {
  const lineOffsets = HEADLINE.map((_, i) =>
    HEADLINE.slice(0, i).reduce((sum, l) => sum + l.length, 0)
  );

  return (
    <section className="relative -mt-14 overflow-hidden border-b border-border pt-14">
      {/* Backdrop: the real code-reviewer SKILL.md on a character grid. */}
      <div
        className="pointer-events-none absolute inset-0 hero-mask"
        aria-hidden="true"
      >
        <GlyphFieldLazy text={skillSource} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:pb-24">
        <p className="label enter flex items-center gap-2.5">
          <span className="relative flex size-1.5" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          RHL AI <span className="text-border">/</span> open source{' '}
          <span className="text-border">/</span> MIT
        </p>

        <h1 className="display-xl mt-6 sm:mt-8">
          {HEADLINE.map((line, lineIndex) => (
            <span
              key={line.join(' ')}
              className={lineIndex === 1 ? 'block text-muted-foreground' : 'block'}
            >
              {line.map((word, i) => {
                const index = (lineOffsets[lineIndex] ?? 0) + i;
                return (
                  <React.Fragment key={word}>
                    <span className="kinetic-word">
                      <span style={{ '--i': index } as React.CSSProperties}>{word}</span>
                    </span>
                    {i < line.length - 1 ? ' ' : null}
                  </React.Fragment>
                );
              })}
              {lineIndex === 1 ? (
                <span
                  aria-hidden="true"
                  className="enter-fade ml-[0.12em] inline-block h-[0.7em] w-[0.3em] translate-y-[0.02em] bg-primary align-baseline [--d:900ms]"
                >
                  <span className="block size-full animate-caret bg-primary" />
                </span>
              ) : null}
            </span>
          ))}
        </h1>

        <div className="mt-10 grid grid-cols-1 items-end gap-x-10 gap-y-12 lg:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="enter max-w-md text-base leading-relaxed text-muted-foreground [--d:420ms] sm:text-lg">
              RHL AI packages engineering judgment as{' '}
              <code className="font-mono text-[0.92em] text-foreground">SKILL.md</code> files — and
              ships a CLI that validates and installs them into{' '}
              <code className="font-mono text-[0.92em] text-foreground">~/.agents/skills</code>,
              where your coding agent reads them.
            </p>

            <div className="enter mt-8 flex flex-wrap items-center gap-3 [--d:520ms]">
              <Magnetic>
                <Link
                  href="/quickstart"
                  className="group inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Read the quickstart
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Magnetic>
              <Link
                href="/skills"
                className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
              >
                Browse skills
              </Link>
            </div>

            <div className="enter mt-6 [--d:620ms]">
              <CopyCommand command="npx @rhl-ai/cli skill list" />
            </div>
          </div>

          <div className="enter min-w-0 [--d:300ms] lg:col-span-7">
            <HeroTerminal />
          </div>
        </div>
      </div>

      {/* Facts strip: counts are read from the repo at build time. */}
      <div className="relative border-t border-border">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4">
          {facts.map((fact, index) => (
            <div
              key={fact.label}
              className="flex items-baseline gap-3 border-border py-5 max-md:[&:nth-child(-n+2)]:border-b md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-6"
            >
              <dt className="min-w-0">
                <span className="block text-sm font-medium text-foreground">{fact.label}</span>
                <span className="block truncate font-mono text-[11px] text-muted-foreground">
                  {fact.detail}
                </span>
              </dt>
              <dd className="order-first font-pixel text-2xl leading-none text-foreground sm:text-3xl">
                <ScrambleNumber value={fact.value} delay={0.9 + index * 0.12} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
