# Browser Evidence: Delegation Prompt, Annotation and Recording

Browser testing is **mandatory** for any UI/frontend change. It is mechanical work, so delegate it to the cheapest, fastest model tier at low effort, then review the output yourself before it goes in the PR.

## 1. Pick the cheap subagent

Use whatever the cheapest tier is in your host, at low reasoning effort:

| Host | Delegate to |
|---|---|
| Claude Code | Agent/Task tool with `model: haiku` (e.g. Claude Haiku 5.5) |
| Gemini CLI | a Flash-tier model (e.g. Gemini 3.8 Flash) at low thinking |
| Codex | the cheapest "mini" tier at low reasoning effort |
| Cursor / other | the cheapest model the tool lets you pick for a sub-task |
| No subagents | do it yourself, but keep the same steps |

The cheap model **gathers**; you (the main agent) **judge**. Open every returned image and check: right page, the change is visible, red box on the right element, no real data, no error overlays. Re-run or fix if not.

## 2. Delegation prompt template

Fill the `<...>` fields from the diff, then hand this to the subagent verbatim.

```text
You are capturing visual evidence for a pull request. Do not edit any source code.

Repo: <absolute path>. Base ref: <e.g. origin/main>. PR branch: <current branch>.
Changed UI: <routes/components changed and the exact user flow(s) to exercise, step by step>.
App start command: <e.g. pnpm --filter web dev>, URL: <http://localhost:3000>. Wait for the URL to respond before starting.
Test data: use only synthetic/seed data. If you see anything that looks like a real name, email, token or internal hostname, stop and report it instead of capturing.
Output dir: <repo>/.pr-assets/ (do not commit it; the main agent decides).

Steps:
1. BEFORE: check out the base ref in a separate worktree (`git worktree add ../base-wt <base>`; install deps if needed), start the app there, and capture screenshots of each changed page/state at desktop 1280x800 and mobile 390x844. Name them before-<flow>-desktop.png / before-<flow>-mobile.png. Stop that server.
2. AFTER: start the app from the PR branch and capture the same states at the same viewports: after-<flow>-<viewport>.png.
3. ANNOTATE the AFTER shots: use the annotate() helper from references/browser-evidence.md to draw a red box and arrow around each element that changed (and a short label), then save as after-<flow>-<viewport>-annotated.png. Keep the un-annotated copy too.
4. RECORD: for any multi-step flow or state transition, record with Playwright recordVideo (desktop only), then convert to GIF with ffmpeg if available (fps 10, width 960). Aim for under 5 MB and under 15 seconds; trim idle time.
5. CONSOLE: listen for console errors and page errors during every step and report them.
6. Clean up: stop servers, remove the worktree.

Return exactly: (a) a list of absolute file paths created, (b) a 3-line summary (what you captured, any console errors, anything that looked wrong or surprising), (c) any step you could not complete and why.
```

If the browser stack is not installed: `npx playwright install chromium`. If the host has a built-in browser tool, the subagent may use it instead of Playwright; the output contract is the same.

## 3. Annotation helper (Playwright, tested)

Injects an absolutely positioned red outline, an arrow, and a label, so the screenshot shows exactly what changed. Call it right before `page.screenshot()`; it removes any previous annotations first. Pass `fullPage: true` to the screenshot if the target is below the fold.

```js
/** Draw red outline + arrow overlays around elements matching `selector`. */
async function annotate(page, selector, { label = '' } = {}) {
  await page.evaluate(({ selector, label }) => {
    document.querySelectorAll('[data-pr-annot]').forEach((n) => n.remove());
    const el = document.querySelector(selector);
    if (!el) throw new Error('annotate: selector not found: ' + selector);
    el.scrollIntoView({ block: 'center' });
    const r = el.getBoundingClientRect();
    const sx = window.scrollX, sy = window.scrollY, pad = 6;
    const mk = (css) => {
      const d = document.createElement('div');
      d.setAttribute('data-pr-annot', '');
      d.style.cssText = 'position:absolute;pointer-events:none;z-index:2147483647;' + css;
      document.body.appendChild(d);
      return d;
    };
    mk(`left:${r.left + sx - pad}px;top:${r.top + sy - pad}px;width:${r.width + pad * 2}px;height:${r.height + pad * 2}px;border:3px solid #ff0000;border-radius:6px;box-shadow:0 0 0 2px rgba(255,255,255,.8)`);
    // Arrow: horizontal, left of the box, pointing at it (flips to the right edge if no room).
    const len = 80, cy = r.top + sy + r.height / 2;
    const fromLeft = r.left - pad - len - 12 > 0;
    const tailX = fromLeft ? r.left + sx - pad - len : r.right + sx + pad + len;
    const headX = fromLeft ? r.left + sx - pad - 2 : r.right + sx + pad + 2;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('data-pr-annot', '');
    svg.style.cssText = `position:absolute;left:0;top:0;width:${document.documentElement.scrollWidth}px;height:${document.documentElement.scrollHeight}px;pointer-events:none;z-index:2147483647`;
    svg.innerHTML = `<defs><marker id="pr-ah" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ff0000"/></marker></defs>
      <line x1="${tailX}" y1="${cy}" x2="${headX}" y2="${cy}" stroke="#ff0000" stroke-width="4" marker-end="url(#pr-ah)"/>`;
    document.body.appendChild(svg);
    if (label) {
      // Label sits under the arrow tail, clamped inside the viewport.
      const t = mk(`left:0;top:${cy + 10}px;background:#ff0000;color:#fff;font:bold 13px sans-serif;padding:2px 6px;border-radius:4px;white-space:nowrap`);
      t.textContent = label;
      const w = t.offsetWidth;
      t.style.left = Math.max(4, Math.min(tailX - 4, window.scrollX + window.innerWidth - w - 4)) + 'px';
    }
  }, { selector, label });
}
```

Usage:

```js
await page.screenshot({ path: 'before-home-desktop.png' });            // on base
await annotate(page, '[data-testid="notif-badge"]', { label: 'New unread badge' });
await page.screenshot({ path: 'after-home-desktop-annotated.png' });    // on PR branch
```

To box several elements, call `annotate` once per element in separate screenshots, or adapt the helper to loop over `querySelectorAll`. No Playwright? ImageMagick works on an existing PNG with known pixel coordinates:

```bash
convert after.png -fill none -stroke red -strokewidth 4 -draw "rectangle 1200,20 1270,50" \
  -draw "line 1100,35 1195,35" annotated.png
```

## 4. Recording a flow and making a GIF

```js
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  recordVideo: { dir: 'video', size: { width: 960, height: 600 } },
});
const page = await ctx.newPage();
// ... perform the flow with short waits (page.waitForTimeout(500)) so each state is visible ...
await ctx.close(); // the video file is only finalized on close
```

```bash
ffmpeg -y -i video/<file>.webm \
  -vf "fps=10,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" flow.gif
```

Keep GIFs small (fps 10, width about 960, under about 5 MB; GitHub rejects larger attachments). If it is too big, lower fps to 8, width to 720, or trim the flow. No ffmpeg: ship the `.webm` via the GitHub web UI, or just use screenshots of each step.

## 5. Getting images into the PR

Images and videos cannot be attached through `gh` or the REST API directly. Options, best first:

1. **Assets branch.** Commit files to a non-default branch (e.g. `pr-assets`) under `pr/<number-or-slug>/`, then link `https://github.com/<org>/<repo>/blob/pr-assets/pr/<n>/after.png?raw=true`. Works for private repos for viewers with access. Keeps the PR diff clean.
2. **PR branch under `docs/pr-assets/<slug>/`.** Simplest, but it adds binaries to the diff and history; delete them before merge or squash.
3. **Web UI drag-and-drop** into the PR description/comment (also the only way to inline a real `.mp4`). Ask the human to do it if you cannot.
4. **Host attachment feature** if your tool has one.

From the CLI prefer **GIF over video**. Before uploading, re-check every image for sensitive data (real names, emails, tokens, internal URLs, browser bookmarks or tabs visible in the frame).
