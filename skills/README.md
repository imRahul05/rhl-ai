# AI Agent Skills

This directory serves as the canonical home for AI agent skills and prompt engineering artifacts in **RHL AI**.

## What is a Skill?

A **Skill** is an agent instruction specification that gives AI coding assistants (like Antigravity, Claude Code, Cursor, Copilot, etc.) domain expertise, systematic workflows, decision frameworks, and strict verification constraints.

Skills are primarily knowledge and behavioral artifacts rather than compiled executable packages.

## Directory Structure

Every skill adheres to the following layout:

```text
skills/<skill-name>/
├── SKILL.md            # Primary agent instruction file (YAML frontmatter + Markdown)
├── references/         # Deep dive documentation, checklists, API references
├── examples/           # Input/output demonstrations, sample reviews, golden tests
└── scripts/            # Local validation or helper scripts for the skill
```

## SKILL.md Specification

Every `SKILL.md` must start with YAML frontmatter:

```markdown
---
name: code-reviewer
description: Expert AI code reviewer for TypeScript and modern web stacks.
version: 1.0.0
author: RHL AI
tags:
  - code-review
  - quality
---

# Code Reviewer

## Overview

Context and purpose of the skill.

## Decision Framework

Criteria, heuristics, and trade-offs for reasoning.

## Workflows

Step-by-step procedures for execution.

## Constraints

Strict negative rules, bounds, and requirements.

## References

Pointers to supplementary guides and standards.
```

## Managing Skills with CLI

You can discover, validate, and scaffold skills using the `rhl` CLI:

```bash
# List all skills
pnpm rhl skill list

# Scaffold a new skill
pnpm rhl skill create <skill-name> --description "..."

# Validate a skill
pnpm rhl skill validate <skill-name>

# Install a skill to ~/.agents/skills/
pnpm rhl skill install <skill-name>
```
