'use client';

import * as React from 'react';
import { MotionConfig } from 'motion/react';

export interface MotionProviderProps {
  children: React.ReactNode;
}

/** `reducedMotion="user"` makes every motion component honour the OS setting. */
export function MotionProvider({ children }: MotionProviderProps): React.JSX.Element {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
