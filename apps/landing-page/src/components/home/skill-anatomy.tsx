'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { usePrefersReducedMotion } from '@/components/motion/use-media-query';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/reveal';

interface Layer {
  path: string;
  role: string;
  body: string;
  /** Real lines from skills/code-reviewer, shown on the plate. */
  sample: string[];
}

const LAYERS: Layer[] = [
  {
    path: 'SKILL.md',
    role: 'The contract',
    body: 'YAML frontmatter, a decision framework and step-by-step workflows. This is the file the agent actually reads.',
    sample: [
      '---',
      'name: code-reviewer',
      'version: 1.0.0',
      'tags: [code-review, typescript]',
      '---',
      '## Decision Framework',
      '1. Blocking (Must Fix)',
      '2. Non-Blocking (Should Fix)',
    ],
  },
  {
    path: 'references/',
    role: 'Depth on demand',
    body: 'Checklists and specifications the agent pulls in only when the task calls for them.',
    sample: [
      '# Code Review Checklist',
      '- [ ] No explicit or implicit `any`',
      '- [ ] Generics use type constraints',
      '- [ ] Discriminated unions for variants',
      '- [ ] Async calls wrapped in try/catch',
      '- [ ] Errors logged with context',
    ],
  },
  {
    path: 'examples/',
    role: 'What good looks like',
    body: 'Golden input and output samples that pin the expected result down, so reviews stay consistent.',
    sample: [
      '### Finding 1: Unsafe Type Assertion',
      'File: packages/scaffold/src/copier.ts:42',
      'Severity: Blocking (Must Fix)',
      '- const config = JSON.parse(raw) as any;',
      '+ const config = JSON.parse(raw) as ConfigData;',
    ],
  },
  {
    path: 'scripts/',
    role: 'Self-checks',
    body: 'Small shell scripts for local validation and automation. They travel with the skill.',
    sample: [
      '#!/usr/bin/env bash',
      'set -euo pipefail',
      'test -f "$DIR/../SKILL.md"',
      'test -d "$DIR/../references"',
      'echo "==> All skill assets present!"',
    ],
  },
];

interface PlateProps {
  layer: Layer;
  index: number;
  active: boolean;
  gap: MotionValue<number>;
}

function Plate({ layer, index, active, gap }: PlateProps): React.JSX.Element {
  const offset = (LAYERS.length - 1) / 2 - index;
  const lift = useMotionValue(0);
  React.useEffect(() => {
    lift.set(active ? 14 : 0);
  }, [active, lift]);
  const z = useTransform<number, number>(
    [gap, lift],
    ([g, l]) => offset * (g ?? 0) + (l ?? 0)
  );
  const smoothZ = useSpring(z, { stiffness: 160, damping: 22 });

  return (
    <motion.div
      style={{ z: smoothZ }}
      className={cn(
        'absolute inset-0 overflow-hidden rounded-md border bg-card shadow-[0_0_0_1px_hsl(var(--background))] transition-colors duration-300',
        active ? 'border-primary' : 'border-border'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between border-b px-3 py-1.5 font-mono text-[10px] transition-colors duration-300',
          active
            ? 'border-primary/50 bg-primary text-primary-foreground'
            : 'border-border text-muted-foreground'
        )}
      >
        <span>{layer.path}</span>
        <span>0{index + 1}</span>
      </div>
      <div className="space-y-[3px] px-3 py-2.5 font-mono text-[8.5px] leading-[1.45] text-muted-foreground sm:text-[10px] lg:text-[11.5px]">
        {layer.sample.map((line) => (
          <div key={line} className="truncate">
            {line}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * "A skill is a folder": an exploded isometric view built with CSS 3D
 * transforms. Scroll position pulls the four layers apart; a fine pointer
 * rotates the stack; the legend (hover, focus or tap) lifts a layer.
 */
export function SkillAnatomy(): React.JSX.Element {
  const reduce = usePrefersReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const [scrollActive, setScrollActive] = React.useState<number>(0);
  const [picked, setPicked] = React.useState<number | null>(null);
  const active = picked ?? scrollActive;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const scrollGap = useTransform(scrollYProgress, [0.1, 0.45], [10, 96], { clamp: true });
  const staticGap = useMotionValue(84);
  const gap = reduce ? staticGap : scrollGap;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.max(
      0,
      Math.min(LAYERS.length - 1, Math.floor(((latest - 0.32) / 0.36) * LAYERS.length))
    );
    setScrollActive((prev) => (prev === next ? prev : next));
  });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateZ = useSpring(useTransform(pointerX, [-0.5, 0.5], [-46, -30]), {
    stiffness: 90,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [62, 52]), {
    stiffness: 90,
    damping: 18,
  });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>): void {
    if (reduce || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave(): void {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="anatomy-title"
      className="relative overflow-hidden border-b border-border py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-6 px-4 sm:px-6 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="label">
              <span className="text-primary">01</span> — Anatomy
            </p>
            <h2 id="anatomy-title" className="display-lg mt-5">
              A skill is a folder, not a framework.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              No runtime, no SDK, nothing in your bundle. Four plain parts that any agent able to
              read a file can follow.
            </p>
          </Reveal>
        </div>

        <div className="order-last lg:order-none lg:col-span-5 lg:row-start-2">
          <ol className="border-t border-border lg:mt-4" onPointerLeave={() => setPicked(null)}>
            {LAYERS.map((layer, index) => {
              const isActive = index === active;
              return (
                <li key={layer.path} className="border-b border-border">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse') setPicked(index);
                    }}
                    onFocus={() => setPicked(index)}
                    onClick={() => setPicked(index)}
                    className="group grid w-full grid-cols-[2rem_1fr] gap-x-3 py-4 text-left"
                  >
                    <span
                      className={cn(
                        'pt-0.5 font-mono text-[11px] transition-colors',
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      0{index + 1}
                    </span>
                    <span>
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <span
                          className={cn(
                            'font-mono text-[15px] transition-colors',
                            isActive ? 'text-foreground' : 'text-muted-foreground'
                          )}
                        >
                          {layer.path}
                        </span>
                        <span className="text-xs text-muted-foreground">{layer.role}</span>
                      </span>
                      <span
                        className={cn(
                          'grid transition-[grid-template-rows,opacity] duration-500 ease-out',
                          isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-sm pt-2 text-sm leading-relaxed text-muted-foreground">
                            {layer.body}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* The stack. Decorative: the legend carries the same information as text. */}
        <div
          aria-hidden="true"
          className="relative flex h-[340px] items-center justify-center [perspective:1500px] sm:h-[460px] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:h-auto lg:min-h-[600px]"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="rules pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(closest-side,black,transparent)]" />
          <motion.div
            style={{ rotateX, rotateZ }}
            className="preserve-3d relative h-[150px] w-[220px] sm:h-[200px] sm:w-[300px] lg:h-[250px] lg:w-[380px]"
          >
            {LAYERS.map((layer, index) => (
              <Plate
                key={layer.path}
                layer={layer}
                index={index}
                active={index === active}
                gap={gap}
              />
            ))}
          </motion.div>
          <p className="label absolute bottom-0 right-0 hidden sm:block">
            skills/code-reviewer/
          </p>
        </div>
      </div>
    </section>
  );
}
