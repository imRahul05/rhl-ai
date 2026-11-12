import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    title: 'Products',
    links: [
      { label: 'RHL CLI', href: '/products/rhl-cli' },
      { label: 'Skills System', href: '/products/skills' },
      { label: 'WhatsApp Bot', href: '/products/whatsapp-bot' },
      { label: 'All products', href: '/products' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { label: 'Skills Catalog', href: '/skills' },
      { label: 'Code Reviewer', href: '/skills/code-reviewer' },
      { label: 'Frontend Performance', href: '/skills/frontend-performance-engineer' },
      { label: 'Directives', href: '/directives' },
      { label: 'Architecture', href: '/architecture' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Quickstart Guide', href: '/quickstart' },
      { label: 'About RHL AI', href: '/about' },
      { label: 'GitHub Repository', href: 'https://github.com/imRahul05/rhl-ai', external: true },
      {
        label: 'npm: whatsapp-notifier',
        href: 'https://www.npmjs.com/package/create-github-whatsapp-notifier',
        external: true,
      },
    ],
  },
];

export function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background text-sm text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pb-14 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
              RHL AI
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Agent skills, a CLI and automation that are designed to work together. Open source,
              MIT licensed.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="md:col-span-2 md:last:col-span-3"
            >
              <h2 className="label">{column.title}</h2>
              <ul className="mt-4 space-y-2.5 text-[13px]">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="link-line inline-flex items-center gap-1 pb-0.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                      {link.external ? (
                        <ArrowUpRight className="size-3 opacity-60" aria-hidden="true" />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-border py-5 font-mono text-[11px] sm:flex-row sm:items-center">
          <p>© {currentYear} RHL AI. MIT License.</p>
          <p>
            Maintained by{' '}
            <Link
              href="https://github.com/imRahul05"
              target="_blank"
              rel="noopener noreferrer"
              className="link-line pb-0.5 text-foreground"
            >
              Rahul Kumar (@imRahul05)
            </Link>
          </p>
        </div>
      </div>

      {/* Wordmark, cropped by the page edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none pb-[0.1em] whitespace-nowrap text-center font-pixel text-[clamp(4.5rem,24vw,22rem)] leading-[0.82] tracking-[-0.02em] text-foreground/[0.07]"
      >
        rhl<span className="text-primary">_</span>ai
      </div>
    </footer>
  );
}
