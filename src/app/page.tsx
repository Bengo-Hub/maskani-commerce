import Link from 'next/link';
import { BadgeCheck, MapPin } from 'lucide-react';
import { listEstates } from '@/lib/market';
import { kes, num } from '@/lib/utils';

export const revalidate = 300;

export default async function HomePage() {
  const estates = await listEstates();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="mb-8 max-w-2xl space-y-3">
        <h1 className="text-3xl font-bold sm:text-4xl">Homes in verified estates</h1>
        <p className="text-muted-foreground">Every estate here is managed on Maskani. Prices and payment plans come straight from the developer, and enquiries go to their own sales team.</p>
      </section>
      {estates.length === 0 ? (
        <p className="rounded-xl border bg-card p-8 text-center text-muted-foreground">No estates are listed right now. Please check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {estates.map((e) => (
            <Link key={e.id} href={`/estates/${e.slug}`} className="group rounded-xl border bg-card p-5 transition-colors hover:border-primary/40">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold group-hover:text-primary">{e.name}</h2>
                {e.verified && <BadgeCheck className="h-5 w-5 shrink-0 text-success" aria-label="Verified" />}
              </div>
              {(e.area || e.town) && <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {[e.area, e.town].filter(Boolean).join(', ')}</p>}
              <p className="mt-4 text-sm">
                {e.available > 0 ? <>{e.available} available{num(e.from_price) > 0 && <> from <strong className="tabular">{kes(e.from_price)}</strong></>}</> : 'Fully sold'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
