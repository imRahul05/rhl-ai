# RHL AI Starter Templates

This directory contains starter templates used by the project scaffolder (`@rhl-ai/scaffold` and `rhl create`).

## Available Templates

- **`nextjs/`**: Next.js App Router starter with TypeScript, Tailwind CSS, and strict linting.
- **`react/`**: Modern React single-page application powered by Vite, TypeScript, and Tailwind CSS.
- **`node/`**: Lightweight Node.js TypeScript starter for microservices, background workers, or CLI tools.

## Template Placeholders

When scaffolding via `rhl create <template> <project-name>`, the scaffolding engine substitutes:

- `{{PROJECT_NAME}}`: The user-provided project name (e.g. `MyProject`).
- `{{PACKAGE_NAME}}`: Kebab-cased package name (e.g. `my-project`).

## Adding a New Template

1. Create a folder under `templates/<template-name>/`.
2. Add a `README.md` explaining the stack.
3. Configure `package.json`, `tsconfig.json`, and sample source code.
4. Verify with `rhl create <template-name> test-app`.
