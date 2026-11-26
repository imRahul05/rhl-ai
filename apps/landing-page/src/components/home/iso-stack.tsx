'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { IsoBox } from '@/components/iso/iso-box';
import { createProjector, leftFaceTransform } from '@/lib/iso';

const iso = createProjector(42, 104, 150);

const DECK_H = 0.3;
const BRICK = { x: 0.45, y: 0.6, w: 3.8, d: 1, h: 0.6 };

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface IsoStackProps {
  /** Skill slugs, bottom brick first. */
  skills: readonly string[];
}

/**
 * The page's last picture: the skills folder as an isometric deck, each
 * installed skill a labelled brick that drops onto the stack when scrolled
 * into view, and a dashed slot on top waiting for the next one.
 */
export function IsoStack({ skills }: IsoStackProps): React.JSX.Element {
  const top = DECK_H + skills.length * BRICK.h;
  return (
    <motion.svg
      viewBox="0 0 300 300"
      className="h-auto w-full max-w-[380px] overflow-visible"
      aria-hidden="true"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
    >
      <IsoBox iso={iso} x={0} y={0} w={4.6} d={2.2} h={DECK_H}>
        <text
          className="iso-label"
          fontSize={8.6}
          transform={leftFaceTransform(iso, 0.25, 2.2, 0.07)}
        >
          ~/.claude/skills
        </text>
      </IsoBox>

      {skills.map((slug, index) => (
        <motion.g
          key={slug}
          variants={{ hidden: { opacity: 0, y: -48 }, shown: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, delay: 0.15 + index * 0.18, ease: EASE }}
        >
          <IsoBox
            iso={iso}
            x={BRICK.x}
            y={BRICK.y}
            z={DECK_H + index * BRICK.h}
            w={BRICK.w}
            d={BRICK.d}
            h={BRICK.h}
            tone={index === skills.length - 1 ? 'signal' : 'paper'}
          >
            <text
              className="iso-label"
              fontSize={8.6}
              transform={leftFaceTransform(
                iso,
                BRICK.x + 0.16,
                BRICK.y + BRICK.d,
                DECK_H + index * BRICK.h + 0.2,
              )}
            >
              {slug}
            </text>
          </IsoBox>
        </motion.g>
      ))}

      <motion.g
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
        transition={{ duration: 0.6, delay: 0.3 + skills.length * 0.18 }}
      >
        <g className="iso-bob">
          <IsoBox
            iso={iso}
            x={BRICK.x}
            y={BRICK.y}
            z={top + 0.45}
            w={BRICK.w}
            d={BRICK.d}
            h={BRICK.h}
            tone="ghost"
          >
            <text
              className="iso-label"
              fontSize={8.6}
              transform={leftFaceTransform(iso, BRICK.x + 0.16, BRICK.y + BRICK.d, top + 0.65)}
            >
              rhl skill create …
            </text>
          </IsoBox>
        </g>
      </motion.g>
    </motion.svg>
  );
}
