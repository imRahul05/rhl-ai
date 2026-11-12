import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound(): React.JSX.Element {
  return (
    <main id="main" className="flex flex-1 flex-col items-start justify-center px-4 py-32 sm:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <p className="label">
          <span className="text-primary">404</span> — Not found
        </p>
        <h1 className="display-xl mt-6">No such file or directory.</h1>
        <p className="mt-6 font-mono text-sm text-muted-foreground">
          <span className="text-primary">❯</span> cd /
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
