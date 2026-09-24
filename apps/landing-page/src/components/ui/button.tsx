'use client';

import * as React from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-md font-medium text-sm transition-colors outline-none select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        outline:
          'border border-border bg-background hover:bg-muted text-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-muted hover:text-foreground text-muted-foreground',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        glass:
          'border border-border/80 bg-background/60 hover:bg-muted text-foreground backdrop-blur-md',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        xs: 'h-7 px-2.5 text-xs gap-1.5',
        sm: 'h-8 px-3 text-xs gap-1.5',
        lg: 'h-10 px-5 text-sm gap-2',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-xs': 'size-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
