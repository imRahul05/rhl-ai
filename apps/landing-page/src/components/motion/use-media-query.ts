'use client';

import * as React from 'react';

/**
 * Hydration-safe media query. The server (and the hydrating render) always see
 * `serverValue`; the real value arrives right after, so markup never mismatches.
 */
export function useMediaQuery(query: string, serverValue: boolean): boolean {
  const subscribe = React.useCallback(
    (onChange: () => void): (() => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query]
  );
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)', false);
}
