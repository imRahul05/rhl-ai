/**
 * Vela — native macOS Notch companion & opt-in plugin hub for AI coding workflows.
 * Single source of truth for /products, /products/vela, site.ts and /llms*.txt.
 */

export const VELA = {
  name: 'Vela',
  tagline: 'Your MacBook notch, upgraded for AI workflows.',
  summary:
    'A ~1.5 MB native Swift 6 notch companion for macOS. Auto-connects to Claude Code, Antigravity, Codex and custom adapters, launches any installed browser, runs on-device Apple Intelligence, and expands with opt-in plugins you can install or remove in one click.',
  repo: 'https://github.com/imRahul05/rhl-ai',
  download: 'https://github.com/imRahul05/rhl-ai/releases',
  platform: 'macOS 26+ · Apple Silicon · Native Swift 6 & SwiftUI',
  shortcut: '⌃⌥Space',
} as const;

export interface VelaFeature {
  tag: string;
  title: string;
  body: string;
  ai: boolean;
}

export const VELA_FEATURES: VelaFeature[] = [
  {
    tag: 'Notch',
    title: 'Hardware-matched notch & multi-monitor support',
    body: 'Anchors flush around the MacBook Pro camera notch with left/right wings so nothing is ever cut off, never steals focus from your active tab, and switches to any external monitor in one click. Toggle from anywhere with ⌃⌥Space.',
    ai: false,
  },
  {
    tag: 'Adapters',
    title: 'Auto-connected AI agent alerts & multi-chat tracking',
    body: 'Automatically detects and hooks into Claude Code (warm orange bot), Antigravity App/CLI/IDE (blue bot), Codex, Cursor and terminal scripts. Tracks multiple concurrent chats independently and auto-registers any new tool via localhost:7878/event or a JSON manifest.',
    ai: false,
  },
  {
    tag: 'Browsers',
    title: 'Instant multi-browser launcher & URL router',
    body: 'Dynamically discovers every browser installed on your Mac (Chrome, Brave, DuckDuckGo, Safari, Arc and more). Jump to localhost:3000, search in any browser, or open agent preview URLs directly from the notch with zero permissions.',
    ai: false,
  },
  {
    tag: 'Power',
    title: 'Plug-in thunder border & percentage charge edge',
    body: 'Event-driven IOKit power monitoring (0% polling overhead) fires a contained 4.5-second electric bolt along the notch edge when you plug in, then shows a clean static charge progress line when expanded—turning off automatically at 100%.',
    ai: false,
  },
  {
    tag: 'On-Device AI',
    title: 'Optional Apple Intelligence (FoundationModels)',
    body: 'Condenses noisy agent logs into one-line notch alerts, interprets natural commands in the Ask bar ("open localhost:3000 in Brave"), and answers plain-English storage questions in the Cleaner—100% on-device with zero API cost, and deterministic fallbacks on Macs without it.',
    ai: true,
  },
];

export interface VelaPluginItem {
  id: string;
  tag: string;
  name: string;
  summary: string;
  highlights: string[];
}

export const VELA_PLUGINS: VelaPluginItem[] = [
  {
    id: 'vela-clipboard',
    tag: 'PLUGIN 01',
    name: 'Smart Clipboard',
    summary:
      'Privacy-first clipboard history inside the notch. Remembers which app each copy came from, pins snippets, copies as plain text, and searches text inside screenshots with on-device Apple Vision OCR.',
    highlights: [
      'Auto-skips 1Password, Bitwarden, Keychain & concealed pasteboard types',
      'On-device Apple Vision OCR search across copied screenshots',
      '0% CPU when uninstalled—one click to add or remove',
    ],
  },
  {
    id: 'vela-cleaner',
    tag: 'PLUGIN 02',
    name: 'Mac & Dev Cleaner',
    summary:
      'Finviz-style interactive Storage Heatmap covering both safe caches and personal folders (Desktop, Movies, Downloads, custom folders), with plain-English safety notes and Vela’s own disk & RAM footprint.',
    highlights: [
      'Proportional color-coded treemap (green = safe cache, red = 2 GB+ folders)',
      'Everything moves safely to macOS Trash—never hard-deleted',
      'Interactive on-device Q&A + native macOS Dictation mic button',
    ],
  },
  {
    id: 'vela-phone',
    tag: 'PLUGIN 03',
    name: 'Phone Companion',
    summary:
      'Instant local Wi-Fi mobile dashboard via QR code (live agent status + Smart Clipboard mirror) plus $0 5G alerts via ntfy.sh, Telegram Bot, Tailscale, or an E2E AES-256-GCM encrypted Vercel web companion.',
    highlights: [
      'AES-256-GCM encryption via Apple CryptoKit; decryption key stays in #fragment',
      'Zero infrastructure cost—use shared hosted relay or deploy your own on Vercel',
      'Optional Away Mode forwards to phone only when you step away from your Mac',
    ],
  },
];

export const VELA_INSTALL: string[] = [
  'Download Vela.dmg (~1.5 MB) and drag Vela.app into Applications.',
  'Launch Vela—it sits quietly around your MacBook notch and menubar (no Dock clutter).',
  'Vela auto-detects Claude Code & Antigravity and connects hooks non-destructively while preserving your existing settings.',
  'Press ⌃⌥Space anytime to open the hub, or enable Smart Clipboard, Cleaner, and Phone Companion from Menubar ✦ → Plugins.',
];
