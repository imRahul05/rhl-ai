# @rhl-ai/skill-pr-description-writer

An agent skill that makes any coding agent (Claude Code, Codex, Cursor, Gemini CLI, and others) write rigorous, reviewer-friendly pull request descriptions, and actually do the verification and visual evidence the template asks for, instead of ticking boxes it never earned.

## What it does

- Finds your repo's own PR template, or falls back to a structured one: At a Glance table, Summary, Scope, AI impact, Spec and repo rules, Verification, Visual Evidence.
- Builds every claim from the diff; never invents issue numbers, requirements, or regulations.
- Runs your real build/lint/typecheck/test commands after the final edit and reports failures honestly.
- Requires browser testing for UI changes, delegated to a cheap, fast subagent (for example Claude Haiku, Gemini Flash, or a Codex mini model). It captures before/after screenshots at desktop and mobile sizes, red-box and arrow annotations, and a small GIF for flows. The main agent reviews the images before they go in the PR.
- Explains how to get images into a PR from the CLI.

## Install

```bash
npx @rhl-ai/cli skill install pr-description-writer
```

Or manually copy the skill folder into your agent's skills directory:

```bash
# Claude Code
cp -r skills/pr-description-writer ~/.claude/skills/

# Other agents using the shared convention
cp -r skills/pr-description-writer ~/.agents/skills/
```

From npm: `npm pack @rhl-ai/skill-pr-description-writer` and extract `package/` into one of those directories.

## Layout

```text
pr-description-writer/
├── SKILL.md                                   # Workflow the agent follows
├── references/
│   ├── template.md                            # Generic PR template
│   └── browser-evidence.md                    # Subagent prompt, Playwright annotation + GIF recipes
├── examples/
│   ├── filled-example.md                      # A correctly filled UI-change description
│   └── healthcare-monorepo-template.md        # Domain-specialized variant (regulations, PHI)
└── scripts/validate.sh                        # Asset check
```

## Requirements

For UI evidence: Playwright (`npx playwright install chromium`) and, optionally, `ffmpeg` for GIFs. Nothing else.

## License

MIT
