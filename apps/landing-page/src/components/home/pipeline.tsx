'use client';

import * as React from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import { useMediaQuery, usePrefersReducedMotion } from '@/components/motion/use-media-query';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

type LineKind = 'cmd' | 'info' | 'ok' | 'plain' | 'dim' | 'bold' | 'add' | 'del' | 'gap';

interface PanelLine {
  kind: LineKind;
  text: string;
}

interface Stage {
  id: string;
  verb: string;
  title: string;
  body: string;
  /** Label of this stage's stop on the track. */
  stop: string;
  panelTitle: string;
  lines: PanelLine[];
  footnote?: string;
}

/** Terminal output is verbatim from the `rhl` binary; the review is the skill's own example. */
const STAGES: Stage[] = [
  {
    id: 'discover',
    verb: 'Discover',
    title: 'See what is on the shelf.',
    body: 'The CLI scans the catalog and prints every skill with its version, author and bundled files.',
    stop: 'skills/',
    panelTitle: 'zsh',
    lines: [
      { kind: 'cmd', text: 'rhl skill list' },
      { kind: 'gap', text: '' },
      { kind: 'bold', text: 'Available AI Agent Skills (2):' },
      { kind: 'gap', text: '' },
      { kind: 'plain', text: '• code-reviewer v1.0.0 by RHL AI' },
      { kind: 'dim', text: '  Files: 1 references, 1 examples, 1 scripts' },
      { kind: 'plain', text: '• frontend-performance-engineer' },
      { kind: 'dim', text: '  Files: 1 references, 1 examples, 1 scripts' },
    ],
  },
  {
    id: 'validate',
    verb: 'Validate',
    title: 'Check the contract first.',
    body: 'Frontmatter, instructions and folder structure are verified before anything touches your machine.',
    stop: 'validate',
    panelTitle: 'zsh',
    lines: [
      { kind: 'cmd', text: 'rhl skill validate code-reviewer' },
      { kind: 'gap', text: '' },
      { kind: 'info', text: "Validating skill 'code-reviewer' at skills/code-reviewer..." },
      { kind: 'dim', text: '  metadata.name          code-reviewer' },
      { kind: 'dim', text: '  metadata.description   present' },
      { kind: 'dim', text: '  instructions           present' },
      { kind: 'ok', text: "Skill 'code-reviewer' is valid and ready for agents!" },
    ],
    footnote: 'Field rows are annotated; the CLI prints the first and last line.',
  },
  {
    id: 'install',
    verb: 'Install',
    title: 'Copy it where agents look.',
    body: 'The folder lands in ~/.agents/skills as plain files. No daemon, no lockfile, nothing added to your app.',
    stop: '~/.agents/skills',
    panelTitle: 'zsh',
    lines: [
      { kind: 'cmd', text: 'rhl skill install code-reviewer' },
      { kind: 'gap', text: '' },
      { kind: 'info', text: "Installing skill 'code-reviewer'..." },
      {
        kind: 'ok',
        text: "Skill 'code-reviewer' successfully installed to '~/.agents/skills/code-reviewer'.",
      },
      { kind: 'gap', text: '' },
      { kind: 'cmd', text: 'ls ~/.agents/skills/code-reviewer' },
      { kind: 'plain', text: 'SKILL.md  examples/  references/  scripts/' },
    ],
  },
  {
    id: 'apply',
    verb: 'Apply',
    title: 'The agent reviews the way you would.',
    body: 'With the skill loaded, every finding arrives in the same shape: file, severity, problem, suggested fix.',
    stop: 'agent',
    panelTitle: 'agent · code-reviewer',
    lines: [
      { kind: 'bold', text: 'Finding 1: Unsafe Type Assertion' },
      { kind: 'gap', text: '' },
      { kind: 'plain', text: 'File      packages/scaffold/src/copier.ts:42' },
      { kind: 'info', text: 'Severity  Blocking (Must Fix)' },
      { kind: 'dim', text: 'Problem   `data` is cast as `any`, bypassing type safety.' },
      { kind: 'gap', text: '' },
      { kind: 'del', text: 'const config = JSON.parse(raw) as any;' },
      { kind: 'add', text: 'const config = JSON.parse(raw) as ConfigData;' },
    ],
    footnote: 'From skills/code-reviewer/examples/review-sample.md',
  },
];

const LAST = STAGES.length - 1;

function Line({ line }: { line: PanelLine }): React.JSX.Element {
  switch (line.kind) {
    case 'gap':
      return <div className="h-1.5 sm:h-2.5" />;
    case 'cmd':
      return (
        <div className="text-foreground">
          <span className="mr-2 select-none text-primary">❯</span>
          {line.text}
        </div>
      );
    case 'info':
      return (
        <div className="text-muted-foreground">
          <span className="mr-2 text-primary">ℹ</span>
          {line.text}
        </div>
      );
    case 'ok':
      return (
        <div className="text-foreground">
          <span className="mr-2 text-success">✔</span>
          {line.text}
        </div>
      );
    case 'add':
      return (
        <div className="-mx-2 bg-success/10 px-2 text-success">
          <span className="mr-2 select-none">+</span>
          {line.text}
        </div>
      );
    case 'del':
      return (
        <div className="-mx-2 bg-destructive/10 px-2 text-destructive line-through decoration-destructive/50">
          <span className="mr-2 select-none">-</span>
          {line.text}
        </div>
      );
    case 'bold':
      return <div className="font-semibold text-foreground">{line.text}</div>;
    case 'dim':
      return <div className="text-muted-foreground">{line.text}</div>;
    case 'plain':
      return <div className="text-foreground/90">{line.text}</div>;
  }
}

interface StagePanelProps {
  stage: Stage;
  animate: boolean;
  className?: string;
}

function StagePanel({ stage, animate, className }: StagePanelProps): React.JSX.Element {
  return (
    <div className={cn('rounded-lg border border-border bg-card', className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[11px] text-muted-foreground">
        <span>{stage.panelTitle}</span>
        <span>
          {stage.verb.toLowerCase()} <span className="text-primary">●</span>
        </span>
      </div>
      <div className="whitespace-pre-wrap break-words px-4 py-3 font-mono text-[10.5px] leading-[1.6] sm:px-5 sm:py-4 sm:text-[13px] sm:leading-[1.65]">
        {stage.lines.map((line, index) => (
          <motion.div
            key={`${stage.id}-${index}`}
            initial={animate ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: animate ? 0.08 + index * 0.055 : 0 }}
          >
            <Line line={line} />
          </motion.div>
        ))}
        {stage.footnote ? (
          <motion.p
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: animate ? 0.7 : 0 }}
            className="mt-3 border-t border-dashed border-border pt-2.5 font-sans text-[11px] text-muted-foreground"
          >
            {stage.footnote}
          </motion.p>
        ) : null}
      </div>
    </div>
  );
}

function SectionIntro(): React.JSX.Element {
  return (
    <>
      <p className="label">
        <span className="text-primary">02</span> — The loop
      </p>
      <h2 id="pipeline-title" className="display-lg mt-4 max-w-3xl">
        Four steps from catalog to code review.
      </h2>
    </>
  );
}

/**
 * Scroll-pinned story: one sticky stage, one file token travelling a track,
 * one panel that changes with each stop. Falls back to a plain stacked list
 * when motion is reduced or the viewport is too short to pin.
 */
export function Pipeline(): React.JSX.Element {
  const reduce = usePrefersReducedMotion();
  // Tall enough to pin a full stage without clipping.
  const tall = useMediaQuery('(min-height: 640px)', true);
  return !reduce && tall ? <PinnedPipeline /> : <StaticPipeline />;
}

function StaticPipeline(): React.JSX.Element {
  return (
    <section
      aria-labelledby="pipeline-title"
      className="border-b border-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro />
        <ol className="mt-12 space-y-12">
          {STAGES.map((s, index) => (
            <li key={s.id} className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs text-primary">
                  0{index + 1} {s.verb}
                </p>
                <h3 className="display-md mt-2">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
              <StagePanel stage={s} animate={false} className="lg:col-span-8" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PinnedPipeline(): React.JSX.Element {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Dwell on each stop, travel between them.
  const travel = useTransform(
    scrollYProgress,
    [0, 0.16, 0.3, 0.42, 0.56, 0.68, 0.82, 1],
    [0, 0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1, 1]
  );
  const tokenLeft = useTransform(travel, (v) => `${v * 100}%`);
  // Slide the chip across its own width so it never overhangs either end.
  const tokenShift = useTransform(travel, (v) => `${-v * 100}%`);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = latest < 0.23 ? 0 : latest < 0.49 ? 1 : latest < 0.75 ? 2 : 3;
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const stage = STAGES[activeIndex] ?? (STAGES[0] as Stage);

  return (
    <section aria-labelledby="pipeline-title" className="border-b border-border">
      <div ref={trackRef} className="relative h-[420vh]">
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden pb-5 pt-16 lg:justify-center lg:py-6">
          <div className="mx-auto flex w-full max-w-7xl flex-col px-4 max-lg:min-h-0 max-lg:flex-1 sm:px-6">
            <div className="max-lg:[&_h2]:mt-1.5 max-lg:[&_h2]:text-[1.4rem] max-sm:[&_h2]:text-[1.08rem] max-sm:[&_h2]:tracking-[-0.03em]">
              <SectionIntro />
            </div>

            <ol className="sr-only">
              {STAGES.map((s) => (
                <li key={s.id}>
                  {s.verb}: {s.title} {s.body}
                </li>
              ))}
            </ol>

            <div
              aria-hidden="true"
              className="mt-4 flex flex-col gap-x-10 gap-y-4 max-lg:min-h-0 max-lg:flex-1 sm:mt-10 lg:grid lg:grid-cols-12"
            >
              {/* Narration */}
              <div className="lg:col-span-4">
                <ol className="flex gap-4 font-mono text-[11px] sm:text-xs lg:flex-col lg:gap-0">
                  {STAGES.map((s, index) => {
                    const state =
                      index === activeIndex ? 'active' : index < activeIndex ? 'done' : 'todo';
                    return (
                      <li
                        key={s.id}
                        className={cn(
                          'flex items-center gap-2 transition-colors duration-300 lg:border-t lg:border-border lg:py-3',
                          state === 'active'
                            ? 'text-foreground'
                            : state === 'done'
                              ? 'text-muted-foreground'
                              : 'text-muted-foreground/60'
                        )}
                      >
                        <span className={state === 'active' ? 'text-primary' : undefined}>
                          0{index + 1}
                        </span>
                        <span className={cn(state !== 'active' && 'max-sm:hidden')}>{s.verb}</span>
                        {state === 'active' ? (
                          <motion.span
                            layoutId="pipeline-marker"
                            className="ml-auto hidden h-px w-10 bg-primary lg:block"
                          />
                        ) : null}
                      </li>
                    );
                  })}
                </ol>

                <div className="relative mt-3 min-h-[92px] sm:min-h-[120px] lg:mt-8 lg:min-h-[190px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="display-md max-sm:text-[1.3rem]">{stage.title}</h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground sm:mt-3">
                        {stage.body}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Stage */}
              <div className="flex min-w-0 flex-col max-lg:min-h-0 max-lg:flex-1 lg:col-span-8">
                {/* Track */}
                <div className="px-3">
                  <div className="relative h-12">
                    <div className="absolute inset-x-0 top-8 h-px bg-border" />
                    <motion.div
                      className="absolute inset-x-0 top-8 h-px origin-left bg-primary"
                      style={{ scaleX: travel }}
                    />
                    {STAGES.map((s, index) => (
                      <span
                        key={s.id}
                        className={cn(
                          'absolute top-8 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-300',
                          index <= activeIndex
                            ? 'border-primary bg-primary'
                            : 'border-border bg-background'
                        )}
                        style={{ left: `${(index / LAST) * 100}%` }}
                      />
                    ))}
                    <motion.div
                      className="absolute top-0"
                      style={{ left: tokenLeft, x: tokenShift }}
                    >
                      <div className="flex items-center gap-1 rounded-[4px] border border-primary bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground shadow-[0_0_24px_-4px_hsl(var(--primary)/0.6)]">
                        <FileText className="size-3 text-primary" />
                        SKILL.md
                      </div>
                    </motion.div>
                  </div>
                  <div className="relative mt-2 h-4 font-mono text-[10px] text-muted-foreground sm:text-[11px]">
                    {STAGES.map((s, index) => (
                      <span
                        key={s.id}
                        className={cn(
                          'absolute whitespace-nowrap transition-colors duration-300',
                          index === 0
                            ? '-left-3'
                            : index === LAST
                              ? '-right-3'
                              : '-translate-x-1/2',
                          index === activeIndex && 'text-foreground'
                        )}
                        style={
                          index === 0 || index === LAST
                            ? undefined
                            : { left: `${(index / LAST) * 100}%` }
                        }
                      >
                        {s.stop}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Panel: fixed height, content swaps in place. */}
                <div className="relative mt-4 min-h-0 flex-1 lg:h-[310px] lg:flex-none">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={stage.id}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.22 }}
                    >
                      <StagePanel stage={stage} animate className="h-full overflow-hidden" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
