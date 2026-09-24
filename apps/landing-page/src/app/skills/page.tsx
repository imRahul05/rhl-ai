import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface CatalogSkill {
  id: string;
  name: string;
  version: string;
  category: string;
  tags: string[];
  summary: string;
  description: string;
  installCommand: string;
  href: string;
}

const SKILLS_CATALOG: CatalogSkill[] = [
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    version: '1.0.0',
    category: 'CODE QUALITY & SECURITY',
    tags: ['TypeScript', 'Architecture', 'Security', 'Strictness'],
    summary: 'Expert AI code review for modern TypeScript applications using structured heuristics.',
    description:
      'Guides agents through rigorous, multi-dimensional code reviews across TypeScript applications. Evaluates diffs across 5 core axes (Correctness, Type Safety, Architecture, Security, Performance) and categorizes findings into 3 strict severity tiers.',
    installCommand: 'pnpm rhl skill install code-reviewer',
    href: '/skills/code-reviewer',
  },
  {
    id: 'frontend-performance',
    name: 'Frontend Performance Engineer',
    version: '1.0.0',
    category: 'WEB PERFORMANCE & CWV',
    tags: ['Core Web Vitals', 'LCP', 'INP', 'React', 'Next.js'],
    summary: 'Evidence-driven frontend performance engineering and diagnostic analysis.',
    description:
      'Enforces an evidence-first operating loop (Frame → Measure → Localize → Candidate Patterns → Check Fit → Implement → Verify → Guard). Diagnoses slow LCP, poor INP, bundle bloat, and rendering waterfalls before recommending targeted optimizations.',
    installCommand: 'pnpm rhl skill install frontend-performance-engineer',
    href: '/skills/frontend-performance',
  },
];

export default function SkillsCatalogPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <section className="py-16 md:py-20 border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">
                RHL AI
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Skills</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Skills
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Reusable intelligence for coding agents. A curated library of behavioral heuristics, review rules, and diagnostic loops.
            </p>
          </div>
        </section>

        {/* Skills Library - Restrained Editorial Rows */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="divide-y divide-border">
              {SKILLS_CATALOG.map((skill) => (
                <div
                  key={skill.id}
                  className="py-12 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
                >
                  {/* Left Column: Metadata */}
                  <div className="md:col-span-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        {skill.category}
                      </span>
                      <Badge variant="outline" size="sm" className="font-mono text-[11px]">
                        v{skill.version}
                      </Badge>
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {skill.name}
                    </h2>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Middle Column: Summary & Description */}
                  <div className="md:col-span-6 space-y-3">
                    <p className="text-sm font-medium text-foreground">
                      {skill.summary}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>
                    <div className="pt-2 font-mono text-xs text-muted-foreground">
                      <span className="text-primary mr-2">$</span>
                      {skill.installCommand}
                    </div>
                  </div>

                  {/* Right Column: CTA */}
                  <div className="md:col-span-2 flex md:justify-end pt-1">
                    <Link href={skill.href}>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <span>View skill</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Contributing new skills note */}
            <div className="mt-16 pt-10 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">Authoring custom skills?</span>
                <p className="mt-0.5">
                  Follow our standard YAML frontmatter schema to contribute your own agent skills to the monorepo.
                </p>
              </div>
              <Link
                href="https://github.com/imRahul05/rhl-ai/tree/main/skills"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  View Skill Guidelines
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
