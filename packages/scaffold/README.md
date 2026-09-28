# @rhl-ai/scaffold

Project template scaffolding engine for RHL AI. Discovers templates from a `templates/` directory, lists available templates, and copies them to a target location with variable interpolation.

## Installation

```bash
npm install @rhl-ai/scaffold
# or
pnpm add @rhl-ai/scaffold
```

## Requirements

- Node.js >= 20.0.0
- ESM or CJS project (dual `esm`/`cjs` build shipped)

---

## Template Directory Structure

Templates are subdirectories inside a `templates/` folder at the monorepo root (or `process.cwd()`):

```
templates/
└── my-template/
    ├── README.md          # First non-heading line used as description
    ├── package.json       # Supports {{PROJECT_NAME}} / {{PACKAGE_NAME}} tokens
    └── src/
        └── index.ts
```

### Template variable tokens

These tokens are replaced in all text files (`.json`, `.md`, `.ts`, `.tsx`, `.js`, `.jsx`, `.html`, `.css`, `.yaml`, `.yml`, `.txt`, `.env`, `.gitignore`) during scaffolding:

| Token | Replaced with |
|---|---|
| `{{PROJECT_NAME}}` | The project name as provided |
| `{{PACKAGE_NAME}}` | Lowercased project name with non-alphanumeric chars replaced by `-` |

`node_modules/`, `.turbo/`, and `dist/` directories inside templates are skipped during copy.

---

## API

### Types

```ts
interface TemplateInfo {
  name: string;
  path: string;
  description: string;  // from first non-heading line of README.md, or fallback
}

interface ScaffoldOptions {
  template: string;       // template directory name
  projectName: string;    // name for the new project
  targetDir?: string;     // where to create the project (default: process.cwd())
  overwrite?: boolean;    // replace target if it already exists
  templatesDir?: string;  // custom templates directory path
}

interface ScaffoldResult {
  success: boolean;
  template: string;
  projectName: string;
  targetPath: string;
  message: string;
}
```

---

### `resolveTemplatesDirectory(customDir?)`

Resolves the absolute path to the templates directory.

Resolution order when `customDir` is not provided:
1. `templates/` at the monorepo root (detected via `pnpm-workspace.yaml` / `turbo.json`)
2. `templates/` relative to `process.cwd()`

Returns `null` if no directory is found.

```ts
import { resolveTemplatesDirectory } from '@rhl-ai/scaffold';

const dir = await resolveTemplatesDirectory();
// e.g. '/home/user/projects/rhl-ai/templates' or null

const custom = await resolveTemplatesDirectory('./my-templates');
```

---

### `listTemplates(templatesDir?)`

Returns all template directories found, sorted alphabetically. Each entry includes the template name, absolute path, and a description extracted from the first non-heading line of `README.md` (if present).

```ts
import { listTemplates } from '@rhl-ai/scaffold';

const templates = await listTemplates();

for (const t of templates) {
  console.log(`${t.name}: ${t.description}`);
}
// e.g. 'nextjs-app: Starter template for Next.js with TypeScript and Tailwind'
```

---

### `scaffoldProject(options)`

Copies a template to the target location, replacing `{{PROJECT_NAME}}` and `{{PACKAGE_NAME}}` tokens throughout all text files. If `overwrite` is `true` and the target already exists, it is deleted first.

```ts
import { scaffoldProject } from '@rhl-ai/scaffold';

const result = await scaffoldProject({
  template: 'nextjs-app',
  projectName: 'my-new-app',
  targetDir: './projects',   // optional, defaults to process.cwd()
  overwrite: false,          // optional, default false
});

if (result.success) {
  console.log(result.message);
  // "Project 'my-new-app' created successfully from template 'nextjs-app'."
  console.log(result.targetPath);
  // '/absolute/path/to/projects/my-new-app'
} else {
  console.error(result.message);
}
```

Returns a `ScaffoldResult` with `success: false` (and a descriptive `message`) if:
- The templates directory cannot be located
- The requested template does not exist
- The target directory already exists and `overwrite` is `false`

---

## License

MIT © [Rahul Kumar](https://github.com/imRahul05)
