'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export interface CommandMarqueeProps {
  commands: readonly string[];
  tags: readonly string[];
}

function Row({
  items,
  filledIndex,
}: {
  items: readonly string[];
  filledIndex: number;
}): React.JSX.Element {
  // Repeated so the row always overflows the viewport on both sides.
  const repeated = [...items, ...items, ...items];
  return (
    <div className="flex w-max items-center gap-x-8 whitespace-nowrap font-mono text-[clamp(1.75rem,5vw,4rem)] font-medium leading-none tracking-[-0.04em] sm:gap-x-12">
      {repeated.map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          <span
            className={index % items.length === filledIndex ? 'text-foreground' : 'text-outline'}
          >
            {item}
          </span>
          <span className="size-2 rounded-full bg-primary sm:size-2.5" />
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Two rows of real commands and skill tags that slide in opposite directions,
 * driven only by scroll position — nothing moves unless the reader does.
 */
export function CommandMarquee({ commands, tags }: CommandMarqueeProps): React.JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const xLeft = useTransform(scrollYProgress, [0, 1], ['-4%', '-30%']);
  const xRight = useTransform(scrollYProgress, [0, 1], ['-30%', '-4%']);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="space-y-4 overflow-hidden border-b border-border py-12 sm:space-y-6 sm:py-16"
    >
      <motion.div style={{ x: xLeft }} className="will-change-transform">
        <Row items={commands} filledIndex={1} />
      </motion.div>
      <motion.div style={{ x: xRight }} className="will-change-transform">
        <Row items={tags} filledIndex={0} />
      </motion.div>
    </div>
  );
}
