'use client';

import * as React from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'motion/react';
import { IsoBox, type IsoTone } from '@/components/iso/iso-box';
import { usePrefersReducedMotion } from '@/components/motion/use-media-query';
import { createProjector, topFaceTransform } from '@/lib/iso';

const iso = createProjector(34, 112, 156);

const PLATE = { w: 5, d: 3.4, h: 0.18 };
/** Exploded heights of the three plates: job posting, resume, score. */
const LEVELS = [0, 2.1, 4.2];
const SCORE = 87;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Chip {
  label: string;
  tone: IsoTone;
}

const JOB: Chip[] = [
  { label: 'React', tone: 'paper' },
  { label: 'TypeScript', tone: 'paper' },
  { label: 'AWS', tone: 'paper' },
  { label: 'Kafka', tone: 'paper' },
];

const RESUME: Chip[] = [
  { label: 'React', tone: 'hit' },
  { label: 'TypeScript', tone: 'hit' },
  { label: 'AWS', tone: 'hit' },
  { label: '✕ Kafka', tone: 'miss' },
];

interface PlacedChip extends Chip {
  x: number;
  y: number;
  w: number;
}

/** Lays chips out in rows along +x on a plate's top face, wrapping at the plate edge. */
function placeChips(chips: Chip[]): PlacedChip[] {
  const placed: PlacedChip[] = [];
  let x = 0.35;
  let y = 1.15;
  for (const chip of chips) {
    const w = 0.42 + chip.label.length * 0.2;
    if (x + w > PLATE.w - 0.3) {
      x = 0.35;
      y += 0.75;
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
            fontSize={8.5}
            transform={topFaceTransform(iso, chip.x + 0.18, chip.y + 0.36, z + 0.1)}
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
      transform={topFaceTransform(iso, 0.35, 0.7, z)}
    >
      {text}
    </text>
  );
}

/**
 * Shortlist in one picture, drawn in the site's isometric language: the job
 * posting, your resume with each required skill ticked or missing, and the
 * match score on top. Plates settle in sequence and the score counts up once
 * scrolled into view.
 */
export function IsoMatch(): React.JSX.Element {
  const reduce = usePrefersReducedMotion();
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const score = useMotionValue(0);
  const scoreText = useTransform(score, (v) => `${Math.round(v)}%`);

  React.useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      score.set(SCORE);
      return undefined;
    }
    const controls = animate(score, SCORE, { duration: 1.4, delay: 0.75, ease: EASE });
    return () => controls.stop();
  }, [inView, reduce, score]);

  const [jobZ, resumeZ, scoreZ] = LEVELS as [number, number, number];
  const top = (z: number): number => z + PLATE.h;

  // Dashed risers between plates at the two front corners.
  const risers = [
    [PLATE.w, PLATE.d],
    [0, PLATE.d],
    [PLATE.w, 0],
  ].map(([x, y]) => ({
    a: iso.project(x ?? 0, y ?? 0, top(jobZ)),
    b: iso.project(x ?? 0, y ?? 0, resumeZ),
  }));

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 280 310"
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

      {/* Job posting */}
      <motion.g
        variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <IsoBox iso={iso} x={0} y={0} z={jobZ} w={PLATE.w} d={PLATE.d} h={PLATE.h} />
        <PlateLabel text="JOB POSTING" z={top(jobZ)} />
        <Chips chips={JOB} z={top(jobZ)} />
      </motion.g>

      {/* Your resume */}
      <motion.g
        variants={{ hidden: { opacity: 0, y: -24 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      >
        <IsoBox iso={iso} x={0} y={0} z={resumeZ} w={PLATE.w} d={PLATE.d} h={PLATE.h} />
        <PlateLabel text="YOUR RESUME" z={top(resumeZ)} />
        <Chips chips={RESUME} z={top(resumeZ)} />
      </motion.g>

      {/* Match score */}
      <motion.g
        variants={{ hidden: { opacity: 0, y: -40 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
      >
        <g className="iso-bob">
          <IsoBox iso={iso} x={0.8} y={0.5} z={scoreZ} w={3.4} d={2.2} h={0.26} tone="signal">
            <motion.text
              className="iso-label"
              fontSize={34}
              fontWeight={600}
              letterSpacing={-1}
              transform={topFaceTransform(iso, 1.15, 1.75, scoreZ + 0.26)}
            >
              {scoreText}
            </motion.text>
            <text
              className="iso-label"
              fontSize={8}
              letterSpacing={1.2}
              transform={topFaceTransform(iso, 1.2, 2.35, scoreZ + 0.26)}
            >
              STRONG MATCH
            </text>
          </IsoBox>
        </g>
      </motion.g>
    </motion.svg>
  );
}
