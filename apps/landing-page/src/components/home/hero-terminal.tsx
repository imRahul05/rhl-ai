'use client';

import * as React from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { usePrefersReducedMotion } from '@/components/motion/use-media-query';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

type LineKind = 'info' | 'ok' | 'plain' | 'dim' | 'bold';

interface OutputLine {
  kind: LineKind;
  text: string;
}

interface Step {
  command: string;
  output: OutputLine[];
}

interface Session {
  id: string;
  label: string;
  steps: Step[];
}

/** Output is copied from the real `rhl` binary (paths shortened to `~`). */
const SESSIONS: Session[] = [
  {
    id: 'install',
    label: 'install',
    steps: [
      {
        command: 'npx @rhl-ai/cli skill install code-reviewer',
        output: [
          { kind: 'info', text: "Installing skill 'code-reviewer'..." },
          {
            kind: 'ok',
            text: "Skill 'code-reviewer' successfully installed to '~/.agents/skills/code-reviewer'.",
          },
        ],
      },
      {
        command: 'ls ~/.agents/skills/code-reviewer',
        output: [{ kind: 'plain', text: 'SKILL.md  examples/  references/  scripts/' }],
      },
    ],
  },
  {
    id: 'list',
    label: 'list',
    steps: [
      {
        command: 'npx @rhl-ai/cli skill list',
        output: [
          { kind: 'bold', text: 'Available AI Agent Skills (2):' },
          { kind: 'plain', text: '• code-reviewer v1.0.0 by RHL AI' },
          { kind: 'dim', text: '  Expert AI code reviewer for strict TypeScript,' },
          { kind: 'dim', text: '  architecture, and performance.' },
          { kind: 'plain', text: '• frontend-performance-engineer' },
          { kind: 'dim', text: '  Evidence-led frontend performance engineering skill.' },
        ],
      },
    ],
  },
  {
    id: 'validate',
    label: 'validate',
    steps: [
      {
        command: 'npx @rhl-ai/cli skill validate code-reviewer',
        output: [
          { kind: 'info', text: "Validating skill 'code-reviewer' at skills/code-reviewer..." },
          { kind: 'ok', text: "Skill 'code-reviewer' is valid and ready for agents!" },
        ],
      },
    ],
  },
  {
    id: 'create',
    label: 'create',
    steps: [
      {
        command: 'npx @rhl-ai/cli create nextjs my-app',
        output: [
          { kind: 'info', text: "Scaffolding 'my-app' from template 'nextjs'..." },
          {
            kind: 'ok',
            text: "Project 'my-app' created successfully from template 'nextjs'.",
          },
          { kind: 'bold', text: 'Next steps:' },
          { kind: 'plain', text: '  cd my-app' },
          { kind: 'plain', text: '  pnpm install' },
          { kind: 'plain', text: '  pnpm dev' },
        ],
      },
    ],
  },
];

const FIRST_SESSION = SESSIONS[0] as Session;

/** A flat script: one "frame" per typed character and per output line. */
interface Frame {
  step: number;
  /** Characters of the command visible. */
  chars: number;
  /** Output lines visible. */
  lines: number;
  /** ms to wait before the next frame. */
  wait: number;
}

function buildFrames(session: Session): Frame[] {
  const frames: Frame[] = [];
  session.steps.forEach((step, stepIndex) => {
    for (let c = 0; c <= step.command.length; c += 1) {
      const ch = step.command[c - 1];
      // Slight rhythm: pause a touch longer after spaces, like a person typing.
      const wait = c === 0 ? 420 : ch === ' ' ? 78 : 26 + ((c * 7919) % 22);
      frames.push({ step: stepIndex, chars: c, lines: 0, wait });
    }
    step.output.forEach((_, lineIndex) => {
      frames.push({
        step: stepIndex,
        chars: step.command.length,
        lines: lineIndex + 1,
        wait: lineIndex === 0 ? 520 : 150,
      });
    });
  });
  return frames;
}

const HOLD_MS = 3400;

function lineClass(kind: LineKind): string {
  switch (kind) {
    case 'ok':
      return 'text-foreground';
    case 'bold':
      return 'text-foreground font-semibold';
    case 'dim':
      return 'text-muted-foreground';
    case 'info':
      return 'text-muted-foreground';
    case 'plain':
      return 'text-foreground/90';
  }
}

function LinePrefix({ kind }: { kind: LineKind }): React.JSX.Element | null {
  if (kind === 'ok') {
    return (
      <span aria-hidden="true" className="mr-2 text-success">
        ✔
      </span>
    );
  }
  if (kind === 'info') {
    return (
      <span aria-hidden="true" className="mr-2 text-primary">
        ℹ
      </span>
    );
  }
  return null;
}

export function HeroTerminal(): React.JSX.Element {
  const reduce = usePrefersReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.3 });

  const [sessionId, setSessionId] = React.useState<string>(FIRST_SESSION.id);
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const [isAuto, setIsAuto] = React.useState<boolean>(true);

  const session = SESSIONS.find((s) => s.id === sessionId) ?? FIRST_SESSION;
  const frames = React.useMemo<Frame[]>(() => buildFrames(session), [session]);
  const lastFrame = frames.length - 1;
  const frame = reduce
    ? (frames[lastFrame] as Frame)
    : (frames[Math.min(frameIndex, lastFrame)] as Frame);
  const isDone = reduce || frameIndex >= lastFrame;

  // The playhead: one timeout per frame, paused while off-screen.
  React.useEffect(() => {
    if (reduce || !inView) return undefined;
    if (frameIndex < lastFrame) {
      const id = window.setTimeout(
        () => setFrameIndex((i) => i + 1),
        (frames[frameIndex] as Frame).wait
      );
      return () => window.clearTimeout(id);
    }
    if (!isAuto) return undefined;
    const id = window.setTimeout(() => {
      const currentIndex = SESSIONS.findIndex((s) => s.id === sessionId);
      const next = SESSIONS[(currentIndex + 1) % SESSIONS.length] as Session;
      setSessionId(next.id);
      setFrameIndex(0);
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [frameIndex, frames, lastFrame, inView, isAuto, reduce, sessionId]);

  function selectSession(id: string): void {
    setIsAuto(false);
    setSessionId(id);
    setFrameIndex(0);
  }

  function replay(): void {
    setFrameIndex(0);
  }

  // Perspective: the window leans back at rest, squares up as you scroll past,
  // and follows a fine pointer by a couple of degrees.
  const { scrollY } = useScroll();
  const scrollTilt = useTransform(scrollY, [0, 520], [9, 0], { clamp: true });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 18 });
  const rotateX = useTransform<number, number>([scrollTilt, springY], ([tilt, py]) =>
    reduce ? 0 : (tilt ?? 0) - (py ?? 0) * 3
  );
  const rotateY = useTransform(springX, (px) => (reduce ? 0 : -5 + px * 4));

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>): void {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave(): void {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={rootRef}
      className="[perspective:1600px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformOrigin: '50% 100%' }}
        className="relative rounded-lg border border-border bg-card shadow-[0_40px_80px_-40px_rgb(0_0_0/0.55)] will-change-transform"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
          <div
            role="tablist"
            aria-label="CLI demos"
            className="flex min-w-0 items-center gap-0.5 overflow-x-auto [scrollbar-width:none]"
          >
            {SESSIONS.map((s) => {
              const selected = s.id === sessionId;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectSession(s.id)}
                  className={cn(
                    'relative rounded-[5px] px-2.5 py-1.5 font-mono text-[11px] transition-colors sm:text-xs',
                    selected
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="hero-terminal-tab"
                      className="absolute inset-0 rounded-[5px] bg-muted"
                      transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                    />
                  ) : null}
                  <span className="relative">{s.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
              zsh — rhl
            </span>
            <button
              type="button"
              onClick={replay}
              aria-label="Replay this demo"
              className="grid size-7 place-items-center rounded-[5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Screen. Fixed height: the stream never shifts layout. */}
        <div
          role="tabpanel"
          aria-label={`${session.label} demo`}
          className="h-[272px] overflow-hidden px-4 py-4 font-mono text-[11.5px] leading-[1.7] sm:h-[280px] sm:px-5 sm:text-[13px]"
        >
          {/* Screen readers get the finished transcript, not a character stream. */}
          <div className="sr-only">
            {session.steps.map((step) => (
              <p key={step.command}>
                {step.command}: {step.output.map((l) => l.text).join(' ')}
              </p>
            ))}
          </div>
          <div aria-hidden="true">
            {session.steps.map((step, stepIndex) => {
              if (stepIndex > frame.step) return null;
              const active = stepIndex === frame.step;
              const chars = active ? frame.chars : step.command.length;
              const lines = active ? frame.lines : step.output.length;
              const typing = active && lines === 0;
              return (
                <div key={step.command} className={stepIndex > 0 ? 'mt-3' : undefined}>
                  <div className="whitespace-pre-wrap break-words text-foreground">
                    <span className="mr-2 select-none text-primary">❯</span>
                    {step.command.slice(0, chars)}
                    {typing ? (
                      <span className="ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-primary" />
                    ) : null}
                  </div>
                  {step.output.slice(0, lines).map((line) => (
                    <motion.div
                      key={line.text}
                      initial={reduce ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22 }}
                      className={cn('whitespace-pre-wrap break-words', lineClass(line.kind))}
                    >
                      <LinePrefix kind={line.kind} />
                      {line.text}
                    </motion.div>
                  ))}
                </div>
              );
            })}
            {isDone ? (
              <div className="mt-3 text-foreground">
                <span className="mr-2 select-none text-primary">❯</span>
                <span className="inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] animate-caret bg-primary" />
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
