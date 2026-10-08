import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DM_Sans, Fraunces, Outfit } from 'next/font/google';
import { SiteNav } from '@/components/site-nav';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap', weight: ['500', '600', '700'] });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap', weight: ['400', '500', '600'] });
// Soft serif for headlines; body text stays DM Sans and figures stay Outfit.
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap', axes: ['SOFT', 'opsz'] });

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://maskani.codevertexafrica.com';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://maskaniapp.codevertexafrica.com';

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#6E1A5A' };

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'Maskani Marketplace', template: '%s | Maskani Marketplace' },
  description: 'Homes in verified estates managed on Maskani. See units, prices and payment plans, and enquire directly.',
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/icons/favicon-32.png', sizes: '32x32' }], apple: '/icons/apple-touch-icon.png' },
  openGraph: { siteName: 'Maskani Marketplace', type: 'website', images: ['/brand/maskani-marketplace-logo.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable} ${fraunces.variable}`}>
      <body className="bg-paper font-sans">
        <SiteNav />
        <main className="min-h-[70dvh]">{children}</main>
        <footer className="border-t border-border/60 bg-background">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto]">
            <div className="max-w-md space-y-3">
              <Image src="/brand/maskani-marketplace-logo.svg" alt="Maskani Marketplace" width={150} height={32} />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Never pay a deposit before viewing and signing. Estates on Maskani take payments only on their own verified paybill,
                shown on the bill from the developer.
              </p>
            </div>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground" aria-label="Footer">
              <Link href="/#estates" className="hover:text-foreground">Estates</Link>
              <Link href="/#buying" className="hover:text-foreground">How buying works</Link>
              <a href={APP_URL} className="hover:text-foreground">Estate sign-in</a>
            </nav>
          </div>
          <div className="border-t border-border/60">
            <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6">Maskani Marketplace by Codevertex Africa Limited, Nairobi.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
