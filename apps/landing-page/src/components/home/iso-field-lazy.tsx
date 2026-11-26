'use client';

import dynamic from 'next/dynamic';

/** Canvas code is split out and never server-rendered; the hero paints without it. */
const IsoField = dynamic(() => import('./iso-field'), { ssr: false });

export function IsoFieldLazy(): React.JSX.Element {
  return <IsoField />;
}
