# @rhl-ai/cli

The `rhl` command-line interface for managing AI agent skills and scaffolding projects. Built on [Commander.js](https://github.com/tj/commander.js) with coloured output via [picocolors](https://github.com/alexeyraspopov/picocolors).

## Installation

```bash
npm install -g @rhl-ai/cli
# or
pnpm add -g @rhl-ai/cli
```

## Requirements

- Node.js >= 20.0.0

---

## Usage

```
rhl [options] [command]
```

### Global options

| Option | Description |
|---|---|
| `-v, --verbose` | Enable verbose debug logging |
| `-s, --silent` | Suppress all console output |
| `--version` | Print the CLI version |
| `--help` | Print help for any command |

---

## Commands

### `rhl skill`

Manage AI agent skills in your repository.

```
rhl skill <subcommand>
```

---

#### `rhl skill list`

List all AI agent skills discovered in the repository.

Skills are discovered from the `skills/` directory at the monorepo root, or `skills/` relative to `cwd`.

```bash
rhl skill list
```

**Output:**
```
Available AI Agent Skills (2):

  • code-reviewer v1.0.0 by Rahul Kumar
    Expert AI code reviewer enforcing strict TypeScript and 5-axis inspections.
    Files: 2 references, 1 examples, 0 scripts

  • frontend-performance v1.0.0 by Rahul Kumar
    Evidence-led web performance diagnostics for Core Web Vitals.
    Files: 1 references, 0 examples, 1 scripts
```

---

#### `rhl skill create <name>`

Scaffold a new skill directory with a `SKILL.md` template and recommended subdirectories (`references/`, `examples/`, `scripts/`).

The skill name is sanitised to lowercase alphanumeric characters with hyphens.

```bash
rhl skill create my-skill
rhl skill create my-skill --description "What this skill does" --author "Your Name"
```

| Option | Description |
|---|---|
| `-d, --description <desc>` | Short summary written into `SKILL.md` frontmatter |
| `-a, --author <author>` | Author name written into `SKILL.md` frontmatter |

After creation, the CLI prints the skill path and next steps:
```
✔ Skill created at /path/to/skills/my-skill
ℹ Next steps:
  1. Edit /path/to/skills/my-skill/SKILL.md to define workflows & constraints.
  2. Add reference docs under /path/to/skills/my-skill/references/.
  3. Run `rhl skill validate my-skill` to verify.
```

---

#### `rhl skill validate <name>`

Validate a skill directory and its `SKILL.md` against the required schema.

```bash
rhl skill validate my-skill
```

Checks performed:
- Skill directory exists
- `SKILL.md` is present
- `name` field in frontmatter is set and matches directory name
- `description` field is set and at least 10 characters
- Instruction body (content after frontmatter) is non-empty
- Recommended subdirectories (`references/`, `examples/`, `scripts/`) exist

Validation issues are reported as **errors** (block `isValid`) or **warnings** (informational only).

```bash
# Passes
✔ Skill 'my-skill' is valid and ready for agents!

# Passes with warnings
⚠ [directory.scripts] Recommended directory 'scripts/' is missing
✔ Skill 'my-skill' passed validation with warnings.

# Fails
✖ [SKILL.md] Missing required 'SKILL.md' file in '/path/to/skills/my-skill'
✖ Skill 'my-skill' failed validation.
```

Exits with code `1` on failure.

---

#### `rhl skill install <name>`

Install a skill from the repository's `skills/` directory to the local agent skills directory (`~/.agents/skills/<name>`).

```bash
rhl skill install code-reviewer
rhl skill install code-reviewer --target /custom/path
rhl skill install code-reviewer --overwrite
```

| Option | Description |
|---|---|
| `-t, --target <path>` | Custom destination directory (default: `~/.agents/skills/`) |
| `--overwrite` | Replace the skill at destination if it already exists |

```bash
✔ Skill 'code-reviewer' successfully installed to '/home/user/.agents/skills/code-reviewer'.
```

Exits with code `1` if the skill is not found or the destination already exists without `--overwrite`.

---

#### `rhl skill update [name]`

Update an installed skill (or all installed skills) to the latest version from the repository.

```bash
# Update a specific skill
rhl skill update code-reviewer

# Update all discovered skills
rhl skill update

# Use a custom agent skills directory
rhl skill update --target /custom/agents/skills
```

| Option | Description |
|---|---|
| `-t, --target <path>` | Custom agent skills directory |

This re-installs with `overwrite: true`, so destination files are always replaced.

---

### `rhl create [template] [projectName]`

Scaffold a new project from a starter template in the repository's `templates/` directory.

```bash
# List available templates
rhl create

# Scaffold a project
rhl create <template> <project-name>
rhl create nextjs-app my-new-app
rhl create nextjs-app my-new-app --target ./projects
rhl create nextjs-app my-new-app --overwrite
```

| Option | Description |
|---|---|
| `-t, --target <path>` | Destination directory (default: `process.cwd()`) |
| `--overwrite` | Delete and replace target if it already exists |

When called without arguments, prints all available templates:
```
Available Starter Templates:

  • nextjs-app: Starter template for Next.js with TypeScript and Tailwind

Usage:
  rhl create <template> <project-name>
```

On success:
```
✔ Project 'my-new-app' created successfully from template 'nextjs-app'.

Next steps:

  cd my-new-app
  pnpm install
  pnpm dev
```

Exits with code `1` if the template is not found or the target directory exists without `--overwrite`.

---

## Programmatic usage

The CLI can also be imported and used programmatically:

```ts
import { createCli, runCli } from '@rhl-ai/cli';

// Run with custom argv
runCli(['node', 'rhl', 'skill', 'list']);

// Or get the Commander instance to extend it
const program = createCli();
program.parse(process.argv);
```

---

## License

MIT © [Rahul Kumar](https://github.com/imRahul05)
