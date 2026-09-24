import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#07090e] text-white px-4 text-center">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
        <Sparkles className="w-6 h-6" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-3">404 — Page Not Found</h1>
      <p className="text-slate-400 text-sm max-w-md mb-8">
        The requested resource in the RHL AI ecosystem could not be located.
      </p>
      <Link href="/">
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
}
