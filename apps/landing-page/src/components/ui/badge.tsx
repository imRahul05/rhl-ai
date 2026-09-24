'use client';

import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-md border font-mono font-medium whitespace-nowrap transition-colors select-none [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow-sm',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-border text-foreground bg-background',
        muted: 'border-transparent bg-muted text-muted-foreground',
        destructive: 'border-transparent bg-destructive/15 text-destructive border-destructive/30',
        indigo: 'border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
        cyan: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
        emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
        amber: 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400',
      },
      size: {
        default: 'px-2 py-0.5 text-xs',
        sm: 'px-1.5 py-0.2 text-[11px]',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends useRender.ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant = 'default',
  size = 'default',
  render,
  ...props
}: BadgeProps): React.JSX.Element {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: 'badge',
      variant,
      size,
    },
  });
}

export { Badge, badgeVariants };
