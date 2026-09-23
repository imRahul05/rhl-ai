# Trade-offs and failure modes

## Prefetching

Benefits: lower perceived navigation latency.
Costs: wasted bandwidth, cache pollution, CPU/storage work, privacy/data freshness concerns.
Use when intent is predictable and hit rate is meaningful.

## Caching

Benefits: lower latency and server work.
Costs: invalidation complexity, stale data, memory/storage usage, privacy concerns.
Define freshness and invalidation before implementation.

## Virtualization

Benefits: fewer mounted/rendered nodes.
Costs: measurement complexity, accessibility/focus issues, scrolling/search/SEO complications.
Use when rendered volume is demonstrably expensive.

## Code splitting

Benefits: less critical JS.
Costs: more requests/chunks and possible waterfalls; too many boundaries can hurt.
Split around meaningful user flows/heavy features.

## Memoization

Benefits: avoids repeated deterministic work.
Costs: memory, dependency complexity, stale values, false confidence.
Use after profiling identifies repeated expensive work.

## Workers

Benefits: move CPU-heavy work off the main thread.
Costs: serialization/message overhead, lifecycle complexity, shared-state constraints.
Use for genuinely CPU-heavy work that blocks interaction.

## WASM

Benefits: potentially faster compute and reuse of native-oriented algorithms.
Costs: binary size, compilation/startup, data transfer, debugging/tooling complexity.
Use when computation is measurable and suitable for WASM.

## Streaming

Benefits: earlier delivery of useful content.
Costs: more complex loading states, caching semantics, partial failure handling.
Use when meaningful content can be rendered independently before the full response.

## Microfrontends

Benefits: team/deployment autonomy and bounded ownership.
Costs: duplicated dependencies, runtime integration, navigation/state complexity.
Do not introduce solely to fix a measured page-speed issue.
