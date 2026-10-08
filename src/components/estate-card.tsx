import Link from 'next/link';
import { BadgeCheck, Building2, MapPin } from 'lucide-react';
import { publicPhotos, type PublicEstate } from '@/lib/market';
import { kes, num } from '@/lib/utils';

/**
 * One estate in the grid. Shows the estate's own cover photo; without one it shows a plain tile with
 * the estate initials, never a stock photo, so a buyer is not misled about what the estate looks like.
 */
export function EstateCard({ estate: e }: { estate: PublicEstate }) {
  const cover = publicPhotos(e.photos)[0];
  const where = [e.area, e.town].filter(Boolean).join(', ');
  const initials = e.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <Link href={`/estates/${e.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="photo-zoom relative aspect-[4/3] bg-secondary">
        {cover ? (
          // Estate photos can sit on any https host the developer uses, so a plain lazy img rather than next/image.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt={e.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-primary/70">
            <Building2 className="h-7 w-7" aria-hidden />
            <span className="font-serif-soft text-3xl text-primary">{initials}</span>
          </div>
        )}
        {e.verified && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-card/95 px-3 py-1 text-xs font-medium text-success shadow-soft">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden /> Verified
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="font-serif-soft text-xl leading-snug transition-colors group-hover:text-primary">{e.name}</h3>
        {where && <p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" aria-hidden /> {where}</p>}
        <p className="mt-auto pt-3 text-sm">
          {e.available > 0 ? (
            <>
              <span className="text-muted-foreground">{e.available} available</span>
              {num(e.from_price) > 0 && <> from <strong className="tabular font-semibold">{kes(e.from_price)}</strong></>}
            </>
          ) : <span className="text-muted-foreground">Fully sold</span>}
        </p>
      </div>
    </Link>
  );
}
