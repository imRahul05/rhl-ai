# Worked Example: UI change in a generic web app

A complete, correctly filled description for a small UI change. All data is synthetic. Note: sections that do not apply are marked **N/A with a reason**, only commands that were actually run (after the final edit) are checked, and the evidence table points at real image files (placeholders here).

**PR title:** `feat(web): show unread count badge on notifications bell`

---

## At a Glance

| Dimension | Status / Summary |
|---|---|
| **Spec / Requirement** | `NOTIF-42` (ticket) |
| **Issue** | `Refs #318` (mark-all-read button deferred, see §1) |
| **Layers Touched** | Frontend only (`apps/web`, `packages/ui`) |
| **AI Behavior Impact** | None |
| **Compliance & Sensitive Data** | N/A — no regulated data · Synthetic users only in screenshots |
| **Visual Evidence** | Before/After with red boxes + arrows (desktop, mobile) · GIF of open/dismiss flow |
| **Verification** | Scoped lint + typecheck + build + tests passed; manual browser run |

---

## 1. Summary & What Changed

- **Why:** Users could not tell they had new notifications without opening the popover (NOTIF-42).
- **What:**
  - `NotificationBell` renders a numeric badge when `unreadCount > 0` (caps at `99+`).
  - Badge has an `aria-label` ("3 unread notifications") and is hidden when the count is 0.
  - `useNotifications` now exposes `unreadCount` derived from the existing list query (no new request).
- **Deferred / Out of Scope:** "Mark all as read" button (tracked in #318); push/realtime updates.

---

## 2. Scope — What This PR Touches

### Layers & Apps
- [x] **Frontend** (`apps/web`, `packages/ui`)
- [ ] **Backend** (`apps/api`, `apps/worker`)
- [ ] **Both (Full-Stack)**
- [ ] **Infra / CI / Docs only**

### Core Packages & Boundaries
- [ ] **API Contracts & Validation:** unchanged
- [ ] **Auth / Permissions / Multi-tenancy:** unchanged
- [x] **Domain / Business Logic:** `packages/ui` (`NotificationBell` only)
- [ ] **Database:** unchanged
- [ ] **Config / Telemetry / Logging:** unchanged
- [ ] **AI / Agents:** unchanged

### API Endpoints Touched
- `N/A` — reuses the existing `GET /api/notifications` response; no contract change.

---

## 3. AI Behavior, Prompts & Model Impact

- [x] **N/A** — This PR does not touch prompts, model configs, AI schemas, evals, or AI-generated UI content.

---

## 4. Spec, Regulations & Repo Rules

- [x] **Spec Authority:** Badge cap (`99+`) and hide-at-zero come from NOTIF-42; no invented defaults.
- [ ] **Regulations / Standards Cited:** **N/A** — no regulated data. (Accessibility: badge text meets WCAG 2.1 AA contrast, 4.8:1, checked in the browser.)
- [x] **Zero Sensitive Data:** Synthetic users (`Test User A`) only; no real emails or tokens in screenshots.
- [x] **Repo Constraints:** No new dependencies; follows `CONTRIBUTING.md` component conventions.
- [ ] **Living Docs:** **N/A** — no env vars or docs affected.

---

## 5. Verification

- [x] **Scoped Check (Required):** `pnpm turbo run lint typecheck build --filter=web --filter=@acme/ui` — passed
- [x] **Typecheck & Build:** covered by the scoped check above (same tasks, same filter)
- [x] **Lint & Repo Checks:** covered by the scoped check above
- [ ] **Bundle / Size Guard:** **N/A** — repo has none
- [x] **Tests:** `pnpm turbo run test --filter=@acme/ui` — 41 passed, 0 failed
- [ ] **AI Evals:** **N/A** — §3 not applicable
- [x] **Real-Stack / Manual Verification:** `pnpm --filter web dev`, exercised bell with 0, 3 and 120 unread items in Chromium; console clean

<details>
<summary>Command Output / Notes (optional)</summary>

```text
Tasks: 6 successful, 6 total  (lint, typecheck, build)
@acme/ui test: Tests 41 passed (41)
Browser run: 0 console errors, 0 warnings
```

</details>

---

## 6. Visual Evidence

- [ ] **N/A**
- [x] **Annotated Screenshots:** Before & After include red boxes and arrows around the bell badge.
- [x] **Zero Sensitive Data Confirmed:** Synthetic data only.

### Before vs. After

**Desktop (1280x800)**

| Before | After (Red Box + Arrows Highlighting Change) |
|---|---|
| ![before-desktop](https://github.com/<org>/<repo>/blob/pr-assets/318/before-desktop.png?raw=true) | ![after-desktop](https://github.com/<org>/<repo>/blob/pr-assets/318/after-desktop-annotated.png?raw=true) |

**Mobile (390x844)**

| Before | After (Red Box + Arrows Highlighting Change) |
|---|---|
| ![before-mobile](https://github.com/<org>/<repo>/blob/pr-assets/318/before-mobile.png?raw=true) | ![after-mobile](https://github.com/<org>/<repo>/blob/pr-assets/318/after-mobile-annotated.png?raw=true) |

### Video or GIF Recording

![open-and-dismiss](https://github.com/<org>/<repo>/blob/pr-assets/318/flow.gif?raw=true)

*Flow: load with 3 unread, open popover, dismiss one, badge decrements to 2.*
