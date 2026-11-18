import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Markdown } from '@/components/markdown';
import { SkillUsage } from '@/components/skill-usage';
import { CopyCommand } from '@/components/copy-command';
import { skillInstallCommand } from '@/lib/repo';
import { getAllSkills, getSkill } from '@/lib/skills';

interface SkillPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getAllSkills().map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: SkillPageProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return {};
  return { title: `${skill.title} — RHL AI Skills`, description: skill.summary };
}

export default async function SkillPage({ params }: SkillPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const { metadata } = skill;

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground transition-colors">
      <main id="main" className="flex-1">
        {/* Breadcrumb & Hero */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">
                RHL AI
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/skills" className="hover:text-foreground">
                Skills
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">{skill.title}</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                AGENT SKILL
              </p>
              {skill.version ? (
                <Badge variant="outline" size="sm" className="font-mono text-[11px]">
                  v{skill.version}
                </Badge>
              ) : null}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              {skill.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              {skill.summary}
            </p>

            {metadata.tags && metadata.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mb-8">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <CopyCommand command={skillInstallCommand(skill.slug)} />
              <div className="font-mono text-xs bg-card border border-border px-3 py-2 rounded-md text-foreground">
                then <span className="text-primary">/{skill.slug}</span> in Claude Code
              </div>
              <Link
                href={`https://github.com/imRahul05/rhl-ai/blob/main/skills/${skill.slug}/SKILL.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  View Raw SKILL.md
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Install & use */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
              Install &amp; use
            </h2>
            <SkillUsage slug={skill.slug} npmName={skill.npmName} />
          </div>
        </section>

        {/* SKILL.md content */}
        <section className="py-16 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
              What the agent follows (SKILL.md)
            </h2>
            {metadata.description !== skill.summary ? (
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {metadata.description}
              </p>
            ) : null}
            <Markdown>{skill.body}</Markdown>
          </div>
        </section>
      </main>
    </div>
  );
}
