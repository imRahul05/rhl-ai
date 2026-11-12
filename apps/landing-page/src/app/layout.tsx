import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { GeistPixelSquare } from 'geist/font/pixel';
import './globals.css';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { MotionProvider } from '@/components/motion/motion-provider';
import { ScrollProgress } from '@/components/motion/scroll-progress';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'RHL AI — Agent skills, a CLI, and tooling that work together',
  description:
    'RHL AI packages engineering judgment as SKILL.md files, with a CLI that validates and installs them into ~/.agents/skills. Plus project templates and a GitHub → WhatsApp notifier.',
  keywords: [
    'RHL AI',
    'AI Skills',
    'Agent Skills',
    'Developer Tools',
    'CLI',
    'WhatsApp Bot',
    'Code Reviewer',
    'Frontend Performance',
    'TypeScript',
  ],
  authors: [{ name: 'Rahul Kumar', url: 'https://github.com/imRahul05' }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0e0d0c' },
    { media: '(prefers-color-scheme: light)', color: '#f5f3ee' },
  ],
};

/**
 * Applies the stored (or system) theme before first paint so the page never
 * flashes the wrong palette. Mirrors the logic in theme-provider.tsx.
 */
const THEME_BOOTSTRAP = `(function(){try{var t=localStorage.getItem('rhl-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}var c=document.documentElement.classList;c.toggle('dark',t==='dark');c.toggle('light',t==='light');}catch(e){}})();`;

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <ThemeProvider defaultTheme="dark">
          <MotionProvider>
            <SmoothScrollProvider>
              <ScrollProgress />
              <Header />
              {children}
              <Footer />
            </SmoothScrollProvider>
          </MotionProvider>
        </ThemeProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
