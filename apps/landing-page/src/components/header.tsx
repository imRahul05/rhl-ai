'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';
import { siGithub } from 'simple-icons';
import {
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

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

export function Header(): React.JSX.Element {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);

  function toggleMobileMenu(): void {
    setIsMobileMenuOpen((prev) => !prev);
  }

  function closeMobileMenu(): void {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-80"
          >
            <span className="font-semibold text-base tracking-tight text-foreground">
              RHL AI
            </span>
            <Badge variant="outline" size="sm" className="hidden sm:inline-flex text-[11px] font-mono">
              v0.1.0
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md transition-colors ${isActive
                    ? 'text-foreground font-medium bg-muted'
                    : 'hover:text-foreground hover:bg-muted/60'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* GitHub link */}
          <Link
            href="https://github.com/imRahul05/rhl-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
                aria-label="GitHub"
              >
                <path d={siGithub.path} />
              </svg>
              <span>GitHub</span>
            </Button>
          </Link>

          {/* Get Started CTA */}
          <Link href="/quickstart" className="hidden sm:inline-flex">
            <Button size="sm" className="text-xs">
              Get Started
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen ? (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${isActive
                  ? 'text-foreground font-medium bg-muted'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link
              href="https://github.com/imRahul05/rhl-ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              <Button variant="outline" size="sm" className="w-full justify-center gap-2">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                  aria-label="GitHub"
                >
                  <path d={siGithub.path} />
                </svg>
                View on GitHub
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </Button>
            </Link>
            <Link href="/quickstart" onClick={closeMobileMenu}>
              <Button size="sm" className="w-full justify-center">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
