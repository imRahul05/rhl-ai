# Rendering and React

Profile first. Look for broad state invalidation, unnecessary renders, expensive component work, excessive DOM, layout thrashing, and hydration cost.

Prefer structural fixes over blanket memoization. Use memoization only where profiling shows repeated expensive work.

Verify component commits, render duration, main-thread time, and user-facing interaction/loading metrics.
