'use client';

import * as React from 'react';
import { motion, useInView } from 'motion/react';
import { IsoBox, type IsoTone } from '@/components/iso/iso-box';
import { usePrefersReducedMotion } from '@/components/motion/use-media-query';
import { createProjector, topFaceTransform } from '@/lib/iso';

const iso = createProjector(30, 148, 128);
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface AgentNode {
  id: string;
  label: string;
  x: number;
  y: number;
  tone: IsoTone;
  delay: number;
}

interface PluginCube {
  id: string;
  label: string;
  x: number;
  y: number;
  tone: IsoTone;
  delay: number;
}

/** Three parallel AI coding agents feeding live signals into the MacBook notch hub. */
const AGENT_NODES: AgentNode[] = [
  { id: 'claude', label: 'CLAUDE', x: -3.2, y: -1.6, tone: 'signal', delay: 0.12 },
  { id: 'agy', label: 'ANTIGRAVITY', x: -3.2, y: 0.35, tone: 'hit', delay: 0.22 },
  { id: 'codex', label: 'CODEX', x: -3.2, y: 2.3, tone: 'paper', delay: 0.32 },
];

/** Three modular opt-in plugin cubes docking into the right side of the notch. */
const PLUGIN_CUBES: PluginCube[] = [
  { id: 'clip', label: 'CLIP', x: 3.15, y: -1.25, tone: 'paper', delay: 0.35 },
  { id: 'clean', label: 'CLEAN', x: 3.15, y: 0.45, tone: 'hit', delay: 0.45 },
  { id: 'phone', label: '5G', x: 3.15, y: 2.15, tone: 'signal', delay: 0.55 },
];

/**
 * Original 3D isometric sculpture for Vela:
 * An isometric MacBook display slab with its recessed top-center hardware notch,
 * three parallel agent transmitters beaming into the notch from the left,
 * and three modular opt-in plugin cubes snapping into the right.
 */
export function IsoVela(): React.JSX.Element {
  const reduce = usePrefersReducedMotion();
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  // Notch target center in isometric space
  const notchLeft = iso.project(-0.4, 0.65, 0.72);
  const notchRight = iso.project(1.9, 0.65, 0.72);

  return (
    <motion.svg
      ref={ref}
      viewBox="-18 -10 330 290"
      className="h-auto w-full max-w-[490px] overflow-visible"
      aria-hidden="true"
      initial="hidden"
      animate={inView ? 'shown' : 'hidden'}
    >
      {/* Left signal rails: Parallel Agents -> Vela Notch */}
      {AGENT_NODES.map((agent) => {
        const start = iso.project(agent.x + 1.55, agent.y + 0.5, 0.28);
        const mid = iso.project(-1.05, agent.y + 0.5, 0.5);
        const pathD = `M ${start.x} ${start.y} L ${mid.x} ${mid.y} L ${notchLeft.x} ${notchLeft.y}`;
        return (
          <g key={`rail-${agent.id}`}>
            <motion.path
              d={pathD}
              fill="none"
              strokeWidth={1.1}
              strokeDasharray="2.5 3"
              className="stroke-border"
              variants={{ hidden: { opacity: 0 }, shown: { opacity: 0.9 } }}
              transition={{ duration: 0.5, delay: agent.delay + 0.15 }}
            />
            {!reduce && inView ? (
              <motion.circle
                r={2.3}
                className={agent.tone === 'signal' ? 'fill-primary' : 'fill-foreground'}
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{
                  cx: [start.x, mid.x, notchLeft.x],
                  cy: [start.y, mid.y, notchLeft.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.2,
                  delay: agent.delay + 0.4,
                  repeat: Infinity,
                  repeatDelay: 0.9,
                  ease: 'easeInOut',
                }}
              />
            ) : null}
          </g>
        );
      })}

      {/* Right docking rails: Vela Notch -> Opt-In Plugins */}
      {PLUGIN_CUBES.map((plugin) => {
        const end = iso.project(plugin.x, plugin.y + 0.55, 0.32);
        const mid = iso.project(2.55, plugin.y + 0.55, 0.52);
        const pathD = `M ${notchRight.x} ${notchRight.y} L ${mid.x} ${mid.y} L ${end.x} ${end.y}`;
        return (
          <motion.path
            key={`dock-${plugin.id}`}
            d={pathD}
            fill="none"
            strokeWidth={1.1}
            strokeDasharray="2 3"
            className="stroke-border"
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 0.85 } }}
            transition={{ duration: 0.5, delay: plugin.delay }}
          />
        );
      })}

      {/* Left: Parallel Agent Transmitters */}
      {AGENT_NODES.map((agent) => (
        <motion.g
          key={agent.id}
          variants={{ hidden: { opacity: 0, x: -16 }, shown: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.65, delay: agent.delay, ease: EASE }}
        >
          <IsoBox
            iso={iso}
            x={agent.x}
            y={agent.y}
            z={0}
            w={1.55}
            d={1.0}
            h={0.32}
            tone={agent.tone}
          >
            <text
              className="iso-label"
              fontSize={6.8}
              letterSpacing={0.6}
              transform={topFaceTransform(iso, agent.x + 0.14, agent.y + 0.62, 0.32)}
            >
              {agent.label}
            </text>
          </IsoBox>
        </motion.g>
      ))}

      {/* Center: Isometric MacBook Display Chassis + Recessed Hardware Notch */}
      <motion.g
        variants={{ hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        {/* Display Bezel Base */}
        <IsoBox iso={iso} x={-0.75} y={-1.15} z={0} w={3.0} d={3.7} h={0.22} tone="paper">
          <text
            className="iso-label"
            fontSize={6.6}
            letterSpacing={1.1}
            transform={topFaceTransform(iso, -0.45, 2.25, 0.22)}
          >
            MACBOOK NOTCH HUB
          </text>
        </IsoBox>

        {/* Elevated Floating Vela Notch Pill */}
        <g className="iso-bob">
          <IsoBox iso={iso} x={-0.35} y={-0.35} z={0.45} w={2.25} d={2.1} h={0.34} tone="ink">
            <text
              className="iso-label"
              fontSize={16}
              fontWeight={600}
              letterSpacing={-0.4}
              transform={topFaceTransform(iso, -0.05, 0.78, 0.79)}
            >
              VELA
            </text>
            <text
              className="iso-label"
              fontSize={5.8}
              letterSpacing={0.6}
              transform={topFaceTransform(iso, -0.06, 1.32, 0.79)}
            >
              3 LIVE · 1.5 MB
            </text>
          </IsoBox>

          {/* Three mini parallel bot pips sitting along the notch wing */}
          <IsoBox iso={iso} x={-0.18} y={-0.2} z={0.79} w={0.34} d={0.34} h={0.14} tone="signal" />
          <IsoBox iso={iso} x={0.28} y={-0.2} z={0.79} w={0.34} d={0.34} h={0.14} tone="hit" />
          <IsoBox iso={iso} x={0.74} y={-0.2} z={0.79} w={0.34} d={0.34} h={0.14} tone="paper" />
        </g>
      </motion.g>

      {/* Right: Modular Snap-In Opt-In Plugin Cubes */}
      {PLUGIN_CUBES.map((plugin) => (
        <motion.g
          key={plugin.id}
          variants={{ hidden: { opacity: 0, x: 16 }, shown: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.65, delay: plugin.delay, ease: EASE }}
        >
          <IsoBox
            iso={iso}
            x={plugin.x}
            y={plugin.y}
            z={0.05}
            w={1.25}
            d={1.05}
            h={0.55}
            tone={plugin.tone}
          >
            <text
              className="iso-label"
              fontSize={7.6}
              fontWeight={600}
              letterSpacing={0.8}
              transform={topFaceTransform(iso, plugin.x + 0.18, plugin.y + 0.65, 0.6)}
            >
              {plugin.label}
            </text>
          </IsoBox>
        </motion.g>
      ))}
    </motion.svg>
  );
}
