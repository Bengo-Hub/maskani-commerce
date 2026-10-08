import type { CSSProperties } from 'react';
import Image from 'next/image';
import { BadgeCheck, CalendarCheck, FileSignature, Home, KeyRound, MessageSquareText, ShieldCheck, Wallet } from 'lucide-react';
import { EstateCard } from '@/components/estate-card';
import { Reveal } from '@/components/reveal';
import { listEstates } from '@/lib/market';

export const revalidate = 300;

const PROMISES = [
  { icon: BadgeCheck, text: 'Developers checked before they list' },
  { icon: Wallet, text: 'Prices and plans straight from the developer' },
  { icon: ShieldCheck, text: "Pay only to the estate's own paybill" },
];

const WHY = [
  {
    img: '/images/estate-gate.webp',
    alt: 'The gate and guard house of a residential estate',
    title: 'Security that is already running',
    body: 'The gate, visitor passes and guards are managed on Maskani from the day you move in, not promised for later.',
  },
  {
    img: '/images/owners-keys.webp',
    alt: 'Wooden family figures and a house beside a set of keys',
    title: 'Every payment on your statement',
    body: 'Your deposit and each instalment show on your own buyer statement as they arrive, so you always know where you stand.',
  },
  {
    img: '/images/home-lounge.webp',
    alt: 'A sunlit lounge with plants',
    title: 'Service charge you can see',
    body: 'After handover you see exactly what the estate bills you for, and pay it by M-Pesa from the same account.',
  },
];

const STEPS = [
  { icon: MessageSquareText, title: 'Enquire', body: 'Send a message from the estate page. It goes straight to the developer sales team.' },
  { icon: CalendarCheck, title: 'View and reserve', body: 'Visit the unit, then reserve it with the fee shown on the price list.' },
  { icon: FileSignature, title: 'Sign and pay on a plan', body: 'Sign the sale agreement and pay the deposit and instalments to the estate paybill.' },
  { icon: KeyRound, title: 'Take the keys', body: 'At handover your owner account opens, with your statement, bills and gate passes.' },
];

export default async function HomePage() {
  const estates = await listEstates();
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:pt-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-card shadow-lift">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image src="/images/apartments-modern.webp" alt="Modern apartment blocks seen from below against a clear sky" fill priority sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
          </div>
          {/* Phones: the card sits under the photo, overlapping its edge. Wider: it floats over the photo. */}
          <div className="relative mx-3 -mt-10 mb-3 rounded-[1.5rem] bg-card p-6 sm:absolute sm:bottom-6 sm:left-6 sm:m-0 sm:max-w-lg sm:bg-card/95 sm:p-8 sm:backdrop-blur-sm lg:bottom-8 lg:left-8">
            <p className="animate-rise text-sm font-medium tracking-wide text-gold">Maskani Marketplace</p>
            <h1 className="animate-rise mt-2 font-serif-soft text-4xl leading-[1.05] sm:text-5xl" style={{ '--rise-delay': '80ms' } as CSSProperties}>
              Homes in estates that already run well.
            </h1>
            <p className="animate-rise mt-4 text-[1.05rem] leading-relaxed text-muted-foreground" style={{ '--rise-delay': '160ms' } as CSSProperties}>
              Every estate here is managed on Maskani, so the gate, the bills and your statement work from the day you move in.
            </p>
            <a href="#estates" className="animate-rise mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90" style={{ '--rise-delay': '240ms' } as CSSProperties}>
              <Home className="h-4 w-4" aria-hidden /> See the estates
            </a>
          </div>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {PROMISES.map((p, i) => (
            <li key={p.text} className="animate-rise flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3 text-sm" style={{ '--rise-delay': `${300 + i * 60}ms` } as CSSProperties}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><p.icon className="h-4 w-4" aria-hidden /></span>
              {p.text}
            </li>
          ))}
        </ul>
      </section>

      {/* Listings */}
      <section id="estates" className="scroll-mt-20 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl space-y-2">
              <h2 className="font-serif-soft text-4xl leading-tight">Estates selling now</h2>
              <p className="text-muted-foreground">Units, prices and payment plans as the developer has them today.</p>
            </div>
            {estates.length > 0 && <p className="text-sm text-muted-foreground">{estates.length} {estates.length === 1 ? 'estate' : 'estates'}</p>}
          </Reveal>
          {estates.length === 0 ? (
            <Reveal>
              <div className="grid overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-soft md:grid-cols-[1fr_1.1fr]">
                <div className="photo-zoom relative min-h-56">
                  <Image src="/images/sales-keys.webp" alt="House keys resting among small model houses" fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col justify-center gap-3 p-8 sm:p-10">
                  <h3 className="font-serif-soft text-2xl">New estates are on their way</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    We list an estate only once its developer is verified and its units and prices are loaded. Please check back soon.
                  </p>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {estates.map((e, i) => (
                <Reveal key={e.id} delay={(i % 3) * 80} className="h-full">
                  <EstateCard estate={e} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why a managed estate */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-10 max-w-2xl space-y-2">
            <h2 className="font-serif-soft text-4xl leading-tight sm:text-5xl">Why buy in a managed estate</h2>
            <p className="text-lg text-muted-foreground">You are buying the way the estate is run, not only the unit.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 90}>
                <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-soft">
                  <div className="photo-zoom relative aspect-[4/3]">
                    <Image src={w.img} alt={w.alt} fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{w.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted-foreground">{w.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How buying works */}
      <section id="buying" className="scroll-mt-20 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto mb-12 max-w-2xl space-y-2 text-center">
            <h2 className="font-serif-soft text-4xl leading-tight sm:text-5xl">How buying works</h2>
            <p className="text-lg text-muted-foreground">Four steps, and you can see each one on your account.</p>
          </Reveal>
          <ol className="relative grid gap-4 md:grid-cols-4">
            {/* The thread joining the steps on wide screens. */}
            <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t border-dashed border-primary/30 md:block" />
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="relative">
                <div className="flex h-full flex-col items-start gap-3 rounded-[1.5rem] border border-border/60 bg-card p-5 md:items-center md:text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
                    <s.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-xs font-medium tracking-wide text-gold">Step {i + 1}</span>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Developers */}
      <section id="developers" className="scroll-mt-20 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="grid overflow-hidden rounded-[2rem] bg-primary text-primary-foreground lg:grid-cols-2">
              <div className="photo-zoom relative min-h-64 lg:order-last lg:min-h-full">
                <Image src="/images/tower-green.webp" alt="A residential tower with planted balconies" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
                <h2 className="font-serif-soft text-3xl leading-tight sm:text-4xl">Selling units in your estate?</h2>
                <p className="max-w-md text-primary-foreground/80">
                  Estates managed on Maskani can list their available units here. Prices, reservations and sale contracts come from the same
                  system you already use to run the estate.
                </p>
                <a href="mailto:info@codevertexafrica.com?subject=Listing%20on%20Maskani%20Marketplace" className="inline-flex w-fit items-center rounded-full bg-card px-6 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5">
                  Talk to us about listing
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
