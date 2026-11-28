'use client';

import * as React from 'react';
import { motion, useInView } from 'motion/react';
import { IsoBox, type IsoTone } from '@/components/iso/iso-box';
import { createProjector, topFaceTransform } from '@/lib/iso';

const iso = createProjector(34, 112, 156);

const PLATE = { w: 5.2, d: 3.4, h: 0.18 };
/** Exploded heights of the three plates: agents, opt-in plugins, floating Vela notch. */
const LEVELS: [number, number, number] = [0, 2.1, 4.2];
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Chip {
  label: string;
  tone: IsoTone;
}

const AGENTS: Chip[] = [
  { label: 'Claude', tone: 'signal' },
  { label: 'Antigravity', tone: 'paper' },
  { label: 'Codex', tone: 'paper' },
  { label: 'JSON', tone: 'ghost' },
];

const PLUGINS: Chip[] = [
  { label: 'Clipboard', tone: 'hit' },
  { label: 'Cleaner', tone: 'hit' },
  { label: 'Phone 5G', tone: 'paper' },
];

interface PlacedChip extends Chip {
  x: number;
  y: number;
  w: number;
}

function placeChips(chips: Chip[]): PlacedChip[] {
  const placed: PlacedChip[] = [];
  let x = 0.32;
  let y = 1.15;
  for (const chip of chips) {
    const w = 0.44 + chip.label.length * 0.2;
    if (x + w > PLATE.w - 0.28) {
      x = 0.32;
      y += 0.78;
    }
    placed.push({ ...chip, x, y, w });
    x += w + 0.22;
  }
  return placed;
}

function Chips({ chips, z }: { chips: Chip[]; z: number }): React.JSX.Element {
  return (
    <>
      {placeChips(chips).map((chip) => (
        <IsoBox
          key={chip.label}
          iso={iso}
          x={chip.x}
          y={chip.y}
          z={z}
          w={chip.w}
          d={0.5}
          h={0.1}
          tone={chip.tone}
        >
          <text
            className="iso-label"
            fontSize={8.2}
            transform={topFaceTransform(iso, chip.x + 0.16, chip.y + 0.36, z + 0.1)}
          >
            {chip.label}
          </text>
        </IsoBox>
      ))}
    </>
  );
}

function PlateLabel({ text, z }: { text: string; z: number }): React.JSX.Element {
  return (
    <text
      className="iso-label"
      fontSize={8}
      letterSpacing={1.2}
      transform={topFaceTransform(iso, 0.32, 0.7, z)}
    >
      {text}
    </text>
  );
}

/**
 * Vela in one picture, drawn in the site's isometric language:
 * local AI agent hooks at the base, opt-in modular plugins in the middle,
 * and the lightweight native macOS notch pill floating on top.
 */
export function IsoVela(): React.JSX.Element {
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const [agentsZ, pluginsZ, notchZ] = LEVELS;
  const top = (z: number): number => z + PLATE.h;

  const risers = [
    [PLATE.w, PLATE.d],
    [0, PLATE.d],
    [PLATE.w, 0],
  ].map(([x, y]) => ({
    a: iso.project(x ?? 0, y ?? 0, top(agentsZ)),
    b: iso.project(x ?? 0, y ?? 0, pluginsZ),
  }));

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 285 315"
      className="h-auto w-full max-w-[460px] overflow-visible"
      aria-hidden="true"
      initial="hidden"
      animate={inView ? 'shown' : 'hidden'}
    >
      {risers.map(({ a, b }, i) => (
        <line
          key={i}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          strokeWidth={1}
          strokeDasharray="2 3"
          className="stroke-border"
        />
      ))}

      {/* Layer 1: Agent Hooks & Local Server */}
      <motion.g
        variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <IsoBox iso={iso} x={0} y={0} z={agentsZ} w={PLATE.w} d={PLATE.d} h={PLATE.h} />
        <PlateLabel text="AGENT ADAPTERS · :7878" z={top(agentsZ)} />
        <Chips chips={AGENTS} z={top(agentsZ)} />
      </motion.g>

      {/* Layer 2: Opt-In Modular Plugins */}
      <motion.g
        variants={{ hidden: { opacity: 0, y: -24 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      >
        <IsoBox iso={iso} x={0} y={0} z={pluginsZ} w={PLATE.w} d={PLATE.d} h={PLATE.h} />
        <PlateLabel text="OPT-IN PLUGINS" z={top(pluginsZ)} />
        <Chips chips={PLUGINS} z={top(pluginsZ)} />
      </motion.g>

      {/* Layer 3: Floating Native Notch Pill */}
      <motion.g
        variants={{ hidden: { opacity: 0, y: -40 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
      >
        <g className="iso-bob">
          <IsoBox iso={iso} x={0.7} y={0.55} z={notchZ} w={3.8} d={2.1} h={0.28} tone="ink">
            <text
              className="iso-label"
              fontSize={24}
              fontWeight={600}
              letterSpacing={-0.6}
              transform={topFaceTransform(iso, 1.05, 1.65, notchZ + 0.28)}
            >
              VELA
            </text>
            <text
              className="iso-label"
              fontSize={7.2}
              letterSpacing={1.0}
              transform={topFaceTransform(iso, 1.08, 2.22, notchZ + 0.28)}
            >
              1.5 MB · SWIFT 6
            </text>
          </IsoBox>
          {/* Glowing bot accent block on the left wing of the notch */}
          <IsoBox
            iso={iso}
            x={3.75}
            y={0.85}
            z={notchZ + 0.28}
            w={0.45}
            d={0.45}
            h={0.18}
            tone="signal"
          />
        </g>
      </motion.g>
    </motion.svg>
  );
}
