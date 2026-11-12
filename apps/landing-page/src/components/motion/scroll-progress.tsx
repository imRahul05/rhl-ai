'use client';

import * as React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

/** Hairline reading-progress bar. Driven by a motion value: zero React renders per frame. */
export function ScrollProgress(): React.JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px origin-left bg-primary"
      style={{ scaleX }}
    />
  );
}
