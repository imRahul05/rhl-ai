# Changesets

This directory holds changeset markdown entries that track package versions and changelogs.

## Creating a Changeset

When you make changes to one or more packages under `packages/`, create a changeset by running:

```bash
pnpm changeset
```

Follow the interactive prompts to select which packages changed, choose version bumps (patch, minor, major), and enter a summary of the change.

## Versioning Packages

To apply changesets and bump package versions in their respective `package.json` files:

```bash
pnpm version-packages
```

## Publishing Packages

To build and publish changed packages to npm:

```bash
pnpm release
```
