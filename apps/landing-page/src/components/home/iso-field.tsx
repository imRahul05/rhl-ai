'use client';

import * as React from 'react';
import { ISO_COS } from '@/lib/iso';

const UNIT = 26;
const LAMP_RADIUS = 170;
const BAND = 130;
const SWEEP_SECONDS = 10;

interface Cell {
  /** Screen centre of the cell's floor rhombus. */
  cx: number;
  cy: number;
  /** Resting height (a few cells are always raised, like blocks left on a bench). */
  rest: number;
  /** Per-cell phase, so the sweep does not move as a rigid wall. */
  jitter: number;
}

/** Cheap deterministic hash in [0, 1). */
function hash(a: number, b: number): number {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/**
 * Decorative canvas behind the hero: an isometric floor grid whose cells rise
 * into blocks. A slow diagonal sweep lifts a band of blocks across the bench,
 * and a fine pointer raises the cells under it — the tallest one turns signal
 * orange. One static frame under reduced motion; paused while off-screen.
 */
export default function IsoField(): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const base = document.createElement('canvas');
    const baseCtx = base.getContext('2d');
    if (!ctx || !baseCtx) return undefined;
    const el: HTMLCanvasElement = canvas;
    const c: CanvasRenderingContext2D = ctx;
    const bctx: CanvasRenderingContext2D = baseCtx;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hw = ISO_COS * UNIT; // half-width of a floor rhombus
    const hh = UNIT / 2; // half-height of a floor rhombus

    let cells: Cell[] = [];
    let heights = new Float32Array(0);
    let width = 0;
    let height = 0;
    let dpr = 1;
    let fg = '45 18% 91%';
    let bg = '40 7% 5%';
    let signal = '22 100% 56%';
    let lineAlpha = 0.08;
    let raf = 0;
    let running = false;
    let visible = true;
    const start = performance.now();
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    function readTheme(): void {
      const root = getComputedStyle(document.documentElement);
      fg = root.getPropertyValue('--foreground').trim() || fg;
      bg = root.getPropertyValue('--background').trim() || bg;
      signal = root.getPropertyValue('--primary').trim() || signal;
      lineAlpha = document.documentElement.classList.contains('dark') ? 0.06 : 0.075;
    }

    function buildCells(): void {
      cells = [];
      const rows = Math.ceil(height / hh) + 4;
      const cols = Math.ceil(width / hw) + 4;
      // Row s = i + j (back to front), column t = i - j; they share parity.
      for (let s = -2; s < rows; s += 1) {
        for (let t = -2; t < cols; t += 1) {
          if ((s + t) % 2 !== 0) continue;
          const r = hash(s, t);
          cells.push({
            cx: t * hw,
            cy: s * hh,
            rest: r > 0.988 ? 0.3 + hash(t, s) * 0.5 : 0,
            jitter: hash(t * 3, s * 7),
          });
        }
      }
      heights = new Float32Array(cells.length);
      for (let i = 0; i < cells.length; i += 1) heights[i] = (cells[i] as Cell).rest;
    }

    function rhombus(target: CanvasRenderingContext2D, cx: number, cy: number): void {
      target.beginPath();
      target.moveTo(cx, cy - hh);
      target.lineTo(cx + hw, cy);
      target.lineTo(cx, cy + hh);
      target.lineTo(cx - hw, cy);
      target.closePath();
    }

    function paintBase(): void {
      base.width = Math.round(width * dpr);
      base.height = Math.round(height * dpr);
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.lineWidth = 1;
      bctx.strokeStyle = `hsl(${fg} / ${lineAlpha})`;
      for (const cell of cells) {
        rhombus(bctx, cell.cx, cell.cy);
        bctx.stroke();
      }
    }

    function drawBlock(cell: Cell, h: number, glow: number): void {
      const lift = h * UNIT;
      const { cx, cy } = cell;
      const top = cy - lift;
      const strength = Math.min(1, h * 1.6);
      const edge = `hsl(${fg} / ${(0.1 + strength * 0.32).toFixed(3)})`;

      // Left face (+y side).
      c.beginPath();
      c.moveTo(cx - hw, top);
      c.lineTo(cx, top + hh);
      c.lineTo(cx, cy + hh);
      c.lineTo(cx - hw, cy);
      c.closePath();
      c.fillStyle = `hsl(${bg})`;
      c.fill();
      c.fillStyle = `hsl(${fg} / ${(0.05 + strength * 0.07).toFixed(3)})`;
      c.fill();
      c.strokeStyle = edge;
      c.stroke();

      // Right face (+x side).
      c.beginPath();
      c.moveTo(cx, top + hh);
      c.lineTo(cx + hw, top);
      c.lineTo(cx + hw, cy);
      c.lineTo(cx, cy + hh);
      c.closePath();
      c.fillStyle = `hsl(${bg})`;
      c.fill();
      c.fillStyle = `hsl(${fg} / ${(0.1 + strength * 0.12).toFixed(3)})`;
      c.fill();
      c.stroke();

      // Top face.
      rhombus(c, cx, top);
      c.fillStyle = `hsl(${bg})`;
      c.fill();
      if (glow > 0.01) {
        c.fillStyle = `hsl(${signal} / ${Math.min(0.9, glow).toFixed(3)})`;
        c.fill();
      }
      c.strokeStyle = glow > 0.01 ? `hsl(${signal} / ${Math.min(1, 0.4 + glow).toFixed(3)})` : edge;
      c.stroke();
    }

    function frame(now: number): void {
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, el.width, el.height);
      c.drawImage(base, 0, 0);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.lineWidth = 1;
      c.lineJoin = 'round';

      const elapsed = (now - start) / 1000;
      const span = width + height * 0.6 + BAND * 4;
      const head = reduce ? width * 0.7 : (((elapsed * span) / SWEEP_SECONDS) % span) - BAND * 2;

      if (pointer.active) {
        pointer.x += (pointer.tx - pointer.x) * 0.16;
        pointer.y += (pointer.ty - pointer.y) * 0.16;
      }

      let peak = -1;
      let peakValue = 0.55;
      for (let i = 0; i < cells.length; i += 1) {
        const cell = cells[i] as Cell;
        const along = cell.cx + cell.cy * 0.6 - head + (cell.jitter - 0.5) * 60;
        const band = Math.max(0, 1 - Math.abs(along) / BAND);
        let target = Math.max(cell.rest, band * band * 0.42);
        if (pointer.active) {
          const dx = cell.cx - pointer.x;
          const dy = (cell.cy - pointer.y) * 1.6;
          const d = Math.sqrt(dx * dx + dy * dy) / LAMP_RADIUS;
          if (d < 1) target = Math.max(target, (1 - d) * (1 - d) * 1.5);
        }
        const current = heights[i] ?? 0;
        const next = reduce ? target : current + (target - current) * 0.14;
        heights[i] = next;
        if (pointer.active && next > peakValue) {
          peakValue = next;
          peak = i;
        }
      }

      // Blocks stay a backdrop: never as loud as the type in front of them.
      c.globalAlpha = 0.78;
      for (let i = 0; i < cells.length; i += 1) {
        const h = heights[i] ?? 0;
        if (h < 0.025) continue;
        drawBlock(cells[i] as Cell, h, i === peak ? (peakValue - 0.55) * 1.2 : 0);
      }

      c.globalAlpha = 1;
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
      readTheme();
      buildCells();
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
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="enter-fade absolute inset-0 size-full" />
  );
}
