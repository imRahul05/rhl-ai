import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { MessageSquare, ExternalLink, ChevronRight } from 'lucide-react';

export default function WhatsAppBotPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb & Hero */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">
                RHL AI
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/products" className="hover:text-foreground">
                Products
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">WhatsApp Bot</span>
            </div>

            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              AUTOMATION & WEBHOOKS
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              GitHub WhatsApp Bot
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              High-signal GitHub webhook notifications delivered directly to developer WhatsApp chats.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="https://www.npmjs.com/package/create-github-whatsapp-notifier"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2">
                  <span>View on npmjs.com</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
              <Link
                href="https://github.com/imRahul05/rhl-ai/tree/main/projects/github-whatsapp-bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  View Source on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Message Preview Visual */}
        <section className="py-16 border-b border-border bg-muted/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              SIMULATED NOTIFICATION PAYLOAD
            </p>

            <div className="max-w-lg mx-auto rounded-lg border border-border bg-card p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-border text-xs">
                <span className="font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  GitHub Bot via Twilio
                </span>
                <span className="font-mono text-muted-foreground text-[11px]">Just now</span>
              </div>

              <div className="space-y-2 text-xs leading-relaxed">
                <div className="font-semibold text-foreground">
                  🔔 Pull Request Review Requested
                </div>
                <div className="text-muted-foreground">
                  <strong className="text-foreground">alice</strong> requested your review on <span className="font-mono text-primary">#14: feat(auth): add OAuth2 provider</span>
                </div>
                <div className="bg-muted p-2 rounded font-mono text-[11px] text-foreground/90">
                  Repo: imRahul05/rhl-ai
                  <br />
                  Branch: feature/oauth-provider → main
                </div>
                <div className="text-primary font-mono text-[11px] hover:underline cursor-pointer">
                  https://github.com/imRahul05/rhl-ai/pull/14
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why it exists */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              PURPOSE
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Why it exists
            </h2>
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl space-y-3">
              <p>
                Email inboxes are noisy and GitHub notifications frequently get lost, delaying critical code reviews and blocking releases.
              </p>
              <p>
                <strong className="text-foreground">create-github-whatsapp-notifier</strong> allows teams to scaffold a lightweight webhook receiver in seconds. It maps GitHub handles to WhatsApp numbers, sending high-priority alerts right when an action is required.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                EVENT PIPELINE
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                How it works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-mono text-primary font-semibold">01 / WEBHOOK</span>
                <h3 className="font-semibold text-foreground text-sm">GitHub Fires Event</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  GitHub dispatches HTTP POST payload on PR reviews, merges, or CI failures.
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-mono text-primary font-semibold">02 / PARSE</span>
                <h3 className="font-semibold text-foreground text-sm">Signature & Filter</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Webhook receiver verifies HMAC signature and filters relevant action types.
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-mono text-primary font-semibold">03 / MAP</span>
                <h3 className="font-semibold text-foreground text-sm">Target Resolution</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Maps GitHub username to recipient WhatsApp phone numbers via config.
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <span className="text-xs font-mono text-primary font-semibold">04 / DISPATCH</span>
                <h3 className="font-semibold text-foreground text-sm">Twilio Message</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Formatted alert is dispatched immediately to WhatsApp via Twilio API.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quickstart Command */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                SCAFFOLD COMMAND
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Scaffold your bot in 30 seconds
              </h2>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 font-mono text-xs sm:text-[13px] space-y-2">
              <div className="text-muted-foreground"># 1. Generate bot project</div>
              <div className="text-foreground"><span className="text-primary">$</span> npx create-github-whatsapp-notifier my-bot</div>
              <div className="text-muted-foreground mt-3"># 2. Configure credentials</div>
              <div className="text-foreground"><span className="text-primary">$</span> cd my-bot && cp .env.example .env</div>
              <div className="text-muted-foreground mt-3"># 3. Start local server</div>
              <div className="text-foreground"><span className="text-primary">$</span> npm start</div>
            </div>
          </div>
        </section>

        {/* Configuration Reference */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              CONFIGURATION
            </p>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Environment setup
            </h2>
            <div className="rounded-lg border border-border bg-card p-5 font-mono text-xs text-muted-foreground leading-relaxed">
              <div>PORT=3000</div>
              <div>TWILIO_SID=your_twilio_account_sid</div>
              <div>TWILIO_TOKEN=your_twilio_auth_token</div>
              <div>TWILIO_WHATSAPP_FROM=whatsapp:+14155238886</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
