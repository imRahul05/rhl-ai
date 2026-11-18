# PR Description Template (generic)

Copy everything below the line into the PR body. Replace every `<placeholder>` from facts you verified in the target repo. Delete HTML comments before submitting only if the host renders them noisily (GitHub hides them). Never leave a box checked that you did not earn.

Adapt the lists in sections 2 and 5 to the repo: inspect `pnpm-workspace.yaml`, `package.json` `workspaces`, `turbo.json`, `nx.json`, `go.work`, `Cargo.toml` workspace members, or top-level directories, plus `Makefile` / CI config for commands. Remove rows that do not exist in this repo; add rows for layers it does have.

---

## At a Glance

<!-- Fill this table first so reviewers can scan impact without reading the diff -->

| Dimension | Status / Summary |
|---|---|
| **Spec / Requirement** | `<ticket, ADR, or acceptance-criteria id>` <!-- or N/A — infra/docs/refactor --> |
| **Issue** | `Refs #<num>` <!-- Refs for partial work; Closes #<num> only when 100% complete --> |
| **Layers Touched** | <!-- e.g. Frontend + Backend / API / DB / Infra / AI --> |
| **AI Behavior Impact** | <!-- None / Prompt / Model / Schema / Eval --> |
| **Compliance & Sensitive Data** | <!-- Cited / N/A · Zero secrets, PII or real customer data in PR, logs, screenshots --> |
| **Visual Evidence** | <!-- Before/After + Red Boxes & Arrows / Video or GIF / N/A --> |
| **Verification** | <!-- Scoped build+lint+typecheck+test / CI / manual run --> |

---

## 1. Summary & What Changed

- **Why:** <!-- 1–2 sentences on the problem, requirement, or bug -->
- **What:** <!-- Bullet list of concrete behavior / API / UI changes, each backed by the diff -->
- **Deferred / Out of Scope:** <!-- Anything intentionally left out, or "None" -->

---

## 2. Scope — What This PR Touches

### Layers & Apps
<!-- Replace with the repo's real apps/layers (from workspace config) -->
- [ ] **Frontend** (`<list your frontend apps / UI packages>`)
- [ ] **Backend** (`<list your services / workers / APIs>`)
- [ ] **Both (Full-Stack)**
- [ ] **Infra / CI / Docs only** (`<.github/, scripts/, docs/ …>`)

### Core Packages & Boundaries
<!-- List your shared packages/modules grouped by responsibility; keep only the ones that exist -->
- [ ] **API Contracts & Validation:** `<shared types, schemas, API client>`
- [ ] **Auth / Permissions / Multi-tenancy:** `<auth, authz, audit packages>`
- [ ] **Domain / Business Logic:** `<domain packages>`
- [ ] **Database:** `<db package>` (migration included if schema changed)
- [ ] **Config / Telemetry / Logging:** `<config, logger, telemetry packages>`
- [ ] **AI / Agents:** `<agent package>` (see §3)

### API Endpoints Touched (if applicable)
<!-- List method + path + auth/permission gate, or write "None" -->
- `N/A`

---

## 3. AI Behavior, Prompts & Model Impact

- [ ] **N/A** — This PR does not touch prompts, model configs, AI schemas, evals, or AI-generated UI content.

**If AI is touched, check all that apply:**
- [ ] **Model / Tier / Effort:** (`<config file path>`) — Describe change: `...`
- [ ] **Prompt & Eval:** Bumped prompt version (`<version scheme>`) and updated eval cases (`<evals path>`)
- [ ] **Input / Output Schema:** Minimum-necessary fields sent to the model; shared schema updated (`<schema path>`)
- [ ] **Data Sensitivity:** Sensitive/regulated data only routed to endpoints approved for it (`<policy ref>`)
- [ ] **Human-in-the-Loop:** AI output remains a draft requiring explicit human confirmation; audit logging intact

---

## 4. Spec, Regulations & Repo Rules

- [ ] **Spec Authority:** Every behavior change maps to a requirement / ticket / ADR (no invented thresholds or defaults)
- [ ] **Regulations / Standards Cited:** `<specific law, standard, section, and rationale>` cited where relevant — or **N/A** with reason (stricter-than-required choices labeled as **our policy**)
- [ ] **Zero Sensitive Data:** No real personal data (names, emails, IDs, DOBs, addresses), secrets, tokens, or internal hostnames in PR text, code comments, logs, URLs, screenshots, or videos
- [ ] **Repo Constraints:** `<rules from CONTRIBUTING / AGENTS.md / CLAUDE.md, e.g. no new mocks, test policy>` respected
- [ ] **Living Docs:** `<CHANGELOG / progress file / docs>` updated; `.env*.example` and deployment docs updated if env vars changed

---

## 5. Verification

> Check every command actually run **after the final edit** and that passed. Mark `N/A` only if untouched. Never check a box for a command you did not run.

- [ ] **Scoped Check (Required):** `<lint + typecheck + build for touched workspaces, e.g. pnpm turbo run lint typecheck build --filter=<pkg>>`
- [ ] **Typecheck & Build:** `<repo typecheck && build commands>`
- [ ] **Lint & Repo Checks:** `<lint + any repo-specific checks>`
- [ ] **Bundle / Size Guard** *(if frontend touched and the repo has one)*: `<command>`
- [ ] **Tests:** `<test command>`
- [ ] **AI Evals** *(if §3 applies)*: `<eval command>`
- [ ] **Real-Stack / Manual Verification:** `<dev server, smoke script, e2e>`

<details>
<summary>Command Output / Notes (optional)</summary>

```text
Paste short pass/fail summaries here (counts, exit codes) — not full logs
```

</details>

---

## 6. Visual Evidence (Required for UI / Frontend Changes)

- [ ] **N/A** — No UI or visual changes in this PR.
- [ ] **Annotated Screenshots:** Before & After images include **red boxes and arrows** clearly calling out *what* changed and *how*.
- [ ] **Zero Sensitive Data Confirmed:** All screenshots, videos, and GIFs use synthetic/redacted data only.

### Before vs. After

| Before | After (Red Box + Arrows Highlighting Change) |
|---|---|
| <!-- Drag & drop Before image here --> | <!-- Drag & drop annotated After image here --> |

### Video or GIF Recording *(Required for major UI flows, multi-step interactions, or state transitions)*

<!-- Attach either an animated GIF or video (.gif / .mp4 / .webm) here, or write "N/A — minor static change".
     Videos cannot be uploaded directly via terminal/GitHub CLI: attach an animated GIF when working from the CLI, or drop a video in via the GitHub web UI. -->
