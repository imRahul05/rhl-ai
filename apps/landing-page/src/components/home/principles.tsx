import * as React from 'react';
import { Reveal } from '@/components/motion/reveal';

interface Principle {
  title: string;
  summary: string;
  detail: string;
}

const PRINCIPLES: Principle[] = [
  {
    title: 'Strict TypeScript',
    summary: 'no any, anywhere',
    detail:
      'Every package and script is compiled under strict settings, and the linter rejects unsafe assignments, calls and returns.',
  },
  {
    title: 'Composable tooling',
    summary: 'independent packages',
    detail:
      'Use one tool on its own or all of them through the CLI. Each module has clear boundaries and is versioned independently.',
  },
  {
    title: 'Agent-native',
    summary: 'written for LLMs to follow',
    detail:
      'Structured instructions, YAML frontmatter and explicit decision frameworks that coding agents apply the same way every time.',
  },
  {
    title: 'Open source',
    summary: 'MIT licensed',
    detail:
      'Built in the open. Read the source, contribute your own skills, and self-host the automations.',
  },
];

export function Principles(): React.JSX.Element {
  return (
    <section aria-labelledby="principles-title" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-12 px-4 sm:px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="label">
              <span className="text-primary">04</span> — Ground rules
            </p>
            <h2 id="principles-title" className="display-lg mt-5">
              Built the way it tells agents to build.
            </h2>
          </div>
        </Reveal>

        <ol className="lg:col-span-8">
          {PRINCIPLES.map((principle, index) => (
            <Reveal
              as="li"
              key={principle.title}
              delay={index * 0.06}
              className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-border py-7 last:border-b sm:grid-cols-[4rem_1fr_1.2fr] sm:gap-x-8 sm:py-9"
            >
              <span className="font-pixel text-xl leading-none text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {principle.title}
                </h3>
                <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                  {principle.summary}
                </p>
              </div>
              <p className="col-start-2 mt-3 text-sm leading-relaxed text-muted-foreground sm:col-start-3 sm:mt-0">
                {principle.detail}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
