'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { usePrefersReducedMotion } from '@/components/motion/use-media-query';
import { cn } from '@/lib/utils';

export interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees. 0 disables the 3D tilt. */
  tilt?: number;
}

/**
 * Cursor-follow spotlight border (CSS vars, no re-render) with an optional
 * spring-damped 3D tilt. Purely additive: content is fully usable without hover.
 */
export function Spotlight({
  children,
  className,
  tilt = 0,
}: SpotlightProps): React.JSX.Element {
  const reduce = usePrefersReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  function handleMove(event: React.PointerEvent<HTMLDivElement>): void {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    el.style.setProperty('--mx', `${px}px`);
    el.style.setProperty('--my', `${py}px`);
    if (tilt > 0 && !reduce && event.pointerType === 'mouse') {
      ry.set((px / rect.width - 0.5) * 2 * tilt);
      rx.set(-(py / rect.height - 0.5) * 2 * tilt);
    }
  }

  function handleLeave(): void {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      className={cn('spot', className)}
      style={tilt > 0 ? { rotateX: srx, rotateY: sry, transformPerspective: 1100 } : undefined}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
