# Code splitting

Use when critical JavaScript is large or a feature is rarely needed on the initial path.

Inspect bundle/module graph first. Split by route or heavy feature, not arbitrary tiny components.

Verify downloaded, parsed, and executed JS plus LCP/INP. Watch for new waterfalls and duplicate dependencies.
