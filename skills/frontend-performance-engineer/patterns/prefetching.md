# Prefetching

Use when a future navigation/resource request is sufficiently predictable and the cost of an occasional wasted request is acceptable.

Check: prediction/hit rate, bandwidth, cache capacity, freshness, auth/privacy, and whether the request would otherwise be on the critical path.

Verify: navigation latency, prefetched-hit ratio, wasted bytes/requests, cache effects.

Do not: prefetch every link or large resources without evidence of intent.
