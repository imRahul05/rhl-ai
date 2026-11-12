'use client';

import * as React from 'react';
import { useInView } from 'motion/react';
import { usePrefersReducedMotion } from '@/components/motion/use-media-query';

export interface ScrambleNumberProps {
  value: number;
  /** Zero-pad to this many digits. */
  pad?: number;
  /** Seconds before the scramble starts. */
  delay?: number;
}

/**
 * Digits flicker like a terminal counter, then lock to the real value.
 * Server-renders the final value, so it is correct without JS.
 */
export function ScrambleNumber({
  value,
  pad = 2,
  delay = 0,
}: ScrambleNumberProps): React.JSX.Element {
  const final = String(value).padStart(pad, '0');
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = usePrefersReducedMotion();
  const [display, setDisplay] = React.useState<string>(final);

  React.useEffect(() => {
    if (!inView || reduce) return undefined;
    let ticks = 0;
    let interval = 0;
    const startTimer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        ticks += 1;
        if (ticks > 14) {
          window.clearInterval(interval);
          setDisplay(final);
          return;
        }
        // Lock digits left to right as the scramble runs out.
        const locked = Math.floor((ticks / 14) * final.length);
        setDisplay(
          final
            .split('')
            .map((d, i) => (i < locked ? d : String((ticks * 7 + i * 3) % 10)))
            .join('')
        );
      }, 45);
    }, delay * 1000);
    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(interval);
    };
  }, [inView, reduce, final, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
