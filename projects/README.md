# Projects & Experiments

This directory is designated for experimental applications, proofs of concept (PoCs), and internal tools built on top of RHL AI packages and skills.

## Projects

### [`github-whatsapp-bot`](./github-whatsapp-bot)

A CLI tool and webhook service (`create-github-whatsapp-notifier`) that listens for GitHub webhook events (pull requests, issues, assignments, reviews) and sends formatted WhatsApp notifications via Twilio. Its template lives in [`templates/whatsapp-bot`](../templates/whatsapp-bot), so it is also available as `rhl create whatsapp-bot <name>`; this package copies it in at build time.

> **Publishing paused:** `create-github-whatsapp-notifier` is marked `"private": true` so the Release workflow skips it until its npm Trusted Publisher is fixed (owner `imRahul05`). To resume, remove `"private": true` from its `package.json`; the next release publishes its pending version. Its template is still available through `rhl create whatsapp-bot`.

## Guidelines

- **Autonomous Experiments**: Keep experiments decoupled from core monorepo packages.
- **Consumption of Workspace Packages**: Reference packages using the `workspace:*` protocol in your experiment's `package.json`.
- **Graduation**: Successful experiments can be promoted into standalone packages in `packages/` or canonical starter templates in `templates/`.
