'use client';

import * as React from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { IsoBox } from '@/components/iso/iso-box';
import { createProjector, topFaceTransform, toPoints, type Point } from '@/lib/iso';

/** Grid units between two stations, along each iso axis. */
const SPAN = 4;
const UNIT = 40;
const DECK = 0.35;
const VIEW_W = 1000;
const VIEW_H = 156;
const STATIONS = 4;

/** Stations sit on one horizontal screen line: world (SPAN·k, −SPAN·k). */
const STATION_PITCH = 2 * SPAN * Math.cos(Math.PI / 6) * UNIT;
const ORIGIN_X = VIEW_W / 2 - ((STATIONS - 1) / 2) * STATION_PITCH;
const ORIGIN_Y = 96;

const iso = createProjector(UNIT, ORIGIN_X, ORIGIN_Y);

/** Horizontal position of station `k`, as a percentage of the track width (for HTML labels). */
export function stationPercent(k: number): number {
  return ((ORIGIN_X + k * STATION_PITCH) / VIEW_W) * 100;
}

/** The rail is a staircase of unit steps (+x, then −y) — the most iso way to go sideways. */
const RAIL: { x: number; y: number }[] = (() => {
  const points = [{ x: 0, y: 0 }];
  for (let step = 0; step < SPAN * (STATIONS - 1); step += 1) {
    points.push({ x: step + 1, y: -step });
    points.push({ x: step + 1, y: -step - 1 });
  }
  return points;
})();

const RAIL_POINTS = toPoints(RAIL.map((p) => iso.project(p.x, p.y, DECK)));

/** World position along the rail for t ∈ [0, 1] (every step has the same length). */
function railAt(t: number): Point {
  const segments = RAIL.length - 1;
  const f = Math.min(Math.max(t, 0), 1) * segments;
  const i = Math.min(Math.floor(f), segments - 1);
  const a = RAIL[i] as { x: number; y: number };
  const b = RAIL[i + 1] as { x: number; y: number };
  const u = f - i;
  return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u };
}

const TOKEN = 0.7;

interface StationProps {
  k: number;
  state: 'todo' | 'active' | 'done';
}

/** A deck with a small prop at its back corner that says what the stop does. */
function Station({ k, state }: StationProps): React.JSX.Element {
  const sx = SPAN * k;
  const sy = -SPAN * k;
  const tone = state === 'active' ? 'signal' : 'paper';
  return (
    <g className={state === 'todo' ? 'opacity-55 transition-opacity' : 'transition-opacity'}>
      <IsoBox iso={iso} x={sx - 1} y={sy - 1} w={2} d={2} h={DECK} tone={tone}>
        <text
          className={state === 'active' ? 'iso-label iso-label-on-signal' : 'iso-label'}
          fontSize={13}
          transform={topFaceTransform(iso, sx + 0.18, sy + 0.62, DECK)}
        >
          0{k + 1}
        </text>
      </IsoBox>
      {k === 0 ? (
        // skills/: a shelf of skill blocks.
        <>
          <IsoBox iso={iso} x={sx - 0.9} y={sy - 0.9} z={DECK} w={0.55} d={0.55} h={0.55} />
          <IsoBox iso={iso} x={sx - 0.25} y={sy - 0.9} z={DECK} w={0.55} d={0.55} h={0.4} />
          <IsoBox iso={iso} x={sx - 0.9} y={sy - 0.25} z={DECK} w={0.55} d={0.55} h={0.3} />
        </>
      ) : null}
      {k === 1 ? (
        // validate: a gate the file passes through.
        <>
          <IsoBox iso={iso} x={sx - 0.95} y={sy - 0.95} z={DECK} w={0.2} d={0.2} h={1.1} />
          <IsoBox iso={iso} x={sx + 0.75} y={sy - 0.95} z={DECK} w={0.2} d={0.2} h={1.1} />
          <IsoBox
            iso={iso}
            x={sx - 0.95}
            y={sy - 0.95}
            z={DECK + 1.1}
            w={1.9}
            d={0.2}
            h={0.18}
            tone={state === 'todo' ? 'paper' : 'ink'}
          />
        </>
      ) : null}
      {k === 2 ? (
        // ~/.claude/skills: an open slot, filled once the file has landed.
        <IsoBox
          iso={iso}
          x={sx - 0.95}
          y={sy - 0.95}
          z={DECK}
          w={0.7}
          d={0.7}
          h={0.7}
          tone={state === 'todo' ? 'ghost' : 'paper'}
        />
      ) : null}
      {k === 3 ? (
        // agent: a dark block with a status light.
        <>
          <IsoBox
            iso={iso}
            x={sx - 0.95}
            y={sy - 0.95}
            z={DECK}
            w={0.85}
            d={0.85}
            h={0.85}
            tone="ink"
          />
          <circle
            cx={iso.project(sx - 0.52, sy - 0.52, DECK + 0.85).x}
            cy={iso.project(sx - 0.52, sy - 0.52, DECK + 0.85).y}
            r={4}
            className={state === 'active' ? 'fill-primary' : 'fill-muted-foreground'}
          />
        </>
      ) : null}
    </g>
  );
}

export interface IsoTrackProps {
  /** 0 → first station, 1 → last station. */
  travel: MotionValue<number>;
  activeIndex: number;
}

/**
 * The pipeline as an isometric diorama: four decks joined by a stepped rail,
 * and a signal-orange SKILL.md block that rides the rail with scroll.
 */
export function IsoTrack({ travel, activeIndex }: IsoTrackProps): React.JSX.Element {
  const tokenX = useTransform(travel, (t) => {
    const p = railAt(t);
    return iso.project(p.x, p.y).x - ORIGIN_X;
  });
  const tokenY = useTransform(travel, (t) => {
    const p = railAt(t);
    return iso.project(p.x, p.y).y - ORIGIN_Y;
  });

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="block h-auto w-full overflow-visible"
      aria-hidden="true"
    >
      <polyline
        points={RAIL_POINTS}
        fill="none"
        strokeWidth={1.5}
        strokeLinejoin="round"
        className="stroke-border"
      />
      <motion.polyline
        points={RAIL_POINTS}
        fill="none"
        strokeWidth={2}
        strokeLinejoin="round"
        className="stroke-primary"
        style={{ pathLength: travel }}
      />
      {Array.from({ length: STATIONS }, (_, k) => (
        <Station
          key={k}
          k={k}
          state={k === activeIndex ? 'active' : k < activeIndex ? 'done' : 'todo'}
        />
      ))}
      <motion.g style={{ x: tokenX, y: tokenY }}>
        <g className="iso-bob">
          <IsoBox
            iso={iso}
            x={-TOKEN / 2}
            y={-TOKEN / 2}
            z={DECK + 0.08}
            w={TOKEN}
            d={TOKEN}
            h={TOKEN}
            tone="signal"
          >
            <text
              className="iso-label iso-label-on-signal"
              fontSize={8.5}
              transform={topFaceTransform(
                iso,
                -TOKEN / 2 + 0.08,
                -TOKEN / 2 + 0.42,
                DECK + 0.08 + TOKEN,
              )}
            >
              .md
            </text>
          </IsoBox>
        </g>
      </motion.g>
    </svg>
  );
}
