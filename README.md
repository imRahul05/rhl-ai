# RHL AI

> A modern developer and AI tooling monorepo unifying agent skills, reusable packages, project scaffolds, and developer utilities.

[![CI](https://github.com/imRahul05/rhl-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/imRahul05/rhl-ai/actions/workflows/ci.yml)
[![Turborepo](https://img.shields.io/badge/monorepo-Turborepo-ef4444?logo=turborepo)](https://turbo.build/)
[![pnpm](https://img.shields.io/badge/pnpm-workspaces-f69220?logo=pnpm)](https://pnpm.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)](https://www.typescriptlang.org/)

---

## Overview

**RHL AI** is the central home for engineering agentic workflows, publishing modular tools under `@rhl-ai/*`, and bootstrapping consistent application architectures. It is architected around a strict separation between **executable code** (compiled npm packages) and **prompt/knowledge artifacts** (AI skills).

### Why this Monorepo Exists

- **Centralized AI Capabilities**: Consolidate agent skills, prompting frameworks, and evaluation benchmarks in one searchable location.
- **Composable Tooling**: Share strict TypeScript utilities across CLI, scaffolding, and validation engines without code duplication.
- **Fast Scaffolding**: Spin up new production-ready projects in seconds with battle-tested templates.
- **Independent Versioning**: Version and publish individual packages independently using Changesets.

---

## Repository Structure

```text
rhl-ai/
├── skills/                      # AI Agent skills & prompt engineering artifacts
│   ├── README.md
│   └── code-reviewer/           # Reference code review agent skill
│       ├── SKILL.md
│       ├── references/
│       ├── examples/
│       └── scripts/
│
├── packages/                    # Compiled, published npm packages (@rhl-ai/*)
│   ├── cli/                     # The `rhl` unified command-line interface
│   ├── skills/                  # Engine for discovering, validating, and installing skills
│   ├── scaffold/                # Scaffolding engine for copying and templating projects
│   └── utils/                   # Shared logging, filesystem, and runtime helpers
│
├── templates/                   # Project starters for scaffolding
│   ├── nextjs/                  # Next.js App Router + TypeScript
│   ├── react/                   # React + Vite + TypeScript
│   └── node/                    # Node.js + TypeScript ESM
│
├── projects/                    # Internal experiments, PoCs, and prototype apps
│   └── README.md
│
├── docs/                        # Architectural records and detailed documentation
│   ├── README.md
│   └── architecture.md
│
├── .changeset/                  # Changesets configuration for independent versioning
├── .github/workflows/           # GitHub Actions for CI and Releases
├── package.json                 # Monorepo root configuration
├── pnpm-workspace.yaml          # pnpm workspace definition
├── turbo.json                   # Turborepo task pipeline
└── tsconfig.base.json           # Shared strict TypeScript configuration
```

---

## Packages

| Package                                         | Version | Description                                                       |
| :---------------------------------------------- | :------ | :---------------------------------------------------------------- |
| [`@rhl-ai/cli`](file:///packages/cli)           | `0.1.0` | Unified command-line interface (`rhl`)                            |
| [`@rhl-ai/skills`](file:///packages/skills)     | `0.1.0` | Discovery, validation, and installation engine for AI skills      |
| [`@rhl-ai/scaffold`](file:///packages/scaffold) | `0.1.0` | Template-based project generation engine                          |
| [`@rhl-ai/utils`](file:///packages/utils)       | `0.1.0` | High-performance, strictly typed filesystem and logging utilities |

---

## Skills Architecture

Skills are primarily knowledge artifacts for LLM coding agents, structured as follows:

```text
skills/<skill-name>/
├── SKILL.md            # Frontmatter metadata, decision framework, and procedures
├── references/         # In-depth technical specifications and checklists
├── examples/           # Golden input/output samples demonstrating the skill
└── scripts/            # Local validation or automation shell scripts
```

`@rhl-ai/skills` reads and validates these artifacts without bundling them into runtime dependencies, making it easy to create dozens of skills without bloating package size.

---

## CLI Usage

The repository provides the `rhl` binary via `@rhl-ai/cli`.

### Skill Management

```bash
# List all agent skills in the monorepo
pnpm rhl skill list

# Scaffold a new skill
pnpm rhl skill create <name> --description "Short description"

# Validate skill structure and SKILL.md metadata
pnpm rhl skill validate <name>

# Install a skill to ~/.agents/skills/<name>
pnpm rhl skill install <name>

# Update installed skills to latest versions
pnpm rhl skill update
```

### Project Scaffolding

```bash
# List available starter templates
pnpm rhl create

# Scaffold a new project from a template
pnpm rhl create nextjs my-awesome-app
pnpm rhl create react my-spa
pnpm rhl create node my-service
```

---

## Local Development

### Prerequisites

- **Node.js**: `>= 20.0.0`
- **pnpm**: `>= 9.0.0` (Recommended: `10.x`)

### Setup

```bash
# Clone the repository
git clone https://github.com/imRahul05/rhl-ai.git
cd rhl-ai

# Install all workspace dependencies
pnpm install

# Build all packages in topological order
pnpm build

# Run unit tests across all packages
pnpm test

# Run ESLint across the monorepo
pnpm lint

# Run TypeScript type check
pnpm typecheck
```

---

## Adding a New Skill

1. Run the scaffolding command:
   ```bash
   pnpm rhl skill create my-new-skill --description "Description of agent capabilities"
   ```
2. Edit `skills/my-new-skill/SKILL.md` to define:
   - **Overview**
   - **Decision Framework**
   - **Workflows**
   - **Constraints**
3. Populate `references/` and `examples/` with domain artifacts.
4. Validate the skill:
   ```bash
   pnpm rhl skill validate my-new-skill
   ```

---

## Creating a New Package

1. Create a directory under `packages/<package-name>/`.
2. Initialize `package.json` with name `@rhl-ai/<package-name>`.
3. Add dependencies referencing other workspace packages via `"@rhl-ai/utils": "workspace:*"`.
4. Create `tsconfig.json` extending `../../tsconfig.base.json`.
5. Add `tsup.config.ts` for bundling.
6. Register the package in root builds by running `pnpm install` and `pnpm build`.

---

## Changesets & Release Workflow

Packages in RHL AI are independently versioned and published using **Changesets**:

```bash
# 1. Create a changeset when modifying packages
pnpm changeset

# 2. Version packages (updates package.json & CHANGELOG.md)
pnpm version-packages

# 3. Publish to npm (automated via GitHub Actions on main branch)
pnpm release
```

Package releases run through `.github/workflows/release.yml` and require `NPM_TOKEN` secret to be set in repository settings.

---

## License

MIT © Rahul Kumar
