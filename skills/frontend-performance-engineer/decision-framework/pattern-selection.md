# Pattern selection matrix

| Symptom / evidence             | First investigate               | Candidate patterns                                                    | Preconditions                                       | Verify                                     |
| ------------------------------ | ------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------ |
| Slow initial load              | waterfall, LCP element, JS cost | code splitting, image optimization, resource priority, streaming      | clear critical-path waste                           | LCP/TTFB/JS execution                      |
| Slow navigation                | route/data waterfall            | prefetch, caching, parallel fetch, streaming                          | predictable navigation or reusable data             | navigation latency + cache/prefetch waste  |
| Large JS                       | bundle graph                    | dynamic import, dependency replacement, tree shaking, server boundary | measurable critical JS cost                         | transfer/parse/execute + LCP/INP           |
| Large list/table               | DOM count + render trace        | virtualization, pagination, windowing                                 | rendered set is actually large                      | render/interaction latency + accessibility |
| Typing/input lag               | interaction trace               | state isolation, defer work, chunk work, worker                       | expensive work in input path                        | INP / interaction trace                    |
| Slow image LCP                 | image request/size/format       | AVIF/WebP, responsive images, priority, preload where justified       | image is LCP/large transfer                         | LCP + bytes                                |
| High TTFB                      | server timing                   | caching, query optimization, edge/pre-rendering                       | server work is dominant                             | TTFB + freshness                           |
| Many sequential requests       | waterfall                       | parallelize, batch, prefetch                                          | dependencies can be removed                         | total blocking time / nav time             |
| Repeated expensive computation | CPU profile                     | memoization, caching, worker, WASM                                    | repeated deterministic or off-main-thread-safe work | CPU/interaction time                       |
| Slow builds/dev server         | module graph/build trace        | remove barrel files, dependency pruning, build config                 | graph traversal/build cost confirmed                | build/rebuild/test time                    |
| Layout jank                    | layout trace                    | dimensions, CSS containment, transform/opacity, content-visibility    | layout/paint is cause                               | CLS + frame/trace                          |
| Heavy client hydration         | JS/hydration profile            | server rendering, smaller client boundary, code splitting             | client JS is bottleneck                             | hydration/INP/LCP                          |
| Backend API slow               | distributed/query trace         | indexes, joins/batching, caching, pagination                          | backend dominates                                   | p95/p99 latency + DB cost                  |
| Performance degrades at scale  | load/RUM data                   | caching, pagination, virtualization, architecture                     | scaling bottleneck identified                       | load + field metrics                       |

## Selection algorithm

1. Pick the symptom actually observed.
2. Find the measurement that can falsify the suspected cause.
3. Reject candidates whose preconditions are false.
4. Prefer the intervention with the highest expected user benefit per unit complexity/risk.
5. Change one major variable at a time when attribution matters.
6. Re-measure.
