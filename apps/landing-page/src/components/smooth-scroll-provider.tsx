'use client';

import * as React from 'react';
import Lenis from 'lenis';

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
  scrollProgress: number;
  scrollY: number;
}

const SmoothScrollContext = React.createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  scrollProgress: 0,
  scrollY: 0,
});

export function useSmoothScroll(): SmoothScrollContextValue {
  return React.useContext(SmoothScrollContext);
}

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps): React.JSX.Element {
  const [lenisInstance, setLenisInstance] = React.useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = React.useState<number>(0);
  const [scrollY, setScrollY] = React.useState<number>(0);

  const scrollTo = React.useCallback(
    (target: string | HTMLElement, offset: number = -80): void => {
      if (lenisInstance) {
        lenisInstance.scrollTo(target, {
          offset,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else if (typeof window !== 'undefined') {
        if (typeof target === 'string') {
          const el = document.querySelector(target);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        } else {
          const top = target.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    },
    [lenisInstance]
  );

  React.useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    // Add Lugano Living Lab Lenis classes to html element
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoResize: true,
    });

    setLenisInstance(lenis);

    let animationFrameId: number;

    function onRaf(time: number): void {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(onRaf);
    }

    animationFrameId = requestAnimationFrame(onRaf);

    // Track scroll progress and scrollY for sleek top reading bar and reactive components
    lenis.on('scroll', (e: { progress: number; scroll: number }) => {
      setScrollProgress(Math.min(100, Math.max(0, e.progress * 100)));
      setScrollY(e.scroll);
    });

    // Delegate smooth scrolling for all internal anchor links (e.g., #what-we-do, #products)
    function handleAnchorClick(event: MouseEvent): void {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;

      const targetElement = document.querySelector<HTMLElement>(href);
      if (targetElement) {
        event.preventDefault();
        lenis.scrollTo(targetElement, {
          offset: -80,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        window.history.pushState(null, '', href);
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

  const contextValue = React.useMemo<SmoothScrollContextValue>(
    () => ({
      lenis: lenisInstance,
      scrollTo,
      scrollProgress,
      scrollY,
    }),
    [lenisInstance, scrollTo, scrollProgress, scrollY]
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {/* Top Butter-Smooth Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none origin-left transition-transform ease-out will-change-transform"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
          background:
            'linear-gradient(90deg, #6366f1 0%, #06b6d4 50%, #3b82f6 100%)',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.7), 0 0 20px rgba(6, 182, 212, 0.4)',
        }}
        aria-hidden="true"
      />
      {children}
    </SmoothScrollContext.Provider>
  );
}
