import * as React from 'react';
import { createProjector } from '@/lib/iso';
import { IsoBox } from './iso-box';

export type IsoGlyphKind = 'cli' | 'skills' | 'notifier' | 'templates';

const iso = createProjector(13, 40, 30);

/** Lifts a part of the glyph while its bento cell is hovered. */
const LIFT = 'transition-[translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]';

function Cli(): React.JSX.Element {
  return (
    <>
      <IsoBox iso={iso} x={-0.4} y={-0.2} w={2.6} d={1.8} h={0.35} tone="ink" />
      <g className={`${LIFT} group-hover/cell:translate-y-[-7px]`}>
        <IsoBox iso={iso} x={0.6} y={0.3} z={0.35} w={0.8} d={0.8} h={0.8} tone="signal" />
      </g>
    </>
  );
}

function Skills(): React.JSX.Element {
  return (
    <>
      <IsoBox iso={iso} x={0} y={0} w={2} d={2} h={0.3} />
      <g className={`${LIFT} group-hover/cell:translate-y-[-4px]`}>
        <IsoBox iso={iso} x={0} y={0} z={0.55} w={2} d={2} h={0.3} />
      </g>
      <g className={`${LIFT} group-hover/cell:translate-y-[-9px]`}>
        <IsoBox iso={iso} x={0} y={0} z={1.1} w={2} d={2} h={0.3} tone="signal" />
      </g>
    </>
  );
}

function Notifier(): React.JSX.Element {
  return (
    <>
      <IsoBox iso={iso} x={0.2} y={0} w={1.2} d={2.2} h={0.25} tone="ink" />
      <g className={`${LIFT} group-hover/cell:translate-y-[-8px]`}>
        <IsoBox iso={iso} x={0.45} y={0.5} z={0.6} w={0.7} d={1.2} h={0.35} tone="signal" />
      </g>
    </>
  );
}

function Templates(): React.JSX.Element {
  const cells: [number, number][] = [
    [0, 0],
    [1.1, 0],
    [0, 1.1],
  ];
  return (
    <>
      {cells.map(([x, y]) => (
        <IsoBox key={`${x}-${y}`} iso={iso} x={x} y={y} w={0.9} d={0.9} h={0.6} />
      ))}
      <g className={`${LIFT} group-hover/cell:translate-y-[-8px]`}>
        <IsoBox iso={iso} x={1.1} y={1.1} w={0.9} d={0.9} h={0.6} tone="signal" />
      </g>
    </>
  );
}

const GLYPHS: Record<IsoGlyphKind, () => React.JSX.Element> = {
  cli: Cli,
  skills: Skills,
  notifier: Notifier,
  templates: Templates,
};

/** A small isometric emblem for a product cell. Decorative. */
export function IsoGlyph({ kind }: { kind: IsoGlyphKind }): React.JSX.Element {
  const Glyph = GLYPHS[kind];
  return (
    <svg viewBox="0 0 80 64" className="h-12 w-[60px] overflow-visible" aria-hidden="true">
      <Glyph />
    </svg>
  );
}
