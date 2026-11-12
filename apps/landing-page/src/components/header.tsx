'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import { siGithub } from 'simple-icons';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Products', href: '/products' },
  { label: 'Skills', href: '/skills' },
  { label: 'Directives', href: '/directives' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Quickstart', href: '/quickstart' },
];

const GITHUB_URL = 'https://github.com/imRahul05/rhl-ai';

export function Header(): React.JSX.Element {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [isHidden, setIsHidden] = React.useState<boolean>(false);
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const { scrollY } = useScroll();

  // Hide on scroll down, return on scroll up. State flips only at thresholds.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(latest > 12);
    if (latest < 120) {
      setIsHidden(false);
    } else if (latest > previous + 4) {
      setIsHidden(true);
    } else if (latest < previous - 4) {
      setIsHidden(false);
    }
  });

  React.useEffect(() => {
    if (!isMenuOpen) return undefined;
    function onKey(event: KeyboardEvent): void {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const activeHref =
    NAV_ITEMS.find((item) => pathname?.startsWith(item.href))?.href ?? null;
  const pillHref = hovered ?? activeHref;
  const visible = !isHidden || isMenuOpen;

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-[background-color,border-color] duration-300',
        isScrolled || isMenuOpen
          ? 'border-border bg-background/85 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      )}
      initial={false}
      animate={{ y: visible ? 0 : '-100%' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onFocusCapture={() => setIsHidden(false)}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-7">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="RHL AI home">
            <span
              aria-hidden="true"
              className="grid size-6 place-items-center rounded-[4px] bg-foreground font-pixel text-[13px] leading-none text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
            >
              &gt;_
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              RHL AI
            </span>
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
              v0.1.0
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center md:flex"
            onPointerLeave={() => setHovered(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === activeHref;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onPointerEnter={() => setHovered(item.href)}
                  onFocus={() => setHovered(item.href)}
                  onBlur={() => setHovered(null)}
                  className={cn(
                    'relative rounded-md px-3 py-1.5 text-[13px] transition-colors',
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {pillHref === item.href ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-muted"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="grid place-items-center"
              >
                {theme === 'dark' ? (
                  <Sun className="size-4" aria-hidden="true" />
                ) : (
                  <Moon className="size-4" aria-hidden="true" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>

          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RHL AI on GitHub"
            className="hidden size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:grid"
          >
            <svg viewBox="0 0 24 24" className="size-[18px] fill-current" aria-hidden="true">
              <path d={siGithub.path} />
            </svg>
          </Link>

          <Link
            href="/quickstart"
            className="ml-1 hidden h-8 items-center rounded-md bg-foreground px-3 text-xs font-medium text-background transition-colors hover:bg-foreground/85 sm:inline-flex"
          >
            Get started
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            className="grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            {isMenuOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <nav aria-label="Mobile" className="px-4 pb-5 pt-2">
              <ul>
                {NAV_ITEMS.map((item, index) => {
                  const isActive = item.href === activeHref;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index + 0.05, duration: 0.3 }}
                      className="border-b border-border"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className="flex items-center justify-between py-3.5 text-lg font-medium tracking-tight text-foreground"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-[11px] text-muted-foreground">
                            0{index + 1}
                          </span>
                          {item.label}
                        </span>
                        {isActive ? (
                          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                        ) : null}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Link
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-md border border-border text-sm text-foreground"
                >
                  GitHub
                  <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
                </Link>
                <Link
                  href="/quickstart"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-foreground text-sm font-medium text-background"
                >
                  Get started
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
