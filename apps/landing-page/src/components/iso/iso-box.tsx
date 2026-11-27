import * as React from 'react';
import { boxFaces, type IsoProjector } from '@/lib/iso';
import { cn } from '@/lib/utils';

export type IsoTone = 'paper' | 'signal' | 'ink' | 'ghost' | 'hit' | 'miss';

export interface IsoBoxProps {
  iso: IsoProjector;
  x: number;
  y: number;
  z?: number;
  w?: number;
  d?: number;
  h?: number;
  tone?: IsoTone;
  className?: string;
  style?: React.CSSProperties;
  /** Extra SVG drawn after the faces (labels on the top face, etc.). */
  children?: React.ReactNode;
}

/**
 * One axis-aligned isometric box as an SVG group. Face colours come from the
 * theme tokens (see `.iso-*` in globals.css), so every box re-themes with the page.
 */
export function IsoBox({
  iso,
  x,
  y,
  z = 0,
  w = 1,
  d = 1,
  h = 1,
  tone = 'paper',
  className,
  style,
  children,
}: IsoBoxProps): React.JSX.Element {
  const faces = boxFaces(iso, x, y, z, w, d, h);
  return (
    <g className={cn('iso-box', `iso-${tone}`, className)} style={style}>
      <polygon className="iso-face-left" points={faces.left} />
      <polygon className="iso-face-right" points={faces.right} />
      <polygon className="iso-face-top" points={faces.top} />
      {children}
    </g>
  );
}
