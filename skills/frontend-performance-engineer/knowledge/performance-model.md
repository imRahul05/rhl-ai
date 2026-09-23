# Performance mental model

Frontend performance is a chain, not a single metric:

User intent → navigation → DNS/connectivity → request/server → response → HTML/data → critical resources → JS execution → render/layout/paint → interaction → subsequent navigation.

Optimize the stage that dominates the user-visible delay.

## Core metrics

- **LCP**: loading/rendering of the largest visible content. Investigate server response, resource discovery/priority, image/font delivery, and rendering work.
- **INP**: responsiveness of interactions. Investigate input delay, event processing, long tasks, rendering/presentation delay.
- **CLS**: visual stability. Investigate missing dimensions, injected content, font/layout shifts.
- **TTFB**: server/network response start. Break down DNS, connection, request, server processing, and cache.
- **Long tasks**: main-thread work over ~50ms; useful for interaction diagnosis.
- **Bundle cost**: bytes downloaded/decompressed/parsed/executed; size alone is insufficient.

## Three layers of evidence

1. Field: what real users experience.
2. Lab: reproducible controlled diagnosis.
3. Source: why the implementation creates the observed behavior.

The strongest conclusion connects all three.
