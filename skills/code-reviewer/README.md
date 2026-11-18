# @rhl-ai/skill-code-reviewer

An agent skill that turns your coding agent (Claude Code, Codex, Cursor, Gemini CLI and others that read `SKILL.md`) into a strict reviewer for TypeScript and modern web code. It reviews a diff across correctness, type safety, architecture, security and performance, and returns actionable comments ranked **Blocking / Non-Blocking / Nitpick**.

## Quick start (Claude Code)

```bash
npx @rhl-ai/cli skill install code-reviewer --target ~/.claude/skills
```

Restart Claude Code (or start a new session), then in your repository:

```text
/code-reviewer
```

or just ask:

```text
Review my changes against main.
```

## Install

| Agent                                             | Command                                                                 | Skill ends up in                                   |
| ------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------- |
| Claude Code (all projects)                        | `npx @rhl-ai/cli skill install code-reviewer --target ~/.claude/skills` | `~/.claude/skills/code-reviewer/`                  |
| Claude Code (one repo, shared with your team)     | `npx @rhl-ai/cli skill install code-reviewer --target .claude/skills`   | `<repo>/.claude/skills/code-reviewer/` (commit it) |
| Agents using the shared `~/.agents/skills` folder | `npx @rhl-ai/cli skill install code-reviewer`                           | `~/.agents/skills/code-reviewer/` (default target) |
| Any other agent                                   | Use `--target <your agent's skills folder>`                             | `<folder>/code-reviewer/`                          |

Without the CLI, the skill is just files. Download and unpack it yourself:

```bash
npm pack @rhl-ai/skill-code-reviewer
mkdir -p ~/.claude/skills/code-reviewer
tar -xzf rhl-ai-skill-code-reviewer-*.tgz -C ~/.claude/skills/code-reviewer --strip-components=1
```

Update later with `npx @rhl-ai/cli skill update code-reviewer --target ~/.claude/skills`. Uninstall by deleting the folder.

## How to use

The agent loads the skill in two ways:

1. **Explicitly**: in Claude Code type **`/code-reviewer`**, optionally with a target: `/code-reviewer src/auth`, `/code-reviewer PR 57`, `/code-reviewer staged changes only`. In other agents, name the skill in your prompt: "Use the code-reviewer skill to …".
2. **Automatically**: whenever you ask for a code review, the agent picks the skill up from its description.

Example prompts:

```text
/code-reviewer
Review the diff on this branch against main and list blocking issues first.
Review packages/api/src/handlers/*.ts for type safety and security.
Is this PR safe to merge? Check correctness and N+1 queries.
```

What you get back: one comment per finding, each with

- **File & line**
- **Observation**: what is wrong and why
- **Suggested solution**: concrete replacement code
- **Severity**: Blocking (type unsafety, security, correctness, breaking changes), Non-Blocking (performance, maintainability), or Nitpick

The skill never approves code with `any`, avoids purely stylistic rewrites that match your conventions, and flags auth/database changes without tests. See `references/checklist.md` for the full checklist and `examples/review-sample.md` for a sample review.

## What's inside

```text
code-reviewer/
├── SKILL.md                    # Review framework the agent follows
├── references/checklist.md     # Pre-merge review checklist
├── examples/review-sample.md   # Sample review output
└── scripts/validate.sh         # Asset check
```

Source: [skills/code-reviewer](https://github.com/imRahul05/rhl-ai/tree/main/skills/code-reviewer). Part of [RHL AI](https://github.com/imRahul05/rhl-ai).

## License

MIT
