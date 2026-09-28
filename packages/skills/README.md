# @rhl-ai/skills

Discovery, validation, scaffolding, and installation engine for AI agent skills. Skills are structured directories containing a `SKILL.md` file with YAML frontmatter that defines metadata and markdown instructions for autonomous coding agents.

## Installation

```bash
npm install @rhl-ai/skills
# or
pnpm add @rhl-ai/skills
```

## Requirements

- Node.js >= 20.0.0
- ESM project (`"type": "module"` in `package.json`)

---

## Skill Directory Structure

A skill is a directory with the following layout:

```
skills/
└── my-skill/
    ├── SKILL.md          # Required — metadata + instructions
    ├── references/       # Recommended — supplemental docs
    ├── examples/         # Recommended — usage demonstrations
    └── scripts/          # Recommended — automation scripts
```

### SKILL.md format

```markdown
---
name: my-skill
description: What this skill does and when to use it.
version: 1.0.0
author: Your Name
tags: [typescript, review, security]
---

## Overview
Instructions for the AI agent go here.
```

---

## API

### Types

```ts
interface SkillMetadata {
  name: string;
  description: string;
  version?: string;
  author?: string;
  tags?: string[];
}

interface Skill {
  name: string;
  path: string;
  metadata: SkillMetadata;
  instructions: string;         // body content of SKILL.md after frontmatter
  files: {
    references: string[];       // filenames in references/
    examples: string[];         // filenames in examples/
    scripts: string[];          // filenames in scripts/
  };
}

interface ValidationResult {
  isValid: boolean;
  skillName: string;
  issues: Array<{
    field: string;
    message: string;
    severity: 'error' | 'warning';
  }>;
}

interface InstallResult {
  success: boolean;
  skillName: string;
  sourcePath: string;
  targetPath: string;
  message: string;
}
```

---

### `parseSkillMarkdown(fileContent)`

Parses the raw string content of a `SKILL.md` file. Extracts YAML frontmatter into `metadata` and returns the rest of the file as `instructions`.

```ts
import { parseSkillMarkdown } from '@rhl-ai/skills';

const raw = await fs.readFile('./skills/my-skill/SKILL.md', 'utf-8');
const { metadata, instructions } = parseSkillMarkdown(raw);

console.log(metadata.name);        // 'my-skill'
console.log(metadata.tags);        // ['typescript', 'review']
console.log(instructions);         // markdown body text
```

---

### `discoverSkills(skillsDir?)`

Scans a skills directory and returns all valid skills (those with a `SKILL.md` file), sorted alphabetically by name.

Resolution order when `skillsDir` is not provided:
1. Monorepo root `skills/` (detected via `pnpm-workspace.yaml` / `turbo.json`)
2. `skills/` relative to `process.cwd()`

```ts
import { discoverSkills } from '@rhl-ai/skills';

const skills = await discoverSkills();
// or pass a custom directory
const skills = await discoverSkills('./my-skills');

for (const skill of skills) {
  console.log(skill.name, skill.metadata.description);
}
```

---

### `loadSkill(skillDirPath)`

Loads a single skill from a directory path. Returns `null` if no `SKILL.md` is found.

```ts
import { loadSkill } from '@rhl-ai/skills';

const skill = await loadSkill('./skills/code-reviewer');
if (skill) {
  console.log(skill.metadata.version);
  console.log(skill.files.references); // ['api-spec.md', 'guidelines.md']
}
```

---

### `resolveSkillsDirectory(customDir?)`

Resolves the absolute path to the skills directory using the same resolution order as `discoverSkills`. Returns `null` if no directory is found.

```ts
import { resolveSkillsDirectory } from '@rhl-ai/skills';

const dir = await resolveSkillsDirectory();
// e.g. '/home/user/projects/rhl-ai/skills' or null
```

---

### `validateSkill(skillDirPath)`

Validates a skill directory against the required schema. Checks for:

- Directory exists
- `SKILL.md` file exists
- `name` field present in frontmatter and matches directory name
- `description` field present and at least 10 characters
- Instruction body is non-empty
- Recommended subdirectories (`references/`, `examples/`, `scripts/`) exist (warnings only)

```ts
import { validateSkill } from '@rhl-ai/skills';

const result = await validateSkill('./skills/my-skill');

if (result.isValid) {
  console.log('Skill is valid');
} else {
  for (const issue of result.issues) {
    console.log(`[${issue.severity}] ${issue.field}: ${issue.message}`);
  }
}
```

Errors block `isValid`. Warnings are reported but do not block it.

---

### `createSkill(skillName, options?)`

Scaffolds a new skill directory with a `SKILL.md` template and empty `references/`, `examples/`, and `scripts/` subdirectories. The skill name is sanitised to lowercase alphanumeric with hyphens.

```ts
import { createSkill } from '@rhl-ai/skills';

const skillPath = await createSkill('code-reviewer', {
  description: 'Expert AI code reviewer for strict TypeScript and performance.',
  author: 'Rahul Kumar',
  skillsDir: './skills',  // optional, defaults to auto-resolved skills dir
});

console.log(`Created at: ${skillPath}`);
```

| Option | Type | Description |
|---|---|---|
| `skillsDir` | `string` | Custom base directory for skills |
| `description` | `string` | Short description written into `SKILL.md` frontmatter |
| `author` | `string` | Author name written into `SKILL.md` frontmatter |

Throws if a skill with the same name already exists.

---

### `installSkill(skillName, options?)`

Copies a skill from the source skills directory to a target directory. Default target is `~/.agents/skills/<skillName>`.

```ts
import { installSkill } from '@rhl-ai/skills';

const result = await installSkill('code-reviewer', {
  targetDir: '/custom/path',  // optional
  overwrite: false,            // optional, default false
});

if (result.success) {
  console.log(result.message);
  // 'Skill code-reviewer successfully installed to ~/.agents/skills/code-reviewer'
} else {
  console.error(result.message);
}
```

| Option | Type | Default | Description |
|---|---|---|---|
| `sourceSkillsDir` | `string` | auto-resolved | Custom source skills directory |
| `targetDir` | `string` | `~/.agents/skills/` | Custom destination directory |
| `overwrite` | `boolean` | `false` | Replace existing skill at destination |

---

## License

MIT © [Rahul Kumar](https://github.com/imRahul05)
