import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowUpRight,
  ChevronRight,
  Download,
  Lock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { IsoVela } from '@/components/home/iso-vela';
import { Reveal } from '@/components/motion/reveal';
import { Spotlight } from '@/components/motion/spotlight';
import { VELA, VELA_FEATURES, VELA_INSTALL, VELA_PLUGINS } from '@/content/vela';

export const metadata: Metadata = {
  title: 'Vela — native macOS notch companion & plugin hub · RHL AI',
  description: VELA.summary,
};

const FACTS: { value: string; label: string }[] = [
  { value: '~1.5 MB', label: 'native Swift 6 DMG download' },
  { value: '0%', label: 'idle CPU & zero Electron bloat' },
  { value: '3', label: 'opt-in plugins (install or remove)' },
  { value: '100%', label: 'local-first & AES-256 encrypted' },
];

const PRIVACY: string[] = [
  'The local event server binds strictly to 127.0.0.1:7878—no external traffic unless you explicitly enable 5G Phone Companion.',
  'Smart Clipboard automatically ignores 1Password, Bitwarden, Keychain Access and concealed pasteboard types so passwords are never stored.',
  'Mac & Dev Cleaner never hard-deletes anything: every cleaned file moves safely to macOS Trash and remains 100% recoverable.',
  '5G Vercel Cloud Sync encrypts payloads locally with Apple CryptoKit (AES-256-GCM); the decryption key lives only in your phone’s URL #fragment.',
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

export default function VelaPage(): React.JSX.Element {
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
              <span className="text-foreground">Vela</span>
            </nav>
            <p className="label">macOS notch app · native Swift 6 · opt-in plugins</p>
            <h1 className="display-lg mt-4">
              {VELA.name}. <span className="text-muted-foreground">{VELA.tagline}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {VELA.summary}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={VELA.download}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <Download className="size-4" aria-hidden="true" />
                Download Vela.dmg — free
              </a>
              <ExternalLink href={VELA.repo}>Source on GitHub</ExternalLink>
            </div>
            <p className="mt-5 font-mono text-[11px] text-muted-foreground">
              {VELA.platform} · Global shortcut {VELA.shortcut} · Auto-hooks Claude Code &amp;
              Antigravity.
            </p>
          </div>
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <IsoVela />
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

      {/* Section 01: Asymmetric Visual Showcase */}
      <section aria-labelledby="surfaces-title" className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="label">
              <span className="text-primary">01</span> — Three surfaces, zero clutter
            </p>
            <h2 id="surfaces-title" className="display-md mt-4 max-w-2xl">
              Ambient in the notch, detailed when you need space.
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left tall asymmetric card: Live Notch Hub */}
            <Reveal className="lg:col-span-5">
              <Spotlight className="flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
                    Notch Hub · {VELA.shortcut}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                    Live bot doodle &amp; multi-chat counter
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    While Claude Code or Antigravity runs in another tab, Vela animates in your
                    notch wing—orange for Claude, blue for Antigravity, green for Codex—and expands
                    smoothly when work finishes.
                  </p>
                </div>

                {/* Stylized Notch Preview */}
                <div className="mt-6 rounded-xl border border-border bg-[#07090d] p-4 text-slate-100">
                  <div className="mx-auto flex max-w-[270px] items-center justify-between rounded-b-2xl border border-t-0 border-white/15 bg-black px-3.5 py-2">
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex h-3.5 w-6 items-center justify-center gap-1 rounded border border-sky-400/70 bg-sky-400/15">
                        <span className="h-1.5 w-1 rounded-full bg-sky-400" />
                        <span className="h-1.5 w-1 rounded-full bg-sky-400" />
                      </span>
                      <span className="font-mono text-[11px] text-white/90">Vela</span>
                    </span>
                    <span className="font-mono text-[10px] text-sky-300">2 Run</span>
                  </div>
                  <div className="mt-4 space-y-2 font-mono text-[11px]">
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                      <span className="text-orange-400">Claude Code</span>
                      <span className="text-emerald-400">24 tests passed</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                      <span className="text-sky-400">Antigravity</span>
                      <span className="text-amber-300">Needs approval</span>
                    </div>
                  </div>
                </div>
              </Spotlight>
            </Reveal>

            {/* Right stacked asymmetric cards: Storage Heatmap + E2E 5G Companion */}
            <div className="grid grid-cols-1 gap-6 lg:col-span-7">
              <Reveal delay={0.06}>
                <Spotlight className="rounded-lg border border-border bg-card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
                      Opt-In Cleaner · Finviz-Style Treemap
                    </p>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      Vela footprint: ~1.5 MB
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                    See your whole Mac as a color-coded storage heatmap
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Green blocks are safe-to-clean caches; red &amp; amber blocks surface large
                    personal folders like Movies or Desktop. Click any block to inspect files, ask
                    Vela in plain English, or move selected items safely to Trash.
                  </p>
                  <div className="mt-5 grid grid-cols-12 gap-1.5 font-mono text-[10px] text-white">
                    <div className="col-span-5 rounded-md border border-rose-400/40 bg-rose-700/75 p-3">
                      <div className="font-medium">Movies</div>
                      <div className="mt-1 text-xs font-semibold">14.2 GB</div>
                    </div>
                    <div className="col-span-4 rounded-md border border-emerald-400/40 bg-emerald-700/75 p-3">
                      <div className="font-medium">App Caches</div>
                      <div className="mt-1 text-xs font-semibold">4.1 GB · Safe</div>
                    </div>
                    <div className="col-span-3 grid gap-1.5">
                      <div className="rounded-md border border-amber-400/40 bg-amber-700/75 px-2.5 py-2">
                        <div>Desktop · 1.8 GB</div>
                      </div>
                      <div className="rounded-md border border-emerald-400/40 bg-emerald-800/75 px-2.5 py-2">
                        <div>npm · 840 MB</div>
                      </div>
                    </div>
                  </div>
                </Spotlight>
              </Reveal>

              <Reveal delay={0.1}>
                <Spotlight className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
                      Opt-In Phone Companion · $0 Infrastructure
                    </p>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-500">
                      <Lock className="size-3" aria-hidden="true" />
                      AES-256-GCM
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                    Local Wi-Fi QR dashboard + encrypted 5G push alerts
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Scan once on Wi-Fi to mirror live agent status and Smart Clipboard on your
                    phone, or enable free 5G alerts via Telegram, ntfy.sh, Tailscale, or a dynamic
                    multi-user Vercel relay where your AES-256 key never leaves your phone.
                  </p>
                </Spotlight>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Core Capabilities */}
      <section aria-labelledby="features-title" className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-10 px-4 sm:px-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label">
              <span className="text-primary">02</span> — Core macOS app
            </p>
            <h2 id="features-title" className="display-md mt-4">
              Native Swift first. Zero Electron bloat.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Built strictly with Apple system frameworks (SwiftUI, AppKit, Network, IOKit,
              CryptoKit, Vision, FoundationModels). Works cleanly on Macs with or without Apple
              Intelligence.
            </p>
          </Reveal>
          <ol className="lg:col-span-8">
            {VELA_FEATURES.map((feature, index) => (
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
                    {feature.ai ? ' · optional AI' : ' · native Swift'}
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

      {/* Section 03: Opt-In Plugin Ecosystem */}
      <section aria-labelledby="plugins-title" className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="label">
              <span className="text-primary">03</span> — Opt-in plugin ecosystem
            </p>
            <h2 id="plugins-title" className="display-md mt-4 max-w-2xl">
              Install only what you use. Remove anytime.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Every plugin is demand-based. Uninstalled plugins render no tabs, run zero background
              watchers, and leave Vela as a pure, minimal AI notch companion.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {VELA_PLUGINS.map((plugin, idx) => (
              <Reveal key={plugin.id} delay={idx * 0.06}>
                <Spotlight className="flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
                        {plugin.tag}
                      </span>
                      <Sparkles className="size-4 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                      {plugin.name}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {plugin.summary}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-2 border-t border-border pt-4 text-xs text-foreground/85">
                    {plugin.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="font-bold text-primary">―</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04: Install & Privacy */}
      <section aria-labelledby="install-title" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-14 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="label">
              <span className="text-primary">04</span> — Zero-config install
            </p>
            <h2 id="install-title" className="display-md mt-4">
              Drag to Applications. Done.
            </h2>
            <ol className="mt-8 space-y-4">
              {VELA_INSTALL.map((step, index) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-x-3 text-sm">
                  <span className="font-mono text-xs text-primary">0{index + 1}</span>
                  <span className="leading-relaxed text-foreground/90">{step}</span>
                </li>
              ))}
            </ol>
            <a
              href={VELA.download}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Download className="size-4" aria-hidden="true" />
              Vela.dmg
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="label">
              <span className="text-primary">05</span> — Privacy &amp; safety
            </p>
            <h2 className="display-md mt-4">Local-first by architecture.</h2>
            <ul className="mt-8 space-y-4">
              {PRIVACY.map((point) => (
                <li key={point} className="grid grid-cols-[1.5rem_1fr] gap-x-3 text-sm">
                  <ShieldCheck className="mt-0.5 size-4 text-success" aria-hidden="true" />
                  <span className="leading-relaxed text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
