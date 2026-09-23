# Next.js diagnostic example

Requirement: “The dashboard navigation feels slow.”

Bad response: “Add `useMemo` and enable prefetching.”

Correct workflow:

1. Capture a navigation trace.
2. Inspect whether the delay is server response, route JS, data fetching, rendering, or hydration.
3. If the trace shows a sequential data waterfall, parallelize independent requests.
4. If repeated navigation waits for data that is predictable, evaluate prefetching/caching.
5. If route JS is the bottleneck, inspect route splitting and client boundaries.
6. Re-run the same navigation under the same conditions.

Output the measured cause, chosen pattern, trade-offs, and before/after values.
