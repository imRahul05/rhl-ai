'use client';

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TerminalTab {
  id: string;
  label: string;
  command: string;
  output: string[];
}

const TERMINAL_TABS: TerminalTab[] = [
  {
    id: 'skill-list',
    label: 'rhl skill list',
    command: 'pnpm rhl skill list',
    output: [
      'Scanning monorepo skills catalog...',
      '',
      '✓ code-reviewer (v1.0.0)',
      '  Expert AI code reviewer for strict TypeScript, architecture, and security',
      '  Tags: [code-review, typescript, architecture, security]',
      '',
      '✓ frontend-performance-engineer (v1.0.0)',
      '  Evidence-led frontend performance engineering & CWV diagnostic',
      '  Tags: [performance, cwv, lcp, inp, bundles, react]',
      '',
      'Found 2 verified agent skills ready for installation.',
    ],
  },
  {
    id: 'skill-install',
    label: 'rhl skill install',
    command: 'pnpm rhl skill install code-reviewer',
    output: [
      '📦 Target skill: code-reviewer',
      '✓ Read specification from skills/code-reviewer/SKILL.md',
      '✓ Validated YAML frontmatter schema',
      '✓ Verified 5-axis review heuristics',
      '✓ Installed to ~/.agents/skills/code-reviewer/SKILL.md',
      '',
      'Agent behavior active. Ready for autonomous PR inspections.',
    ],
  },
  {
    id: 'whatsapp-bot',
    label: 'create-whatsapp-bot',
    command: 'npx create-github-whatsapp-notifier my-bot',
    output: [
      '⚡ Initializing GitHub WhatsApp Notification bot...',
      '✓ Scaffolding Express webhook receiver',
      '✓ Configured Twilio WhatsApp messaging client',
      '✓ Generated config/user-phones.js mapper',
      '✓ Added sample test curl payload',
      '',
      'Next: cd my-bot && cp .env.example .env && npm start',
    ],
  },
];

const DEFAULT_TAB: TerminalTab = TERMINAL_TABS[0] ?? {
  id: 'skill-list',
  label: 'rhl skill list',
  command: 'pnpm rhl skill list',
  output: [],
};

export function TerminalDemo(): React.JSX.Element {
  const [activeTabId, setActiveTabId] = React.useState<string>('skill-list');
  const [hasCopied, setHasCopied] = React.useState<boolean>(false);

  const activeTab = React.useMemo<TerminalTab>(
    () => TERMINAL_TABS.find((tab) => tab.id === activeTabId) ?? DEFAULT_TAB,
    [activeTabId]
  );

  function copyCommand(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(activeTab.command);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  }

  return (
    <div className="w-full rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden font-mono">
      {/* Terminal Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <div className="hidden sm:flex items-center gap-1">
            {TERMINAL_TABS.map((tab) => {
              const isSelected = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    isSelected
                      ? 'bg-background text-foreground font-semibold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground hidden md:inline">
            terminal
          </span>
          <Button
            variant="ghost"
            size="xs"
            onClick={copyCommand}
            aria-label="Copy terminal command"
            className="h-6 px-2 gap-1 text-[11px] text-muted-foreground hover:text-foreground"
          >
            {hasCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex sm:hidden border-b border-border bg-muted/20 px-2 py-1 gap-1 overflow-x-auto">
        {TERMINAL_TABS.map((tab) => {
          const isSelected = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-2 py-1 text-[11px] rounded whitespace-nowrap ${
                isSelected
                  ? 'bg-background text-foreground font-semibold'
                  : 'text-muted-foreground'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 sm:p-5 text-xs sm:text-[13px] leading-relaxed overflow-x-auto min-h-[220px]">
        {/* Prompt line */}
        <div className="flex items-center gap-2 mb-3 text-foreground font-semibold">
          <span className="text-primary select-none">$</span>
          <span>{activeTab.command}</span>
        </div>

        {/* Output lines */}
        <div className="space-y-1 text-muted-foreground">
          {activeTab.output.map((line, index) => {
            const isSuccess = line.startsWith('✓') || line.startsWith('📦') || line.startsWith('⚡');
            return (
              <div
                key={index}
                className={
                  isSuccess
                    ? 'text-foreground font-medium'
                    : ''
                }
              >
                {line || '\u00A0'}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
