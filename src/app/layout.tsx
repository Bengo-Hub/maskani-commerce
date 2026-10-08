import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DM_Sans, Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap', weight: ['500', '600', '700'] });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap', weight: ['400', '500', '600'] });

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://maskani.codevertexafrica.com';

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
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="font-sans">
        <header className="border-b bg-card">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link href="/" aria-label="Maskani Marketplace home">
              <Image src="/brand/maskani-marketplace-logo.svg" alt="Maskani Marketplace" width={190} height={40} priority />
            </Link>
            <a href="https://maskaniapp.codevertexafrica.com" className="text-sm font-medium text-primary">Estate sign-in</a>
          </div>
        </header>
        <main className="min-h-[70dvh]">{children}</main>
        <footer className="mt-12 border-t bg-card">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
            <span>Maskani Marketplace by Codevertex Africa Limited</span>
            <span>Never pay a deposit before viewing and signing. Managed estates take payments only on their own verified paybill.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
