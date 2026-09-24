import type { Metadata } from 'next';
import './globals.css';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'RHL AI — Engineering Tools for AI-Assisted Development',
  description:
    'Reusable agent skills, developer tooling, automation, and production workflows — designed to work together.',
  keywords: [
    'RHL AI',
    'AI Skills',
    'Developer Tools',
    'CLI',
    'WhatsApp Bot',
    'Code Reviewer',
    'Frontend Performance',
    'TypeScript',
  ],
  authors: [{ name: 'Rahul Kumar', url: 'https://github.com/imRahul05' }],
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-indigo-500/20 selection:text-indigo-500">
        <ThemeProvider defaultTheme="dark">
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
