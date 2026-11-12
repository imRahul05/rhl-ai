'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

const SmoothScrollContext = React.createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useSmoothScroll(): SmoothScrollContextValue {
  return React.useContext(SmoothScrollContext);
}

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

function easeOutExpo(t: number): number {
  return Math.min(1, 1.001 - Math.pow(2, -10 * t));
}

/**
 * Lenis-backed smooth scrolling. Scroll position is deliberately NOT mirrored
 * into React state — scroll-linked visuals read motion values instead, so
 * scrolling never re-renders the tree.
 */
export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps): React.JSX.Element {
  const [lenisInstance, setLenisInstance] = React.useState<Lenis | null>(null);
  const pathname = usePathname();

  const scrollTo = React.useCallback(
    (target: string | HTMLElement, offset: number = -80): void => {
      if (lenisInstance) {
        lenisInstance.scrollTo(target, { offset, duration: 1.1, easing: easeOutExpo });
        return;
      }
      const el =
        typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'auto' });
      }
    },
    [lenisInstance]
  );

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return undefined;

    document.documentElement.classList.add('lenis', 'lenis-smooth');

    // Wheel and touch scrolling stay native. Smoothing the wheel (the previous
    // `smoothWheel: true, duration: 1.05`) made the page lag behind fast scrolls
    // and keep gliding for ~1s after the user stopped, which reads as "floaty".
    // Lenis is kept only for programmatic scrolls (anchor links, scrollTo).
    const lenis = new Lenis({
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: false,
      syncTouch: false,
      autoResize: true,
    });

    // Lenis is an external browser-only system; publish the instance once created.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenisInstance(lenis);

    let animationFrameId = 0;
    function onRaf(time: number): void {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(onRaf);
    }
    animationFrameId = requestAnimationFrame(onRaf);

    function handleAnchorClick(event: MouseEvent): void {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;

      const targetElement = document.querySelector<HTMLElement>(href);
      if (targetElement) {
        event.preventDefault();
        lenis.scrollTo(targetElement, { offset: -80, duration: 1.1, easing: easeOutExpo });
        window.history.pushState(null, '', href);
        targetElement.focus({ preventScroll: true });
      }
    }

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  // New route: drop any in-flight inertia so the page starts at the top.
  React.useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenisInstance]);

  const contextValue = React.useMemo<SmoothScrollContextValue>(
    () => ({ lenis: lenisInstance, scrollTo }),
    [lenisInstance, scrollTo]
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
