# Source synthesis: 20 frontend performance case studies

This file records transferable engineering lessons, not copied article text.

1. **GitHub — Issues navigation**
   - Theme: navigation latency and perceived instant transitions.
   - Transferable lesson: break navigation into measurable stages, remove serial work, and reuse data/code where safe.
   - Decision signal: slow route transition with avoidable waterfall or repeated work.

2. **Notion — WASM SQLite**
   - Theme: moving data/query work into a browser-friendly local execution model.
   - Lesson: architectural changes can reduce network dependence and improve interaction when the workload is suitable; they add binary/runtime/storage complexity.
   - Decision signal: repeated local queries or computation dominate and data can safely be available client-side.

3. **Notion — faster navigation/page loads**
   - Theme: reducing navigation and page-load latency.
   - Lesson: loading strategy, caching, code splitting, and navigation architecture must be considered together.

4. **Atlassian — 75% faster builds by removing barrel files**
   - Theme: module graph/build performance.
   - Lesson: source-level import/export patterns can create large dependency traversal costs even when runtime behavior looks fine.
   - Decision signal: slow dev/build/test times with broad module graphs.

5. **Atlassian — pragmatic drag and drop**
   - Theme: responsive interaction architecture.
   - Lesson: input handling, DOM work, animation, and accessibility constraints must be balanced; interaction performance is a systems problem.

6. **Shopify — Core Web Vitals**
   - Theme: user-centric metrics.
   - Lesson: performance should be expressed in measurable user outcomes, not only engineering internals.

7. **Figma — Keeping Figma fast**
   - Theme: sustaining performance in a very complex interactive application.
   - Lesson: isolate expensive work, control rendering/data volume, and treat performance as an architectural constraint.

8. **Cloudflare — Early Hints**
   - Theme: earlier resource discovery over the network.
   - Lesson: move useful work earlier when the server knows enough to safely advertise critical resources.

9. **Framer — AVIF**
   - Theme: media encoding and delivery.
   - Lesson: image performance is a pipeline problem: encoding, selection, sizing, decoding, and network delivery all matter.

10. **Framer — traffic-aware pre-rendering**
    - Theme: adapting rendering strategy to traffic/use patterns.
    - Lesson: pre-rendering is a resource-allocation strategy; choose it where demand and freshness characteristics justify it.

11. **Framer — faster interactivity**
    - Theme: reducing time until a page can respond.
    - Lesson: hydration/client JS and critical-path execution can dominate perceived readiness.

12. **Grammarly — text input lag**
    - Theme: typing responsiveness.
    - Lesson: profile the event path and keep urgent input work small; isolate/defer expensive secondary work.

13. **Sentry — virtualization**
    - Theme: large code/data rendering.
    - Lesson: rendering only the visible subset can drastically reduce DOM/layout/paint work when list size is the bottleneck.

14. **The New York Times — React 18**
    - Theme: rendering/concurrency improvements.
    - Lesson: scheduling and rendering primitives can improve responsiveness when used around the actual workload.

15. **Vercel — microfrontends**
    - Theme: scaling frontend organization/deployment architecture.
    - Lesson: microfrontends solve ownership/deployment boundaries first; performance benefits are contextual and come with runtime/integration costs.

16. **YouTube — faster web**
    - Theme: performance at massive scale.
    - Lesson: eliminate waste across loading, rendering, data, and delivery; small per-user savings compound at scale.

17. **DoorDash — high-traffic web pages**
    - Theme: high-traffic performance and reliability.
    - Lesson: caching, rendering strategy, and operational measurement must work together under real load.

18. **Uber — mobile web at scale**
    - Theme: mobile constraints and personalization.
    - Lesson: optimize for constrained devices/networks and avoid assuming desktop conditions.

19. **Etsy — prefetching product pages from search**
    - Theme: perceived navigation speed.
    - Lesson: prefetch when user intent is predictable and the bandwidth/cache cost is justified; measure waste and hit rate.

20. **Spotify — development to real users**
    - Theme: connecting engineering changes to field outcomes.
    - Lesson: a performance story should follow the change from development measurement to real-user impact.

## Cross-cutting principles

- Measure user-visible outcomes.
- Diagnose before selecting a pattern.
- Prefer removing work over making the same work faster.
- Move work earlier only when the probability and cost justify it.
- Reduce critical-path work; defer non-critical work.
- Control rendered/data volume.
- Treat caching and prefetching as resource trade-offs.
- Treat architecture changes as justified investments, not default optimizations.
- Verify in production-like conditions.
