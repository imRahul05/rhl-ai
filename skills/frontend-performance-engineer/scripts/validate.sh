#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"

echo "==> Validating frontend-performance-engineer skill assets..."

test -f "$SKILL_DIR/SKILL.md" || { echo "Missing SKILL.md"; exit 1; }
test -d "$SKILL_DIR/decision-framework" || { echo "Missing decision-framework directory"; exit 1; }
test -d "$SKILL_DIR/knowledge" || { echo "Missing knowledge directory"; exit 1; }
test -d "$SKILL_DIR/patterns" || { echo "Missing patterns directory"; exit 1; }
test -d "$SKILL_DIR/examples" || { echo "Missing examples directory"; exit 1; }
test -f "$SKILL_DIR/evaluation.md" || { echo "Missing evaluation.md"; exit 1; }

echo "==> All 25+ skill documents verified successfully!"
