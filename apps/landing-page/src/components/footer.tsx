'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function Footer(): React.JSX.Element {
  const currentYear = React.useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="border-t border-border bg-background py-14 text-sm text-muted-foreground transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-semibold text-foreground tracking-tight text-base block mb-2"
            >
              RHL AI
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Engineering infrastructure for AI-assisted development. Reusable agent skills, developer tooling, and production workflows.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-foreground mb-3 font-semibold">
              Products
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/products/rhl-cli"
                  className="hover:text-foreground transition-colors"
                >
                  RHL CLI
                </Link>
              </li>
              <li>
                <Link
                  href="/products/skills"
                  className="hover:text-foreground transition-colors"
                >
                  Skills System
                </Link>
              </li>
              <li>
                <Link
                  href="/products/whatsapp-bot"
                  className="hover:text-foreground transition-colors"
                >
                  WhatsApp Bot
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-foreground transition-colors font-medium text-foreground"
                >
                  All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Intelligence */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-foreground mb-3 font-semibold">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/skills"
                  className="hover:text-foreground transition-colors"
                >
                  Skills Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/skills/code-reviewer"
                  className="hover:text-foreground transition-colors"
                >
                  Code Reviewer
                </Link>
              </li>
              <li>
                <Link
                  href="/skills/frontend-performance"
                  className="hover:text-foreground transition-colors"
                >
                  Frontend Performance
                </Link>
              </li>
              <li>
                <Link
                  href="/directives"
                  className="hover:text-foreground transition-colors"
                >
                  Directives
                </Link>
              </li>
              <li>
                <Link
                  href="/architecture"
                  className="hover:text-foreground transition-colors"
                >
                  Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-foreground mb-3 font-semibold">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/quickstart"
                  className="hover:text-foreground transition-colors"
                >
                  Quickstart Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About RHL AI
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/imRahul05/rhl-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.npmjs.com/package/create-github-whatsapp-notifier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                >
                  <span>npm: whatsapp-notifier</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
          <p>© {currentYear} RHL AI. MIT Permissive License.</p>
          <p className="font-mono text-[11px]">
            Maintained by{' '}
            <Link
              href="https://github.com/imRahul05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              Rahul Kumar (@imRahul05)
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
