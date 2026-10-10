// Imported only from server components. Server components read the public projection in-cluster (values.yaml MASKANI_API_INTERNAL_URL),
// never through the public domain and Cloudflare. Local dev falls back to the public API.
const API = process.env.MASKANI_API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || 'https://maskaniapi.codevertexafrica.com';
const REVALIDATE = 300;

export interface PublicUnit {
  id: string;
  code: string;
  unit_type: string;
  bedrooms?: number;
  bathrooms?: number;
  size_sqm?: string;
  floor?: string;
  status: string;
  price?: string;
  reservation_fee?: string;
  deposit_pct?: number;
  max_term_months?: number;
  features?: string[];
  photos?: string[];
}

export interface PublicEstate {
  id: string;
  slug: string;
  name: string;
  description?: string;
  area?: string;
  town?: string;
  county?: string;
  latitude?: number;
  longitude?: number;
  amenities?: string[];
  photos?: string[];
  verified: boolean;
  units: PublicUnit[];
  available: number;
  from_price?: string;
  phone?: string;
}

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}/api/v1/market${path}`, { next: { revalidate: REVALIDATE }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function listEstates(): Promise<PublicEstate[]> {
  const res = await get<{ data?: PublicEstate[] } | PublicEstate[]>('/estates');
  if (!res) return [];
  return Array.isArray(res) ? res : res.data ?? [];
}

export function getEstate(slug: string): Promise<PublicEstate | null> {
  return get<PublicEstate>(`/estates/${encodeURIComponent(slug)}`);
}

/**
 * Photos the public site shows: the API's own published media links only (estate and unit photos),
 * on the host next.config's remotePatterns lets next/image optimise. Anything else is dropped.
 */
export function publicPhotos(list?: string[]): string[] {
  return (list ?? []).filter((p) => /^https:\/\/maskaniapi\.codevertexafrica\.com\/media\/tenants\/[^/]+\/(properties|units)\//.test(p));
}
