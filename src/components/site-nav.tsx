'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://maskaniapp.codevertexafrica.com';

/** Top bar: transparent at the top of the page, a soft white bar with a hairline once scrolled. */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,border-color] duration-300',
        scrolled ? 'border-b border-border/70 bg-background/85 backdrop-blur-md' : 'border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6" aria-label="Main">
        <Link href="/" aria-label="Maskani Marketplace home" className="shrink-0">
          <Image src="/brand/maskani-marketplace-logo.svg" alt="Maskani Marketplace" width={170} height={36} priority className="h-8 w-auto sm:h-9" />
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          <li><Link href="/#estates" className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">Estates</Link></li>
          <li><Link href="/#buying" className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">How buying works</Link></li>
          <li><Link href="/#developers" className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">For developers</Link></li>
        </ul>
        <a href={APP_URL} className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:px-5">
          Estate sign-in
        </a>
      </nav>
    </header>
  );
}
