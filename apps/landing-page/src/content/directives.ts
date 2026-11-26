/** The directives page content. Also served to agents through /llms-full.txt. */

export interface DirectiveItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  enforcement: string;
  codeExample: string;
}

export const DIRECTIVES: DirectiveItem[] = [
  {
    id: 'decoupled-intelligence',
    number: '01',
    name: 'Decoupled Intelligence Duality',
    tagline: 'Separate LLM prompt artifacts from compiled runtime code.',
    description:
      'We separate LLM behavioral prompt artifacts from compiled runtime code. Agent skills live in structured markdown schemas with declarative YAML frontmatter, while packages remain feather-light with 0 KB bundle overhead.',
    enforcement: 'Enforced by RHL CLI registry validation and skills catalog linter.',
    codeExample: `# skills/code-reviewer/SKILL.md
---
name: code-reviewer
description: Expert AI code reviewer for strict TypeScript.
version: 1.0.0
---
## Decision Framework
1. Blocking (Must Fix)
2. Non-Blocking (Should Fix)
3. Nitpick (Optional)`,
  },
  {
    id: 'strict-type-safety',
    number: '02',
    name: 'Absolute Zero Any Type Safety',
    tagline: 'Zero any tolerance across all packages, tools, and interfaces.',
    description:
      'The usage of any is strictly banned across all repositories, packages, tools, and APIs. Unsafe casts, implicit anys, and loose records are blocked at compile time with strict TypeScript and zero-warning ESLint rules.',
    enforcement: 'Enforced by CI typecheck with noImplicitAny and strict compiler flags.',
    codeExample: `// Strictly forbidden:
function handleData(data: any): any { ... }

// Enforced alternative:
function handleData<T extends Record<string, unknown>>(
  data: T
): ValidatedPayload<T> { ... }`,
  },
  {
    id: 'agent-native-ergonomics',
    number: '03',
    name: 'Agent-Native Ergonomics',
    tagline: 'Structured markdown formats designed for AI reasoning.',
    description:
      'Prompts and operating directives are formatted for machine readability and cognitive clarity. Clear operating loops, negative constraints, and exact output contracts ensure autonomous coding agents deliver deterministic results.',
    enforcement: 'Enforced by standardized SKILL.md template guidelines and validation scripts.',
    codeExample: `## Operating Loop
1. Frame -> Target device, user journey, target metric
2. Measure -> RUM, CrUX, or reproducible traces
3. Localize -> Network, bundle, rendering, or interaction
4. Implement -> Smallest justified change
5. Verify -> Measure exact same metric under same conditions`,
  },
  {
    id: 'monorepo-cohesion',
    number: '04',
    name: 'Modular Monorepo Cohesion',
    tagline: 'Independent packages unified through Turborepo.',
    description:
      'Every package in the @rhl-ai namespace functions as an independent, single-responsibility module with explicit boundaries. High-performance Turborepo caching guarantees instantaneous incremental builds.',
    enforcement: 'Enforced by pnpm workspaces and turborepo pipeline configurations.',
    codeExample: `pnpm-workspace.yaml:
packages:
  - 'packages/*'
  - 'apps/*'
  - 'projects/*'`,
  },
];
