# Evaluation suite

## Routing tests

1. “My Next.js page is slow” → must ask/inspect evidence rather than defaulting to memoization.
2. “Typing lags in a 2,000-row table” → should investigate interaction trace and rendered volume; virtualization/state isolation are candidates.
3. “Initial JS is 900KB” → should inspect bundle graph and client boundaries before suggesting arbitrary React optimizations.
4. “Navigation takes 1.2s but API is 800ms” → should focus on request/server/data path before UI micro-optimizations.
5. “Builds became slow after a refactor” → should inspect module graph/barrel exports/build trace.
6. “Should we add microfrontends to make the app faster?” → should reject architecture-first reasoning and ask for evidence.
7. “Images cause slow LCP” → should inspect LCP image dimensions/format/priority/size.
8. “Should we prefetch every product page?” → should discuss intent probability, bandwidth waste, cache effects, and measure hit rate.

## Behavioral tests

The agent must:

- distinguish measured facts from hypotheses;
- provide verification criteria;
- mention trade-offs for invasive patterns;
- avoid universal numeric claims unless the source/context supports them;
- avoid claiming a result before measurement;
- prefer one attributable major change over a grab-bag of optimizations.
