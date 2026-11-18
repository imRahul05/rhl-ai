# @rhl-ai/skill-pr-description-writer

An agent skill that makes your coding agent (Claude Code, Codex, Cursor, Gemini CLI and others that read `SKILL.md`) write rigorous, reviewer-friendly pull request descriptions, and actually do the verification and visual evidence the description claims instead of ticking boxes it never earned.

## Quick start (Claude Code)

```bash
npx @rhl-ai/cli skill install pr-description-writer --target ~/.claude/skills
```

Restart Claude Code (or start a new session), then in your repository:

```text
/pr-description-writer
```

or just ask:

```text
Open a PR for this branch and write the description.
```

## Install

| Agent                                             | Command                                                                         | Skill ends up in                                           |
| ------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Claude Code (all projects)                        | `npx @rhl-ai/cli skill install pr-description-writer --target ~/.claude/skills` | `~/.claude/skills/pr-description-writer/`                  |
| Claude Code (one repo, shared with your team)     | `npx @rhl-ai/cli skill install pr-description-writer --target .claude/skills`   | `<repo>/.claude/skills/pr-description-writer/` (commit it) |
| Agents using the shared `~/.agents/skills` folder | `npx @rhl-ai/cli skill install pr-description-writer`                           | `~/.agents/skills/pr-description-writer/` (default target) |
| Any other agent                                   | Use `--target <your agent's skills folder>`                                     | `<folder>/pr-description-writer/`                          |

Without the CLI, the skill is just files. Download and unpack it yourself:

```bash
npm pack @rhl-ai/skill-pr-description-writer
mkdir -p ~/.claude/skills/pr-description-writer
tar -xzf rhl-ai-skill-pr-description-writer-*.tgz -C ~/.claude/skills/pr-description-writer --strip-components=1
```

Update later with `npx @rhl-ai/cli skill update pr-description-writer --target ~/.claude/skills`. Uninstall by deleting the folder.

## How to use

The agent loads the skill in two ways:

1. **Explicitly**: in Claude Code type **`/pr-description-writer`** (optionally followed by instructions, e.g. `/pr-description-writer base is develop, link issue 42`). In other agents, name the skill in your prompt: "Use the pr-description-writer skill to …".
2. **Automatically**: whenever you ask the agent to open, update or describe a pull request, it picks the skill up from its description.

Example prompts:

```text
/pr-description-writer
Write the PR description for my current branch against main.
Open a draft PR and fill in our template; this is a UI change, so include screenshots.
Rewrite the description of PR #57: half the checkboxes were never verified.
```

What happens when it runs:

1. Finds your repo's PR template (`.github/pull_request_template.md`, `.github/PULL_REQUEST_TEMPLATE/`, …) or falls back to its own: At a Glance table, Summary, Scope, AI impact, repo rules, Verification, Visual Evidence.
2. Reads `git diff <base>...HEAD` and the commit log; every claim comes from the diff, and nothing (issue numbers, requirements, regulations) is invented.
3. Runs your real build / lint / typecheck / test commands after the last edit, ticks only what passed, and reports failures honestly.
4. For UI changes, browser testing is mandatory. It is delegated to a cheap, fast subagent (e.g. Claude Haiku, Gemini Flash, a Codex mini model) that captures before/after screenshots on desktop and mobile with red boxes and arrows, plus a GIF for multi-step flows. The main agent reviews the images before they go into the PR.
5. Creates or updates the PR (e.g. `gh pr create --body-file`) only when you asked it to.

## Requirements

- `git`, and the GitHub CLI (`gh`) or your agent's GitHub integration to open PRs.
- For UI evidence: Playwright (`npx playwright install chromium`); `ffmpeg` is optional, for GIFs.

## What's inside

```text
pr-description-writer/
├── SKILL.md                                   # The workflow the agent follows
├── references/
│   ├── template.md                            # Generic PR template
│   └── browser-evidence.md                    # Subagent prompt, Playwright annotation + GIF recipes
├── examples/
│   ├── filled-example.md                      # A correctly filled UI-change description
│   └── healthcare-monorepo-template.md        # Domain-specialized variant (regulations, PHI)
└── scripts/validate.sh                        # Asset check
```

Source: [skills/pr-description-writer](https://github.com/imRahul05/rhl-ai/tree/main/skills/pr-description-writer). Part of [RHL AI](https://github.com/imRahul05/rhl-ai).

## License

MIT
