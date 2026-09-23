# Projects & Experiments

This directory is designated for experimental applications, proofs of concept (PoCs), and internal tools built on top of RHL AI packages and skills.

## Projects

### [`github-whatsapp-bot`](file:///projects/github-whatsapp-bot)

A CLI tool and webhook service (`create-github-whatsapp-notifier`) that listens for GitHub webhook events (pull requests, issues, assignments, reviews) and sends formatted WhatsApp notifications via Twilio.

## Guidelines

- **Autonomous Experiments**: Keep experiments decoupled from core monorepo packages.
- **Consumption of Workspace Packages**: Reference packages using the `workspace:*` protocol in your experiment's `package.json`.
- **Graduation**: Successful experiments can be promoted into standalone packages in `packages/` or canonical starter templates in `templates/`.
