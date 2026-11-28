'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface FaviconSpec {
  prefix: string;
  href: string;
  type: 'image/png' | 'image/svg+xml';
}

const DEFAULT_FAVICON: Omit<FaviconSpec, 'prefix'> = {
  href: '/rhl-icon.svg',
  type: 'image/svg+xml',
};

const PRODUCT_FAVICONS: readonly FaviconSpec[] = [
  { prefix: '/products/vela', href: '/products/vela/logo.png', type: 'image/png' },
  { prefix: '/products/shortlist', href: '/products/shortlist/icon.svg', type: 'image/svg+xml' },
];

function resolveFavicon(pathname: string): Omit<FaviconSpec, 'prefix'> {
  const match = PRODUCT_FAVICONS.find((entry) => pathname.startsWith(entry.prefix));
  return match ? { href: match.href, type: match.type } : DEFAULT_FAVICON;
}

/**
 * Dynamically swaps the browser tab favicon on client-side App Router transitions
 * so product pages (e.g. /products/vela, /products/shortlist) display their own brand mark
 * and automatically revert to the RHL AI favicon everywhere else.
 */
export function DynamicFavicon(): null {
  const pathname = usePathname();

  useEffect(() => {
    const target = resolveFavicon(pathname);
    const existingLinks = document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]');

    if (existingLinks.length === 0) {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = target.type;
      link.href = target.href;
      document.head.appendChild(link);
      return;
    }

    existingLinks.forEach((link) => {
      link.type = target.type;
      link.href = target.href;
    });
  }, [pathname]);

  return null;
}
