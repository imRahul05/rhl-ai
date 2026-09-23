# Frontend Performance Engineer — Agent Skill

A decision-oriented performance skill distilled from 20 frontend performance case studies plus current web-performance/agent-skill practices.

## What makes it different

This is not a checklist that tells an agent to apply every optimization. It forces a loop:

**Measure → Localize → Select pattern → Check fit/trade-offs → Implement → Verify → Guard**

## Included

- `SKILL.md` — activation, workflow, decision rules, output contract
- `knowledge/source-synthesis.md` — transferable lessons from all 20 case studies
- `decision-framework/pattern-selection.md` — symptom-to-pattern decision matrix
- `decision-framework/tradeoffs.md` — failure modes and costs
- `patterns/` — focused playbooks
- `knowledge/` — measurement, metrics, React/Next.js guidance
- `evaluation.md` — routing and behavior tests

## Installation

For Claude Code / compatible agent skill systems, place this directory under the agent's skills directory. The exact location depends on the host tool.

## Recommended companion tooling

Use Chrome DevTools/Lighthouse/CrUX or equivalent runtime evidence when available. The skill deliberately keeps source-code findings separate from measured runtime findings.

## Source note

The 20 case studies are represented as engineering lessons and decision signals. The skill does not copy article text; it turns the themes into reusable agent behavior.
