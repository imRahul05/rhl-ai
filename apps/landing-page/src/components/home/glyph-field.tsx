'use client';

import * as React from 'react';

export interface GlyphFieldProps {
  /** Source text laid out on the character grid (the real SKILL.md). */
  text: string;
}

const CELL_W = 9;
const CELL_H = 19;
const FONT_PX = 12;
const RADIUS = 190;

interface Grid {
  cols: number;
  rows: number;
  /** rows × cols characters; ' ' for empty cells. */
  chars: string[];
  /** Row indexes that are markdown headings (drawn in the signal colour). */
  heading: boolean[];
}

function layout(text: string, cols: number, rows: number): Grid {
  const wrapped: { line: string; heading: boolean }[] = [];
  for (const raw of text.split('\n')) {
    const heading = raw.startsWith('#') || raw.startsWith('---');
    if (raw.length === 0) {
      wrapped.push({ line: '', heading: false });
      continue;
    }
    for (let i = 0; i < raw.length; i += cols) {
      wrapped.push({ line: raw.slice(i, i + cols), heading });
    }
  }
  const chars: string[] = [];
  const heading: boolean[] = [];
  for (let r = 0; r < rows; r += 1) {
    const entry = wrapped[r % Math.max(1, wrapped.length)] ?? { line: '', heading: false };
    heading.push(entry.heading);
    for (let c = 0; c < cols; c += 1) chars.push(entry.line[c] ?? ' ');
  }
  return { cols, rows, chars, heading };
}

/**
 * Decorative canvas: the hero's backdrop is the actual `code-reviewer/SKILL.md`,
 * printed faintly on a character grid. A soft scan band drifts across it and a
 * fine pointer acts as a reading lamp. Static (one frame) under reduced motion,
 * paused while off-screen.
 */
export default function GlyphField({ text }: GlyphFieldProps): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const base = document.createElement('canvas');
    const baseCtx = base.getContext('2d');
    if (!baseCtx) return undefined;
    const el: HTMLCanvasElement = canvas;
    const c: CanvasRenderingContext2D = ctx;
    const bctx: CanvasRenderingContext2D = baseCtx;

    let grid: Grid = { cols: 0, rows: 0, chars: [], heading: [] };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let fg = '0 0% 100%';
    let signal = '22 100% 56%';
    let font = `${FONT_PX}px monospace`;
    let baseAlpha = 0.07;
    let raf = 0;
    let running = false;
    let visible = true;
    const start = performance.now();
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    function readTheme(): void {
      const root = getComputedStyle(document.documentElement);
      fg = root.getPropertyValue('--foreground').trim() || fg;
      signal = root.getPropertyValue('--primary').trim() || signal;
      font = `${FONT_PX}px ${getComputedStyle(el).fontFamily}`;
      baseAlpha = document.documentElement.classList.contains('dark') ? 0.065 : 0.09;
    }

    function drawGlyph(
      target: CanvasRenderingContext2D,
      index: number,
      alpha: number
    ): void {
      const ch = grid.chars[index];
      if (ch === undefined || ch === ' ') return;
      const row = Math.floor(index / grid.cols);
      const col = index - row * grid.cols;
      target.fillStyle = `hsl(${grid.heading[row] ? signal : fg} / ${alpha.toFixed(3)})`;
      target.fillText(ch, col * CELL_W, row * CELL_H + CELL_H / 2);
    }

    function paintBase(): void {
      base.width = Math.round(width * dpr);
      base.height = Math.round(height * dpr);
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.font = font;
      bctx.textBaseline = 'middle';
      for (let i = 0; i < grid.chars.length; i += 1) {
        drawGlyph(bctx, i, baseAlpha);
      }
    }

    function frame(now: number): void {
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, el.width, el.height);
      c.drawImage(base, 0, 0);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.font = font;
      c.textBaseline = 'middle';

      // Scan band: a diagonal sweep that crosses the field every ~9s.
      const elapsed = (now - start) / 1000;
      const span = width + height * 0.6 + 600;
      const head = reduce ? width * 0.72 : ((elapsed * span) / 9) % span - 300;
      const bandWidth = 150;
      for (let row = 0; row < grid.rows; row += 1) {
        const y = row * CELL_H;
        const centre = head - y * 0.6;
        const from = Math.max(0, Math.floor((centre - bandWidth) / CELL_W));
        const to = Math.min(grid.cols - 1, Math.ceil((centre + bandWidth) / CELL_W));
        for (let col = from; col <= to; col += 1) {
          const d = Math.abs(col * CELL_W - centre) / bandWidth;
          const a = (1 - d) * (1 - d) * 0.26;
          if (a > 0.012) drawGlyph(c, row * grid.cols + col, a);
        }
      }

      // Reading lamp around the pointer.
      if (pointer.active) {
        pointer.x += (pointer.tx - pointer.x) * 0.14;
        pointer.y += (pointer.ty - pointer.y) * 0.14;
        const c0 = Math.max(0, Math.floor((pointer.x - RADIUS) / CELL_W));
        const c1 = Math.min(grid.cols - 1, Math.ceil((pointer.x + RADIUS) / CELL_W));
        const r0 = Math.max(0, Math.floor((pointer.y - RADIUS) / CELL_H));
        const r1 = Math.min(grid.rows - 1, Math.ceil((pointer.y + RADIUS) / CELL_H));
        for (let row = r0; row <= r1; row += 1) {
          for (let col = c0; col <= c1; col += 1) {
            const dx = col * CELL_W - pointer.x;
            const dy = row * CELL_H + CELL_H / 2 - pointer.y;
            const d = Math.sqrt(dx * dx + dy * dy) / RADIUS;
            if (d < 1) drawGlyph(c, row * grid.cols + col, (1 - d) * (1 - d) * 0.62);
          }
        }
      }

      if (running) raf = requestAnimationFrame(frame);
    }

    function resize(): void {
      const rect = el.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      grid = layout(text, Math.ceil(width / CELL_W), Math.ceil(height / CELL_H));
      readTheme();
      paintBase();
      if (!running) frame(performance.now());
    }

    function setRunning(next: boolean): void {
      if (reduce) return;
      if (next && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!next && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }

    function onPointerMove(event: PointerEvent): void {
      if (event.pointerType !== 'mouse') return;
      const rect = el.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
      if (!pointer.active) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
        pointer.active = true;
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(el);

    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      setRunning(visible && !document.hidden);
    });
    intersection.observe(el);

    function onVisibility(): void {
      setRunning(visible && !document.hidden);
    }

    const themeObserver = new MutationObserver(() => {
      readTheme();
      paintBase();
      if (!running) frame(performance.now());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Webfont metrics differ from the fallback: repaint once it is ready.
    void document.fonts.ready.then(() => {
      readTheme();
      paintBase();
      if (!running) frame(performance.now());
    });

    if (!reduce) window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    resize();
    setRunning(true);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="enter-fade absolute inset-0 size-full font-mono"
    />
  );
}
