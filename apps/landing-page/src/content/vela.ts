/**
 * Vela — native macOS Notch companion & opt-in plugin hub for AI coding workflows.
 * Single source of truth for /products, /products/vela, site.ts and /llms*.txt.
 */

export const VELA = {
  name: 'Vela',
  logo: '/products/vela/logo.png',
  tagline: 'Your MacBook notch, upgraded for AI workflows.',
  summary:
    'A ~1.5 MB native Swift 6 notch companion for macOS. Auto-connects to Claude Code, Antigravity & Codex CLI with 1-click Notch & Phone approvals, runs on-device Apple Intelligence, and expands with 7 opt-in plugins including an on-device Meeting Transcriber → Apple Notes.',
  repo: 'https://github.com/imRahul05/vela',
  download: 'https://github.com/imRahul05/vela/releases/latest/download/Vela.dmg',
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
    title: 'Hardware-matched notch, swipe gestures & Hide Notch toggle',
    body: 'Anchors flush around the MacBook Pro camera notch with left/right wings, supports two-finger trackpad swipe, ←/→ arrow keys, and ⌘1–⌘7 tab jumps, hides cleanly into the menu bar whenever you want, and switches to any external monitor in one click.',
    ai: false,
  },
  {
    tag: 'Adapters',
    title: 'Auto-connected Claude Code, Antigravity & Codex + 1-click approvals',
    body: 'Automatically hooks Claude Code (orange), Antigravity (blue), and OpenAI Codex CLI (green) with parallel live bot faces, live elapsed timers, token/cost badges, hover command previews, and instant Allow (⌘↩) / Deny (⌘⌫) approvals directly from the Notch or your phone.',
    ai: false,
  },
  {
    tag: 'Browsers',
    title: 'Instant multi-browser launcher & URL router',
    body: 'Dynamically discovers every browser installed on your Mac (Chrome, Brave, DuckDuckGo, Safari, Arc and more). Jump to localhost:3000, search in any browser, or open agent preview URLs directly from the notch with zero permissions.',
    ai: false,
  },
  {
    tag: 'Power & Updates',
    title: 'Plug-in thunder border, Launch at Login & GitHub update checks',
    body: 'Event-driven IOKit power monitoring fires a contained 4.5-second electric bolt along the notch edge when you plug in. Includes native macOS Launch at Login (SMAppService) and silent GitHub Release update checks.',
    ai: false,
  },
  {
    tag: 'On-Device AI',
    title: 'Optional Apple Intelligence (FoundationModels)',
    body: 'Condenses noisy agent logs into one-line notch alerts, interprets natural commands in the Ask bar ("open localhost:3000 in Brave"), and summarizes 1-hour+ meeting transcripts into structured Apple Notes—100% on-device with zero API cost.',
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
    id: 'vela-meetings',
    tag: 'PLUGIN 01',
    name: 'Meeting Transcriber → Apple Notes',
    summary:
      'Auto-detects Zoom, Google Meet, Microsoft Teams, FaceTime & Slack Huddles. Captures You (Mic) + Meeting (System Audio, works with AirPods) 100% on-device—no bot joins your call—and saves AI-summarized notes straight into Apple Notes.',
    highlights: [
      'Works with earphones/AirPods via ScreenCaptureKit + AVAudioEngine',
      'Built for 1-hour+ calls: 50s speech rotation, chunked AI summary & crash checkpoints',
      'Saves formatted notes to Apple Notes (Vela Meetings) + local Markdown backup',
    ],
  },
  {
    id: 'vela-clipboard',
    tag: 'PLUGIN 02',
    name: 'Smart Clipboard (Persistent + OCR)',
    summary:
      'Privacy-first clipboard history inside the notch that persists pinned and recent snippets across restarts and app updates, with source-app tracking and on-device Apple Vision OCR search across screenshots.',
    highlights: [
      'Auto-skips 1Password, Bitwarden, Keychain & concealed pasteboard types',
      'Persists pinned & recent history across restarts and version updates',
      'On-device Apple Vision OCR search across copied screenshots',
    ],
  },
  {
    id: 'vela-cleaner',
    tag: 'PLUGIN 03',
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
    tag: 'PLUGIN 04',
    name: 'Phone Companion + Remote Approvals',
    summary:
      'Instant local Wi-Fi mobile dashboard via QR code (live agent status, 1-tap Allow/Deny approvals & Smart Clipboard mirror) plus $0 5G alerts via ntfy.sh, Telegram Bot, Tailscale, or an E2E AES-256-GCM encrypted Vercel relay.',
    highlights: [
      'Approve or deny Claude Code permission prompts right from your phone',
      'AES-256-GCM encryption via Apple CryptoKit; decryption key stays in #fragment',
      'Optional Away Mode forwards to phone only when you step away from your Mac',
    ],
  },
  {
    id: 'vela-ports',
    tag: 'PLUGIN 05',
    name: 'Local Dev Ports',
    summary:
      'Detects active localhost dev servers (Next.js, Bun, Vite, Python, Go, Rust) inside the Notch with 1-click Open in Browser or Kill Port—zero background polling.',
    highlights: [
      'Auto-identifies Node/Next.js, Bun, Python, Go, PostgreSQL & Redis ports',
      'One-click Open in your selected browser or stop stubborn processes',
      '0% idle CPU—scans only when you open the Ports tab',
    ],
  },
  {
    id: 'vela-git',
    tag: 'PLUGIN 06',
    name: 'GitHub PR & CI Status + Voice Scratchpad',
    summary:
      'Surfaces your open, draft, and merged (purple) GitHub PRs with live CI check badges right in the Activity tab, plus a persistent voice-dictation prompt scratchpad plugin for jotting and pinning reusable prompts.',
    highlights: [
      'Uses your existing `gh` CLI auth—zero GitHub tokens stored by Vela',
      'Color-coded PR pills (green open, purple merged) + live CI ✓ / ✕ / ⏱ badges',
      'Voice Scratchpad plugin saves & pins dictated prompts for any AI agent',
    ],
  },
];

export const VELA_INSTALL: string[] = [
  'Download Vela.dmg (~1.5 MB) and drag Vela.app into Applications.',
  'Launch Vela—it sits quietly around your MacBook notch and menubar (no Dock clutter).',
  'Vela auto-detects Claude Code, Antigravity & Codex CLI and connects hooks non-destructively while preserving your existing settings.',
  'Press ⌃⌥Space anytime to open the hub (swipe or ←/→ to switch tabs), or toggle opt-in plugins from Menubar ✦ → Plugins.',
];
