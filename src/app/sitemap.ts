import type { MetadataRoute } from 'next';
import { listEstates } from '@/lib/market';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://maskani.codevertexafrica.com';
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const estates = await listEstates();
  return [
    { url: `${SITE}/`, changeFrequency: 'daily', priority: 1 },
    ...estates.map((e) => ({ url: `${SITE}/estates/${e.slug}`, changeFrequency: 'daily' as const, priority: 0.8 })),
  ];
}
