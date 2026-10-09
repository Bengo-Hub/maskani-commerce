'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';

/** Shown when a page fails to render; the site header and footer stay in place around it. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-20 text-center sm:px-6">
      <h1 className="font-serif-soft text-3xl leading-tight sm:text-4xl">Something went wrong</h1>
      <p className="text-muted-foreground">
        This page did not load. Try again in a moment; if it keeps happening, the estate list on the home page still works.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button size="lg" onClick={reset}><RefreshCw aria-hidden /> Try again</Button>
        <Link href="/" className={buttonVariants({ size: 'lg', variant: 'outline' })}>Go to the home page</Link>
      </div>
      {error.digest && <p className="text-xs text-muted-foreground">Reference {error.digest}</p>}
    </div>
  );
}
