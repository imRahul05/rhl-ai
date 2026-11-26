/**
 * Isometric projection helpers shared by every iso illustration on the site.
 *
 * World space uses grid units: `x` runs right-and-down the page, `y` runs
 * left-and-down, `z` runs straight up. A true isometric projection is
 * orthographic — no vanishing point — so sizes never change with depth and
 * text on a front face stays crisp.
 */

/** cos(30°) and sin(30°): the two numbers isometric projection is built from. */
export const ISO_COS = Math.cos(Math.PI / 6);
export const ISO_SIN = 0.5;

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface IsoProjector {
  /** Edge length of one grid unit, in screen px (also the on-screen height of one z unit). */
  readonly unit: number;
  project: (x: number, y: number, z?: number) => Point;
}

/** Projector with its world origin at screen point (ox, oy). */
export function createProjector(unit: number, ox = 0, oy = 0): IsoProjector {
  return {
    unit,
    project: (x, y, z = 0) => ({
      x: ox + (x - y) * ISO_COS * unit,
      y: oy + (x + y) * ISO_SIN * unit - z * unit,
    }),
  };
}

export function toPoints(points: readonly Point[]): string {
  return points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
}

export interface BoxFaces {
  /** Polygon `points` strings, ready for an SVG `<polygon>`. */
  readonly top: string;
  readonly left: string;
  readonly right: string;
}

/**
 * The three visible faces of an axis-aligned box from (x, y, z) with size
 * (w, d, h). The two hidden faces are never drawn.
 */
export function boxFaces(
  iso: IsoProjector,
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
  h: number,
): BoxFaces {
  const p = iso.project;
  const top = [p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)];
  const left = [p(x, y + d, z + h), p(x + w, y + d, z + h), p(x + w, y + d, z), p(x, y + d, z)];
  const right = [p(x + w, y, z + h), p(x + w, y + d, z + h), p(x + w, y + d, z), p(x + w, y, z)];
  return { top: toPoints(top), left: toPoints(left), right: toPoints(right) };
}

/**
 * SVG `transform` that lays 2D content flat on a box's top face, reading along
 * the +x axis. `(x, y, z)` is the face corner the text starts from.
 */
export function topFaceTransform(iso: IsoProjector, x: number, y: number, z: number): string {
  const o = iso.project(x, y, z);
  return `matrix(${ISO_COS} ${ISO_SIN} ${-ISO_COS} ${ISO_SIN} ${o.x.toFixed(2)} ${o.y.toFixed(2)})`;
}

/** SVG `transform` for 2D content on the left (+y facing) wall, reading along +x. */
export function leftFaceTransform(iso: IsoProjector, x: number, y: number, z: number): string {
  const o = iso.project(x, y, z);
  return `matrix(${ISO_COS} ${ISO_SIN} 0 1 ${o.x.toFixed(2)} ${o.y.toFixed(2)})`;
}
