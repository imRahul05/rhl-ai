# Measurement playbook

## Before changing code

Capture:

- URL/route and user journey
- device/network assumptions
- LCP, INP, CLS, TTFB when applicable
- navigation/request waterfall
- main-thread trace for slow interactions
- JS/CSS/image/font transfer sizes
- bundle/module graph when bundle cost is suspected
- API/database timings when server work is suspected

## Useful tools

- Chrome DevTools Performance + Network
- Lighthouse / Lighthouse CI
- PageSpeed Insights / CrUX
- `web-vitals` for RUM
- bundle analyzers / build profiling
- framework-specific profilers

## Verification protocol

Use the same route, data shape, build mode, device/network class, and measurement method. Repeat measurements where noise is material. Compare the metric that motivated the change plus important guard metrics.

Never say “faster” without identifying what changed and how it was measured.
