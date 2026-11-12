'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { CheckCheck, GitPullRequest } from 'lucide-react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Field labels match `template/services/github-event-message.js`. */
const MESSAGE_LINES: string[] = [
  'Reviewer: you',
  'Author: imRahul05',
  'Repo: rhl-ai',
  'Branch: feat/skill-update',
];

/** A webhook becomes a WhatsApp message. Plays once when scrolled into view. */
export function NotifierDemo(): React.JSX.Element {
  return (
    <motion.div
      aria-hidden="true"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
      className="flex flex-col font-mono text-[11px]"
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: 8 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex items-center gap-2 self-start rounded-md border border-border bg-background px-2.5 py-1.5 text-muted-foreground"
      >
        <GitPullRequest className="size-3.5 text-foreground" />
        <span>
          POST /webhook <span className="text-foreground">pull_request.review_requested</span>
        </span>
      </motion.div>

      <div className="relative ml-5 h-9 w-px bg-border">
        <motion.span
          variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1 } }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeInOut' }}
          className="absolute inset-0 origin-top bg-primary"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] text-muted-foreground">
          Twilio
        </span>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.9, y: 6 },
          shown: { opacity: 1, scale: 1, y: 0 },
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.85 }}
        className="max-w-[260px] origin-top-left self-start rounded-lg rounded-tl-none border border-border bg-muted px-3 py-2.5 font-sans text-xs leading-relaxed text-foreground"
      >
        <p className="font-semibold">PR Review Requested</p>
        {MESSAGE_LINES.map((line) => (
          <p key={line} className="text-muted-foreground">
            {line}
          </p>
        ))}
        <p className="mt-1 flex items-center justify-end gap-1 font-mono text-[10px] text-muted-foreground">
          WhatsApp
          <motion.span
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
            transition={{ delay: 1.5 }}
          >
            <CheckCheck className="size-3.5 text-primary" />
          </motion.span>
        </p>
      </motion.div>
    </motion.div>
  );
}
