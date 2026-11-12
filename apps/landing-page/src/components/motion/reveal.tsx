'use client';

import * as React from 'react';
import { motion } from 'motion/react';

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  as?: 'div' | 'li' | 'section';
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fade-and-rise once the element scrolls into view. Transform/opacity only. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = 'div',
}: RevealProps): React.JSX.Element {
  const Component = motion[as];
  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}
