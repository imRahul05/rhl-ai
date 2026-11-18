# @rhl-ai/skill-frontend-performance-engineer

An evidence-led frontend performance skill for coding agents (Claude Code, Codex, Cursor, Gemini CLI and others that read `SKILL.md`). It is not a checklist that applies every optimization: it makes the agent measure first, find the actual bottleneck, pick only the patterns that fit, explain the trade-offs, make the smallest change, and verify before/after.

**Measure → Localize → Select pattern → Check fit/trade-offs → Implement → Verify → Guard**

Works with React, Next.js, SPAs, SSR/streaming apps and large data-heavy interfaces.

## Quick start (Claude Code)

```bash
npx @rhl-ai/cli skill install frontend-performance-engineer --target ~/.claude/skills
```

Restart Claude Code (or start a new session), then in your repository:

```text
/frontend-performance-engineer the product list page is slow on mobile
```

or just ask:

```text
Why is our dashboard's INP so bad? Fix the biggest cause.
```

## Install

| Agent                                             | Command                                                                                 | Skill ends up in                                                   |
| ------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Claude Code (all projects)                        | `npx @rhl-ai/cli skill install frontend-performance-engineer --target ~/.claude/skills` | `~/.claude/skills/frontend-performance-engineer/`                  |
| Claude Code (one repo, shared with your team)     | `npx @rhl-ai/cli skill install frontend-performance-engineer --target .claude/skills`   | `<repo>/.claude/skills/frontend-performance-engineer/` (commit it) |
| Agents using the shared `~/.agents/skills` folder | `npx @rhl-ai/cli skill install frontend-performance-engineer`                           | `~/.agents/skills/frontend-performance-engineer/` (default target) |
| Any other agent                                   | Use `--target <your agent's skills folder>`                                             | `<folder>/frontend-performance-engineer/`                          |

Without the CLI, the skill is just files. Download and unpack it yourself:

```bash
npm pack @rhl-ai/skill-frontend-performance-engineer
mkdir -p ~/.claude/skills/frontend-performance-engineer
tar -xzf rhl-ai-skill-frontend-performance-engineer-*.tgz -C ~/.claude/skills/frontend-performance-engineer --strip-components=1
```

Update later with `npx @rhl-ai/cli skill update frontend-performance-engineer --target ~/.claude/skills`. Uninstall by deleting the folder.

## How to use

The agent loads the skill in two ways:

1. **Explicitly**: in Claude Code type **`/frontend-performance-engineer`** followed by the problem, e.g. `/frontend-performance-engineer LCP regressed after the last release`. In other agents, name the skill in your prompt: "Use the frontend-performance-engineer skill to …".
2. **Automatically**: when you ask to make a page, interaction, bundle or navigation faster, mention a performance regression or budget, or ask for a performance review of a change.

Example prompts:

```text
/frontend-performance-engineer
The search results page takes 4s to become interactive on a mid-range Android phone.
Our JS bundle grew 300 KB this month; find out why and what to split.
Review this PR for performance impact before we merge it.
```

What you get back, for every recommendation:

- **Finding**: evidence, user impact, root cause
- **Decision**: pattern selected, why it fits, alternatives considered, trade-offs
- **Change**: files affected and the minimal implementation
- **Verification**: baseline, after, method, regression guard

If evidence is missing, the agent says which measurement it needs instead of inventing numbers. It works best with runtime evidence: Chrome DevTools traces, Lighthouse, CrUX or your RUM data.

## What's inside

```text
frontend-performance-engineer/
├── SKILL.md                         # Activation, operating loop, decision rules, output contract
├── decision-framework/
│   ├── pattern-selection.md         # Symptom → pattern decision matrix
│   └── tradeoffs.md                 # Failure modes and costs
├── knowledge/                       # Measurement, metrics, framework guidance, case-study synthesis
├── patterns/                        # Focused playbooks (code splitting, caching, rendering, images, …)
├── examples/nextjs.md
├── evaluation.md                    # Routing and behavior tests
└── scripts/validate.sh              # Asset check
```

The 20 case studies behind it are distilled into engineering lessons and decision signals; no article text is copied.

Source: [skills/frontend-performance-engineer](https://github.com/imRahul05/rhl-ai/tree/main/skills/frontend-performance-engineer). Part of [RHL AI](https://github.com/imRahul05/rhl-ai).

## License

MIT
