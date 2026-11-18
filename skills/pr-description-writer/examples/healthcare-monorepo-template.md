## At a Glance

<!-- Fill this table first so reviewers can scan impact without reading the diff -->

| Dimension | Status / Summary |
|---|---|
| **Spec / AC** | `AC-x-nn-n` <!-- or N/A — infra/docs --> |
| **Issue** | `Refs #<num>` <!-- use Refs for partial fixes; Closes #<num> only when 100% complete --> |
| **Layers Touched** | <!-- e.g. Frontend + Backend / API / DB / FHIR / AI --> |
| **AI Behavior Impact** | <!-- None / Prompt / Model / Schema / Eval --> |
| **Regulations & PHI** | <!-- Cited / N/A · Zero PHI in PR, logs, screenshots --> |
| **Visual Evidence** | <!-- Before/After + Red Boxes & Arrows / Video or GIF / N/A --> |
| **Verification** | <!-- Scoped build+lint+typecheck / CI / dev:real --> |

---

## 1. Summary & What Changed

- **Why:** <!-- 1–2 sentences on the problem or AC -->
- **What:** <!-- Bullet list of concrete behavior/API/UI changes -->
- **Deferred / Out of Scope:** <!-- List anything intentionally left out, or "None" -->

---

## 2. Scope — What This PR Touches

### Layer & Apps
- [ ] **Frontend** (`apps/web`, `@asc/ui`)
- [ ] **Backend** (`apps/api`, `apps/worker`, `apps/bots`)
- [ ] **Both (Full-Stack)**
- [ ] **Infra / CI / Docs only** (`.github/`, `scripts/`, `docs/`, `PROGRESS.md`)

### Core Packages & Boundaries (`packages/*`)
- [ ] **API Contracts & Validation:** `@asc/api-client`, `@asc/validation`, `@asc/types`
- [ ] **Authz & Tenancy:** `@asc/authz`, `@asc/break-glass`, `@asc/audit`
- [ ] **Clinical & FHIR:** `@asc/clinical-rules`, `@asc/fhir` (`CAPABILITY_DATA_NEEDS` updated if new FHIR types touched)
- [ ] **Database (Drizzle / Postgres):** `@asc/db` (migration included if schema changed)
- [ ] **Config / Telemetry / Logging:** `@asc/config`, `@asc/logger`, `@asc/telemetry`
- [ ] **AI Agents:** `@asc/agents` (see §3 below)

### API Endpoints Touched (if applicable)
<!-- List method + path + capability gate, or write "None" -->
- `N/A`

---

## 3. AI Behavior, Prompts & Model Impact

- [ ] **N/A** — This PR does not touch `@asc/agents`, prompts, model configs, or AI UI drafts.

**If AI is touched, check all that apply:**
- [ ] **Model / Tier / Effort:** (`packages/agents/src/config/agents.ts`, `tasks.ts`) — Describe change: `...`
- [ ] **Prompt & Eval:** Bumped `PROMPT_VERSION` (`YYYY-MM-DD.N`) in `prompt.ts` and updated `evals/cases.ts`
- [ ] **Input / Output Schema:** Minimum-necessary fields in `input.ts`; shared Zod schema in `@asc/validation/src/agents/*`
- [ ] **PHI & BAA Safety:** `handlesPhi` / `containsPhi` verified; PHI only routed to BAA-covered endpoints
- [ ] **Clinician-in-the-Loop:** AI output remains a **draft** requiring explicit clinician confirmation; `@asc/audit` `agent.run` logging intact

---

## 4. Spec, Regulations & Repo Rules

- [ ] **Spec Authority:** Every behavior change maps to an `AC-x-nn-n` in Master Requirements / Build Spec (no invented thresholds/defaults)
- [ ] **US Regulations Cited:** Specific regulation, section (e.g., CMS 42 CFR § 416.52, 45 CFR § 149), and rationale cited in code comments (stricter choices labeled as **our policy**)
- [ ] **Zero PHI:** No real patient data, names, MRNs, DOBs, or identifiers in PR text, code comments, logs, URLs, screenshots, or videos
- [ ] **Dev-Mode Constraints:** No new/extended MSW mocks (`apps/web/src/mocks`) and no new test files (`*.test.*`, `*.spec.*`, `__tests__/`)
- [ ] **Living Docs:** `PROGRESS.md` updated in this branch; `.env*.example` & `docs/DEPLOYMENT_CONFIGURATION.md` updated if env vars changed

---

## 5. Verification

> Check every command actually run **after the final edit** (mark `N/A` only if untouched).

- [ ] **Scoped Check (Required):** `pnpm turbo run lint check-types build --filter=<touched workspaces>`
- [ ] **Typecheck & Build:** `pnpm typecheck && pnpm build`
- [ ] **Lint & Repo Checks:** `pnpm lint && pnpm lm:check && pnpm docs:check`
- [ ] **Web Bundle Guard** *(if `apps/web` or `@asc/ui` touched)*: `pnpm check:bundle && pnpm --filter web test:bundles`
- [ ] **Tests:** `pnpm test`
- [ ] **AI Evals** *(if `@asc/agents` touched)*: `pnpm eval` / `pnpm eval:real`
- [ ] **Real-Stack Verification:** `pnpm dev:real` / `pnpm smoke:personas`

<details>
<summary>Command Output / Notes (optional)</summary>

```text
Paste relevant pass/summary output here
```

</details>

---

## 6. Visual Evidence (Required for UI / `apps/web` / `@asc/ui` Changes)

- [ ] **N/A** — No UI or visual changes in this PR.
- [ ] **Annotated Screenshots:** Before & After images include **red boxes and arrows** clearly calling out *what* changed and *how*.
- [ ] **Zero PHI Confirmed:** All screenshots, videos, and GIFs use synthetic/redacted data only.

### Before vs. After

| Before | After (Red Box + Arrows Highlighting Change) |
|---|---|
| <!-- Drag & drop Before image here --> | <!-- Drag & drop annotated After image here --> |

### Video or GIF Recording *(Required for major UI flows, multi-step interactions, or state transitions)*

<!-- Attach either an animated GIF or video (.gif / .mp4 / .webm) here, or write "N/A — minor static change".
     Note: Since videos cannot be uploaded directly via terminal/GitHub CLI, attach an animated GIF when working from the CLI, or drop in a video via the GitHub Web UI. -->
