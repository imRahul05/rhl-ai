# @rhl-ai/utils

Shared utility functions for the RHL AI monorepo. Provides a structured logger and filesystem helpers used across all `@rhl-ai/*` packages.

## Installation

```bash
npm install @rhl-ai/utils
# or
pnpm add @rhl-ai/utils
```

## Requirements

- Node.js >= 20.0.0
- ESM project (`"type": "module"` in `package.json`)

---

## API

### Logger

A lightweight terminal logger backed by [picocolors](https://github.com/alexeyraspopov/picocolors). All output is suppressed when `isSilent` is `true`.

#### `configureLogger(config)`

Configure global logger behaviour. Can be called at startup to set verbosity.

```ts
import { configureLogger } from '@rhl-ai/utils';

configureLogger({ isVerbose: true, isSilent: false });
```

| Option | Type | Default | Description |
|---|---|---|---|
| `isVerbose` | `boolean` | `false` | Enable debug-level output |
| `isSilent` | `boolean` | `false` | Suppress all output |

#### Log functions

| Function | Output prefix | Condition |
|---|---|---|
| `logInfo(message)` | `ℹ` (cyan) | Always (unless silent) |
| `logSuccess(message)` | `✔` (green) | Always (unless silent) |
| `logWarn(message)` | `⚠` (yellow) | Always (unless silent) |
| `logError(message)` | `✖` (red) | Always (unless silent) |
| `logDebug(message)` | `⚙` (gray) | Only when `isVerbose: true` |
| `logStep(step, total, message)` | `[n/total]` (magenta) | Always (unless silent) |

```ts
import { logInfo, logSuccess, logError, logWarn, logDebug, logStep } from '@rhl-ai/utils';

logInfo('Starting process...');
logStep(1, 3, 'Resolving dependencies');
logSuccess('Done!');
logWarn('Skipped optional step');
logError('Something went wrong');
logDebug('Internal state: ready'); // only shown when isVerbose is true
```

---

### Filesystem

Async filesystem helpers built on top of `node:fs/promises`.

#### `pathExists(targetPath): Promise<boolean>`

Returns `true` if the path exists (file or directory), `false` otherwise. Never throws.

```ts
import { pathExists } from '@rhl-ai/utils';

if (await pathExists('./skills')) {
  console.log('skills directory found');
}
```

#### `ensureDir(dirPath): Promise<void>`

Creates a directory and all intermediate parent directories. Equivalent to `mkdir -p`.

```ts
import { ensureDir } from '@rhl-ai/utils';

await ensureDir('./output/nested/dir');
```

#### `readJsonFile<T>(filePath): Promise<T>`

Reads and JSON-parses a file. Returns the parsed value typed as `T`.

```ts
import { readJsonFile } from '@rhl-ai/utils';

interface Config { name: string; version: string; }
const config = await readJsonFile<Config>('./package.json');
```

#### `writeJsonFile<T>(filePath, data): Promise<void>`

Serialises `data` to JSON with 2-space indentation and writes it to `filePath`.

```ts
import { writeJsonFile } from '@rhl-ai/utils';

await writeJsonFile('./output/result.json', { status: 'ok' });
```

#### `findMonorepoRoot(startDir?): Promise<string | null>`

Walks up from `startDir` (defaults to `process.cwd()`) looking for a `pnpm-workspace.yaml` or `turbo.json`. Returns the absolute path of the monorepo root, or `null` if not found.

```ts
import { findMonorepoRoot } from '@rhl-ai/utils';

const root = await findMonorepoRoot();
// e.g. '/home/user/projects/my-monorepo' or null
```

---

## TypeScript

This package ships full TypeScript types. The exported `LoggerConfig` interface is available if you need to type logger configuration objects:

```ts
import type { LoggerConfig } from '@rhl-ai/utils';

const config: Partial<LoggerConfig> = { isVerbose: true };
```

---

## License

MIT © [Rahul Kumar](https://github.com/imRahul05)
