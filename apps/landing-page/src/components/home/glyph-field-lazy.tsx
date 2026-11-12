'use client';

import dynamic from 'next/dynamic';
import type { GlyphFieldProps } from './glyph-field';

/** Canvas code is split out and never server-rendered; the hero paints without it. */
const GlyphField = dynamic(() => import('./glyph-field'), { ssr: false });

export function GlyphFieldLazy(props: GlyphFieldProps): React.JSX.Element {
  return <GlyphField {...props} />;
}
