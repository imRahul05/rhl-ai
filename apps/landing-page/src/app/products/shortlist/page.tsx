import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight, Download, ShieldCheck } from 'lucide-react';
import { IsoMatch } from '@/components/home/iso-match';
import { Reveal } from '@/components/motion/reveal';
import { SHORTLIST, SHORTLIST_FEATURES, SHORTLIST_INSTALL } from '@/content/shortlist';

export const metadata: Metadata = {
  title: 'Shortlist — job match & resume tailor for Chrome · RHL AI',
  description: SHORTLIST.summary,
};

const FACTS: { value: string; label: string }[] = [
  { value: '0', label: 'servers, accounts or API keys' },
  { value: '~1.5 MB', label: 'extension download' },
  { value: '~250', label: 'skills with aliases in the matcher' },
  { value: '100%', label: 'of your data stays in the browser' },
];

const PRIVACY: string[] = [
  'Your resume, profile, history and drafts live in chrome.storage.local on your device, not synced anywhere.',
  'There is no Shortlist server. The extension makes no network requests of its own, except an optional GitHub import you start yourself.',
  'AI runs on-device through Chrome’s built-in Gemini Nano. Shortlist never sends your data to an AI service.',
  'Profile → Delete all my data (or uninstalling) removes everything.',
];

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
    >
      {children}
      <ArrowUpRight className="size-4 opacity-60" aria-hidden="true" />
    </a>
  );
}

export default function ShortlistPage(): React.JSX.Element {
  return (
    <main id="main" className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_40%,black,transparent_65%)]"
        >
          <div className="iso-grid size-full opacity-60" />
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-10 gap-y-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground"
            >
              <Link href="/" className="hover:text-foreground">
                RHL AI
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <Link href="/products" className="hover:text-foreground">
                Products
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <span className="text-foreground">Shortlist</span>
            </nav>
            <p className="label">Chrome extension · free · runs locally</p>
            <h1 className="display-lg mt-4">
              {SHORTLIST.name}. <span className="text-muted-foreground">{SHORTLIST.tagline}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {SHORTLIST.summary}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={SHORTLIST.download}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <Download className="size-4" aria-hidden="true" />
                Download for Chrome — free
              </a>
              <ExternalLink href={SHORTLIST.site}>Website</ExternalLink>
              <ExternalLink href={SHORTLIST.repo}>Source on GitHub</ExternalLink>
            </div>
            <p className="mt-5 font-mono text-[11px] text-muted-foreground">
              Works in {SHORTLIST.browsers}. LinkedIn, Indeed, Naukri, Greenhouse, Lever, Workday,
              Ashby and most careers pages.
            </p>
          </div>
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <IsoMatch />
          </div>
        </div>

        <dl className="relative mx-auto grid max-w-7xl grid-cols-2 border-t border-border px-4 sm:px-6 md:grid-cols-4">
          {FACTS.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col-reverse border-border py-5 max-md:[&:nth-child(-n+2)]:border-b md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-6"
            >
              <dt className="mt-2 text-xs text-muted-foreground">{fact.label}</dt>
              <dd className="font-pixel text-2xl leading-none text-foreground sm:text-3xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Screenshots */}
      <section aria-labelledby="see-title" className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="label">
              <span className="text-primary">01</span> — See it
            </p>
            <h2 id="see-title" className="display-md mt-4 max-w-2xl">
              Score the job, then tailor the resume in the same place.
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <figure className="overflow-hidden rounded-lg border border-border bg-card">
                <Image
                  src="/products/shortlist/match-panel.webp"
                  alt="Shortlist side panel on a Frontend Engineer job at Acme: a 100% strong match with 4 of 4 must-haves, per-area scores for skills, keywords and title, a Job in brief summary and the requirements list."
                  width={747}
                  height={1600}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="h-auto w-full"
                />
                <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
                  Match tab: the score, what it is made of, and the job in brief.
                </figcaption>
              </figure>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 lg:col-span-8">
              <Reveal delay={0.06}>
                <figure className="overflow-hidden rounded-lg border border-border bg-card">
                  <Image
                    src="/products/shortlist/tailor-steps.webp"
                    alt="Resume Studio before tailoring: 54% match, with steps worth points such as adding skills from your profile, ticking missing skills you have and working job keywords into bullets."
                    width={1600}
                    height={1176}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="h-auto w-full"
                  />
                  <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
                    Resume Studio, before: each fix shows the points it is worth.
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal delay={0.1}>
                <figure className="overflow-hidden rounded-lg border border-border bg-card">
                  <Image
                    src="/products/shortlist/studio.webp"
                    alt="Resume Studio after one-click tailoring in dark mode: 75% match, up 21 points from 54, with job keywords highlighted in the one-page resume preview."
                    width={1600}
                    height={1176}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="h-auto w-full"
                  />
                  <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
                    After Tailor automatically: 54 → 75, every change reviewable and undoable.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features-title" className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-10 px-4 sm:px-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label">
              <span className="text-primary">02</span> — What it does
            </p>
            <h2 id="features-title" className="display-md mt-4">
              Rule-based first. AI only where it helps.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Matching never uses AI, so scores are deterministic and explainable. Without Chrome’s
              built-in model, the AI buttons simply stay hidden.
            </p>
          </Reveal>
          <ol className="lg:col-span-8">
            {SHORTLIST_FEATURES.map((feature, index) => (
              <Reveal
                as="li"
                key={feature.tag}
                delay={index * 0.05}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-border py-6 last:border-b sm:grid-cols-[4rem_12rem_1fr] sm:gap-x-8"
              >
                <span className="font-pixel text-xl leading-none text-muted-foreground">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-primary">
                    {feature.tag}
                    {feature.ai ? ' · optional AI' : ' · no AI needed'}
                  </p>
                </div>
                <p className="col-start-2 mt-3 text-sm leading-relaxed text-muted-foreground sm:col-start-3 sm:mt-0">
                  {feature.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Install + privacy */}
      <section aria-labelledby="install-title" className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-14 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="label">
              <span className="text-primary">03</span> — Install in two minutes
            </p>
            <h2 id="install-title" className="display-md mt-4">
              Load it in Chrome.
            </h2>
            <ol className="mt-8 space-y-4">
              {SHORTLIST_INSTALL.map((step, index) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-x-3 text-sm">
                  <span className="font-mono text-xs text-primary">0{index + 1}</span>
                  <span className="leading-relaxed text-foreground/90">{step}</span>
                </li>
              ))}
            </ol>
            <a
              href={SHORTLIST.download}
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Download className="size-4" aria-hidden="true" />
              shortlist-extension.zip
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="label">
              <span className="text-primary">04</span> — Privacy
            </p>
            <h2 className="display-md mt-4">Your resume never leaves the browser.</h2>
            <ul className="mt-8 space-y-4">
              {PRIVACY.map((point) => (
                <li key={point} className="grid grid-cols-[1.5rem_1fr] gap-x-3 text-sm">
                  <ShieldCheck className="mt-0.5 size-4 text-success" aria-hidden="true" />
                  <span className="leading-relaxed text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
            <a
              href={SHORTLIST.privacy}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line mt-6 inline-flex items-center gap-1 pb-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Full privacy policy
              <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Licence */}
      <section aria-labelledby="license-title" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <p className="label">Licence</p>
            <h2 id="license-title" className="mt-3 text-xl font-semibold tracking-tight">
              Free to use · source-available ({SHORTLIST.license})
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {SHORTLIST.licenseNote} Unlike the rest of RHL AI (MIT), Shortlist lives in its own
              repository under its own licence.
            </p>
            <a
              href={SHORTLIST.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line mt-4 inline-flex items-center gap-1 pb-0.5 text-sm text-foreground"
            >
              Read the licence
              <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
