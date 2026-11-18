#!/usr/bin/env node
/**
 * Root `prepublishOnly` guard. npm/pnpm run it before their own `private`
 * check, so an accidental `npm publish` from the repository root fails here
 * with an explanation instead of a bare EPRIVATE.
 *
 * The root package (`rhl-ai-monorepo`) is the workspace container and is
 * private on purpose. It is never published.
 */
console.error(`
✖ Refusing to publish the monorepo root (rhl-ai-monorepo is private on purpose).

  You ran a publish command from the repository root. Publish a workspace package instead:

    Normal releases (CI):   merge the "Version Packages" PR; the Release workflow runs
                            \`changeset publish\` for every package whose version is not on npm.

    One-time bootstrap of a brand-new package (manual, with your npm 2FA):
                            cd skills/<name>   # or packages/<name>, projects/<name>
                            npm publish --access public

  See "Releasing" in README.md.
`);
process.exit(1);
