#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"

echo "==> Validating pr-description-writer skill assets..."

test -f "$SKILL_DIR/SKILL.md" || { echo "Missing SKILL.md"; exit 1; }
test -f "$SKILL_DIR/README.md" || { echo "Missing README.md"; exit 1; }
test -f "$SKILL_DIR/references/template.md" || { echo "Missing references/template.md"; exit 1; }
test -f "$SKILL_DIR/references/browser-evidence.md" || { echo "Missing references/browser-evidence.md"; exit 1; }
test -f "$SKILL_DIR/examples/healthcare-monorepo-template.md" || { echo "Missing healthcare example template"; exit 1; }
test -f "$SKILL_DIR/examples/filled-example.md" || { echo "Missing filled example"; exit 1; }

echo "==> All skill assets present!"
