import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

/** Unknown paths and estates that are not (or no longer) published land here. */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-20 text-center sm:px-6">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
        <Building2 className="h-6 w-6" aria-hidden />
      </span>
      <h1 className="font-serif-soft text-3xl leading-tight sm:text-4xl">We could not find that page</h1>
      <p className="text-muted-foreground">
        The estate may no longer be listed, or the link may be mistyped. Every estate taking enquiries is on the home page.
      </p>
      <Link href="/#estates" className={buttonVariants({ size: 'lg' })}>See all estates</Link>
    </div>
  );
}
