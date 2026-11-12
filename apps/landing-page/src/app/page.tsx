import * as React from 'react';
import { Hero, type HeroFact } from '@/components/home/hero';
import { SkillAnatomy } from '@/components/home/skill-anatomy';
import { Pipeline } from '@/components/home/pipeline';
import { ProductBento } from '@/components/home/product-bento';
import { CommandMarquee } from '@/components/home/command-marquee';
import { Principles } from '@/components/home/principles';
import { FinalCta } from '@/components/home/final-cta';
import { getAllSkills, getSkillSource } from '@/lib/skills';
import { getRepoFacts } from '@/lib/repo';

const MARQUEE_COMMANDS: string[] = [
  'rhl skill list',
  'rhl skill install',
  'rhl skill validate',
  'rhl skill create',
  'rhl skill update',
  'rhl create nextjs',
];

export default function HomePage(): React.JSX.Element {
  const skills = getAllSkills();
  const repo = getRepoFacts();

  const facts: HeroFact[] = [
    { value: skills.length, label: 'Agent skills', detail: skills.map((s) => s.slug).join(', ') },
    {
      value: MARQUEE_COMMANDS.length,
      label: 'CLI commands',
      detail: 'rhl skill …, rhl create',
    },
    {
      value: repo.templates.length,
      label: 'Starter templates',
      detail: repo.templates.map((t) => t.name).join(', '),
    },
    {
      value: repo.packages.length,
      label: 'Workspace packages',
      detail: repo.packages.map((p) => `@rhl-ai/${p}`).join(', '),
    },
  ];

  const tags = Array.from(
    new Set([...skills.map((s) => s.slug), ...skills.flatMap((s) => s.metadata.tags ?? [])])
  );

  return (
    <main id="main" className="flex-1">
      <Hero skillSource={getSkillSource('code-reviewer')} facts={facts} />
      <SkillAnatomy />
      <Pipeline />
      <ProductBento skills={skills} templates={repo.templates} />
      <CommandMarquee commands={MARQUEE_COMMANDS} tags={tags} />
      <Principles />
      <FinalCta />
    </main>
  );
}
