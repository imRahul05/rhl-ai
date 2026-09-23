# Build and dependency performance

When builds/dev server/tests are slow, inspect the module graph and build trace.

Look for barrel exports, broad re-exports, duplicate dependencies, expensive transforms, and unnecessary generated work.

Verify cold build, incremental rebuild, test startup, and dependency graph changes.
