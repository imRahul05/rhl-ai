'use client';

import * as React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  GitPullRequest,
  CheckCheck,
  AlertTriangle,
  Send,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

interface SimulatedEvent {
  id: string;
  name: string;
  githubEventType: string;
  action: string;
  summary: string;
  jsonPayload: string;
  whatsappMessage: {
    title: string;
    subtitle: string;
    bodyLines: string[];
    actionUrl: string;
    time: string;
  };
}

const SIMULATED_EVENTS: SimulatedEvent[] = [
  {
    id: 'pr-review',
    name: 'PR Review Requested',
    githubEventType: 'pull_request',
    action: 'review_requested',
    summary: 'Alice requested a code review from imRahul05 on PR #42',
    jsonPayload: `{
  "action": "review_requested",
  "requested_reviewer": {
    "login": "imRahul05"
  },
  "repository": {
    "name": "rhl-ai"
  },
  "pull_request": {
    "number": 42,
    "title": "feat(skills): add frontend-performance-engineer",
    "html_url": "https://github.com/imRahul05/rhl-ai/pull/42",
    "user": { "login": "alice" },
    "head": { "ref": "feat/perf-skill" }
  }
}`,
    whatsappMessage: {
      title: '🔔 *GitHub Review Request*',
      subtitle: 'Repository: *imRahul05/rhl-ai*',
      bodyLines: [
        'Hey *Rahul* (@imRahul05),',
        '👤 *Alice* requested your review on PR *#42*:',
        '📝 _"feat(skills): add frontend-performance-engineer"_',
        '🌿 Branch: `feat/perf-skill`',
      ],
      actionUrl: 'https://github.com/imRahul05/rhl-ai/pull/42',
      time: '11:42 AM',
    },
  },
  {
    id: 'pr-merged',
    name: 'PR Approved & Merged',
    githubEventType: 'pull_request',
    action: 'closed (merged)',
    summary: 'Pull Request #39 merged into main branch',
    jsonPayload: `{
  "action": "closed",
  "repository": {
    "name": "rhl-ai"
  },
  "pull_request": {
    "number": 39,
    "title": "fix(cli): streamline skill installation path",
    "merged": true,
    "html_url": "https://github.com/imRahul05/rhl-ai/pull/39",
    "user": { "login": "bob" },
    "merged_by": { "login": "imRahul05" }
  }
}`,
    whatsappMessage: {
      title: '🎉 *Pull Request Merged*',
      subtitle: 'Repository: *imRahul05/rhl-ai*',
      bodyLines: [
        'PR *#39* was successfully merged into *main*!',
        '📝 _"fix(cli): streamline skill installation path"_',
        '🚀 Merged by: *imRahul05*',
        'Changes are now live in monorepo pipeline.',
      ],
      actionUrl: 'https://github.com/imRahul05/rhl-ai/pull/39',
      time: '11:45 AM',
    },
  },
  {
    id: 'ci-failed',
    name: 'CI Workflow Run Failed',
    githubEventType: 'workflow_run',
    action: 'completed (failure)',
    summary: 'CI / CD Test Suite failed on main branch commit #a8f91',
    jsonPayload: `{
  "action": "completed",
  "workflow_run": {
    "name": "CI",
    "conclusion": "failure",
    "head_branch": "main",
    "head_sha": "a8f912c",
    "html_url": "https://github.com/imRahul05/rhl-ai/actions/runs/108392",
    "triggering_actor": { "login": "imRahul05" }
  },
  "repository": {
    "name": "rhl-ai"
  }
}`,
    whatsappMessage: {
      title: '🚨 *CI Pipeline Failure Alert*',
      subtitle: 'Repository: *imRahul05/rhl-ai*',
      bodyLines: [
        '⚠️ Workflow *CI* failed on branch *main*!',
        '📌 Commit: `a8f912c` by *imRahul05*',
        '❌ Unit tests or linting check failed in Turborepo step.',
        'Immediate inspection recommended.',
      ],
      actionUrl: 'https://github.com/imRahul05/rhl-ai/actions/runs/108392',
      time: '11:48 AM',
    },
  },
];

export function WhatsappBotShowcase(): React.JSX.Element {
  const [selectedEventId, setSelectedEventId] = React.useState<string>(
    'pr-review'
  );
  const [copiedQuickstart, setCopiedQuickstart] = React.useState<boolean>(false);

  const currentEvent = React.useMemo(() => {
    const found = SIMULATED_EVENTS.find((e) => e.id === selectedEventId);
    return found ? found : SIMULATED_EVENTS[0]!;
  }, [selectedEventId]);

  function handleCopy(command: string): void {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(command);
      setCopiedQuickstart(true);
      setTimeout(() => setCopiedQuickstart(false), 2000);
    }
  }

  return (
    <section id="whatsapp-bot" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="emerald" size="md" className="mb-3">
            Featured Autonomous Service
          </Badge>
          <h2 className="apple-heading-section font-extrabold text-white tracking-tight mb-4">
            GitHub to WhatsApp Webhook Bot
          </h2>
          <p className="apple-body text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Never miss critical code reviews or broken pipelines. A lightweight,
            secure webhook bridge that translates GitHub events into structured,
            actionable WhatsApp messages using Twilio.
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/25 tracking-tight">
              Published on npm: create-github-whatsapp-notifier (v1.0.6)
            </span>
          </div>
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: GitHub Event Simulator (7 cols) */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between border border-white/10 border-t-white/25">
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/12 border-t-white/25 flex items-center justify-center text-indigo-400 shadow-sm">
                    <GitPullRequest className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-white tracking-tight">
                    Simulate Inbound GitHub Webhook
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono bg-white/[0.03] px-2.5 py-0.5 rounded-md border border-white/5">
                  POST /api/webhook
                </span>
              </div>

              {/* Event selector tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
                {SIMULATED_EVENTS.map((evt) => {
                  const isSelected = evt.id === selectedEventId;
                  return (
                    <button
                      key={evt.id}
                      onClick={() => setSelectedEventId(evt.id)}
                      className={`text-left p-3.5 rounded-xl border text-xs transition-all active:scale-[0.98] ${
                        isSelected
                          ? 'border-indigo-500/60 bg-indigo-600/15 text-white shadow-sm'
                          : 'border-white/6 bg-white/[0.02] text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="font-semibold mb-1 flex items-center gap-1.5">
                        {evt.id === 'ci-failed' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        )}
                        {evt.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">
                        {evt.action}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Event Details */}
              <div className="mb-4 flex items-center justify-between text-xs text-slate-300">
                <span>
                  Simulating:{' '}
                  <strong className="text-indigo-300">
                    {currentEvent.summary}
                  </strong>
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                  x-github-event: {currentEvent.githubEventType}
                </span>
              </div>

              {/* JSON Payload Display */}
              <div className="relative rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[260px]">
                <pre>{currentEvent.jsonPayload}</pre>
              </div>
            </div>

            {/* Quickstart snippet */}
            <div className="mt-6 pt-5 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">
                  Initialize your bot locally:
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">
                  npm / npx
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-slate-200">
                <span className="truncate">
                  npx create-github-whatsapp-notifier my-bot
                </span>
                <button
                  onClick={() =>
                    handleCopy('npx create-github-whatsapp-notifier my-bot')
                  }
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white active:scale-90 transition-all shrink-0"
                  title="Copy command"
                >
                  {copiedQuickstart ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Apple iPhone 16 Pro Mockup (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[340px] rounded-[3rem] p-3 bg-gradient-to-b from-neutral-700/60 via-neutral-800/60 to-neutral-900/80 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
              {/* iPhone Inner Screen Frame */}
              <div className="rounded-[2.5rem] bg-[#0b141a] overflow-hidden border border-white/10 flex flex-col h-[530px] justify-between relative shadow-inner">
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-24 h-5 rounded-full bg-black flex items-center justify-between px-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10" />
                  <div className="w-2 h-2 rounded-full bg-[#0a101e] border border-cyan-500/20" />
                </div>

                {/* WhatsApp Chat Top Header */}
                <div className="pt-8 pb-3 px-4 bg-[#1f2c34]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm shadow">
                      R
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white leading-tight">
                        RHL GitHub Bot
                      </div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Online (Twilio Webhook)
                      </div>
                    </div>
                  </div>
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                </div>

                {/* WhatsApp Chat Body */}
                <div className="p-4 flex-1 overflow-y-auto space-y-3 flex flex-col justify-end bg-[#0b141a]">
                  {/* Security notice */}
                  <div className="mx-auto px-3 py-1 rounded-md bg-[#182229]/80 border border-white/5 text-[10px] text-amber-200/80 text-center max-w-[260px]">
                    🔒 End-to-end encrypted via Twilio gateway.
                  </div>

                  {/* Message Bubble with Vibrancy */}
                  <div className="self-end max-w-[92%] rounded-2xl rounded-tr-xs bg-[#005c4b]/95 p-3.5 text-white shadow-md border border-emerald-400/20 transition-all duration-300">
                    <div className="text-xs font-bold text-emerald-200 mb-1 flex items-center gap-1.5">
                      <span>{currentEvent.whatsappMessage.title}</span>
                    </div>

                    <div className="text-[11px] text-emerald-100 font-semibold mb-2">
                      {currentEvent.whatsappMessage.subtitle}
                    </div>

                    <div className="space-y-1 text-xs text-slate-100 leading-snug">
                      {currentEvent.whatsappMessage.bodyLines.map(
                        (line, idx) => (
                          <p key={idx}>{line}</p>
                        )
                      )}
                    </div>

                    {/* Action Link inside message */}
                    <div className="mt-3 pt-2 border-t border-emerald-600/40">
                      <Link
                        href={currentEvent.whatsappMessage.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-200 hover:underline"
                      >
                        <span>Open on GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Bubble Timestamp and Read Receipt */}
                    <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-emerald-200/80">
                      <span>{currentEvent.whatsappMessage.time}</span>
                      <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chat Input Bar (Decorative) */}
                <div className="px-3 py-2.5 bg-[#1f2c34]/90 backdrop-blur-md flex items-center gap-2 border-t border-white/5">
                  <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1.5 text-xs text-slate-400">
                    Bot auto-dispatches alerts...
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-sm">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
