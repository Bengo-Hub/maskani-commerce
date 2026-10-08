import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BadgeCheck, MapPin, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnquiryForm } from '@/components/enquiry-form';
import { getEstate, publicPhotos, type PublicUnit } from '@/lib/market';
import { kes, num, titleCase } from '@/lib/utils';

export const revalidate = 300;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEstate(slug);
  if (!e) return { title: 'Estate not found' };
  const where = [e.area, e.town].filter(Boolean).join(', ');
  return {
    title: `${e.name}${where ? `, ${where}` : ''}`,
    description: e.description?.slice(0, 160) || `Units for sale at ${e.name}${where ? ` in ${where}` : ''}.`,
    alternates: { canonical: `/estates/${e.slug}` },
    openGraph: { title: e.name, images: publicPhotos(e.photos).slice(0, 1) },
  };
}

/** Units grouped by type with the lowest price and how many are available. */
function byType(units: PublicUnit[]) {
  const m = new Map<string, { type: string; count: number; from: number; size: number; beds?: number; deposit?: number; term?: number }>();
  for (const u of units) {
    if (u.status !== 'available') continue;
    const k = u.unit_type || 'Unit';
    const cur = m.get(k);
    const price = num(u.price);
    if (!cur) m.set(k, { type: k, count: 1, from: price, size: num(u.size_sqm), beds: u.bedrooms, deposit: u.deposit_pct, term: u.max_term_months });
    else { cur.count += 1; if (price > 0 && (cur.from === 0 || price < cur.from)) cur.from = price; }
  }
  return [...m.values()];
}

export default async function EstatePage({ params }: Params) {
  const { slug } = await params;
  const e = await getEstate(slug);
  if (!e) notFound();
  const types = byType(e.units ?? []);
  const photos = publicPhotos(e.photos);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: e.name,
    description: e.description,
    address: { '@type': 'PostalAddress', addressLocality: e.town, addressRegion: e.county, addressCountry: 'KE' },
    ...(e.latitude && e.longitude ? { geo: { '@type': 'GeoCoordinates', latitude: e.latitude, longitude: e.longitude } } : {}),
    ...(num(e.from_price) > 0 ? { offers: { '@type': 'AggregateOffer', priceCurrency: 'KES', lowPrice: num(e.from_price), offerCount: e.available } } : {}),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* "<" escaped so text from the estate record can never close the script tag. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold">{e.name}</h1>
        <p className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {(e.area || e.town) && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {[e.area, e.town, e.county].filter(Boolean).join(', ')}</span>}
          {e.verified && <span className="flex items-center gap-1 font-medium text-success"><BadgeCheck className="h-4 w-4" /> Verified developer, managed on Maskani</span>}
        </p>
      </div>
      {photos.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {photos.slice(0, 6).map((p) => <img key={p} src={p} alt={e.name} className="aspect-[4/3] w-full rounded-lg object-cover" />)}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {e.description && <p className="whitespace-pre-line text-muted-foreground">{e.description}</p>}
          {(e.amenities?.length ?? 0) > 0 && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Amenities</h2>
              <ul className="flex flex-wrap gap-2">{e.amenities!.map((a) => <li key={a} className="rounded-full border bg-card px-3 py-1 text-sm">{titleCase(a)}</li>)}</ul>
            </div>
          )}
          <Card>
            <CardHeader><CardTitle>Units for sale</CardTitle></CardHeader>
            <CardContent className="p-0">
              {types.length === 0 ? <p className="px-6 py-6 text-sm text-muted-foreground">All units are sold or reserved.</p> : (
                <ul className="divide-y">
                  {types.map((t) => (
                    <li key={t.type} className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                      <div>
                        <p className="font-medium">{titleCase(t.type)}</p>
                        <p className="text-xs text-muted-foreground">{[t.beds != null ? `${t.beds} bedrooms` : '', t.size ? `${t.size} m2` : '', `${t.count} available`].filter(Boolean).join(' · ')}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        {t.from > 0 && <p className="font-semibold tabular">from {kes(t.from)}</p>}
                        {t.deposit && t.term ? <p className="text-xs text-muted-foreground">{t.deposit}% deposit, balance over up to {t.term} months</p> : null}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <p className="flex items-start gap-2 rounded-lg bg-secondary px-4 py-3 text-sm">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            Never pay before viewing and signing. Deposits for this estate are paid only to its own paybill, shown on your bill from the developer.
          </p>
        </div>
        <Card className="h-fit lg:sticky lg:top-6">
          <CardHeader><CardTitle>Enquire</CardTitle></CardHeader>
          <CardContent><EnquiryForm estateSlug={e.slug} /></CardContent>
        </Card>
      </div>
    </div>
  );
}
