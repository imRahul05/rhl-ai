'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { usePrefersReducedMotion } from '@/components/motion/use-media-query';

export interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** 0–1: how far the element follows the pointer. */
  strength?: number;
}

/** Pulls its child toward a fine pointer. Inert for touch and reduced motion. */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: MagneticProps): React.JSX.Element {
  const reduce = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 });

  function handleMove(event: React.PointerEvent<HTMLDivElement>): void {
    if (reduce || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handleLeave(): void {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
