#!/usr/bin/env bash
set -euo pipefail

echo "==> Validating code-reviewer skill assets..."
test -f "$(dirname "$0")/../SKILL.md" || { echo "Missing SKILL.md"; exit 1; }
test -d "$(dirname "$0")/../references" || { echo "Missing references dir"; exit 1; }
test -d "$(dirname "$0")/../examples" || { echo "Missing examples dir"; exit 1; }
echo "==> All skill assets present!"
