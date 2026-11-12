'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CopyCommandProps {
  command: string;
  className?: string;
  size?: 'default' | 'lg';
}

/** A shell one-liner that copies itself. The whole chip is the button. */
export function CopyCommand({
  command,
  className,
  size = 'default',
}: CopyCommandProps): React.JSX.Element {
  const [copied, setCopied] = React.useState<boolean>(false);
  const timer = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  function handleCopy(): void {
    void navigator.clipboard?.writeText(command).catch(() => undefined);
    setCopied(true);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'group inline-flex max-w-full items-center gap-3 rounded-md border border-border bg-card text-left font-mono text-foreground transition-colors hover:border-foreground/40',
        size === 'lg' ? 'px-4 py-3.5 text-sm sm:px-5 sm:text-base' : 'px-3.5 py-2.5 text-[13px]',
        className
      )}
    >
      <span aria-hidden="true" className="select-none text-primary">
        $
      </span>
      <span className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap [scrollbar-width:none]">
        {command}
      </span>
      <span className="relative grid size-4 shrink-0 place-items-center text-muted-foreground group-hover:text-foreground">
        <AnimatePresence mode="popLayout" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 26 }}
              className="text-success"
            >
              <Check className="size-4" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 26 }}
            >
              <Copy className="size-4" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : 'Copy command'}
      </span>
    </button>
  );
}
