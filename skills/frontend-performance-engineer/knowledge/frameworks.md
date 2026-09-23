# React / Next.js considerations

## React

- Profile component commits and render duration before memoization.
- Keep state close to where it is consumed; avoid broad state updates that invalidate large subtrees.
- Use virtualization for genuinely large rendered collections.
- Split expensive work from urgent interaction paths.
- Avoid effects that create redundant fetch/render loops.

## Next.js

- Use server/client boundaries deliberately; unnecessary client components can expand browser JS and hydration work.
- Use route-level and component-level code splitting where it reduces critical JS.
- Treat prefetching as a bandwidth/cache trade-off, not a free optimization.
- Use streaming when it allows meaningful content to reach the user earlier, not merely because streaming is available.
- Inspect caching and revalidation semantics before changing them.
- For navigation problems, inspect Next.js prefetch behavior and the actual route/data waterfall.

Next.js automatically prefetches certain routes and route-based code splitting reduces initial JavaScript; verify whether the real bottleneck remains after those defaults. See the official prefetching guide when needed.
