'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Posted from the visitor's browser to the public API so its per-IP rate limit sees the real
// visitor (an in-cluster post from this server would put every visitor behind one IP).
const API = process.env.NEXT_PUBLIC_API_URL || 'https://maskaniapi.codevertexafrica.com';

export function EnquiryForm({ estateSlug, unitId, unitLabel }: { estateSlug: string; unitId?: string; unitLabel?: string }) {
  const [f, setF] = useState({ name: '', phone: '', email: '', message: unitLabel ? `I am interested in ${unitLabel}.` : '', preferred: 'whatsapp', consent: false, website: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.phone.trim() || !f.consent) return;
    setState('sending');
    setError('');
    try {
      const res = await fetch(`${API}/api/v1/market/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estate_slug: estateSlug, unit_id: unitId, name: f.name.trim(), phone: f.phone.trim(), email: f.email.trim(),
          message: f.message.trim(), interest: 'buy', preferred_contact: f.preferred, consent_to_share: f.consent, website: f.website,
        }),
      });
      if (res.status === 429) throw new Error('Too many enquiries from this connection. Try again in a minute.');
      if (!res.ok) throw new Error('Your enquiry did not go through. Check the details and try again.');
      setState('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Your enquiry did not go through.');
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="flex flex-col items-center gap-2 py-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-success" />
        <p className="font-semibold">Thank you. The sales team will contact you.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="space-y-1.5"><Label htmlFor="eq-name">Name</Label><Input id="eq-name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} required autoComplete="name" /></div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1.5"><Label htmlFor="eq-phone">Phone</Label><Input id="eq-phone" type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} required autoComplete="tel" /></div>
        <div className="space-y-1.5"><Label htmlFor="eq-email">Email</Label><Input id="eq-email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" /></div>
      </div>
      <div className="space-y-1.5"><Label htmlFor="eq-msg">Message</Label><Textarea id="eq-msg" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} rows={3} /></div>
      <div className="space-y-1.5">
        <Label htmlFor="eq-pref">Best way to reach you</Label>
        <select id="eq-pref" value={f.preferred} onChange={(e) => setF({ ...f, preferred: e.target.value })} className="h-10 w-full rounded-lg border bg-background px-3 text-sm">
          <option value="whatsapp">WhatsApp</option>
          <option value="call">Phone call</option>
          <option value="email">Email</option>
        </select>
      </div>
      {/* Honeypot: hidden from people, filled by bots. */}
      <input type="text" name="website" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input type="checkbox" checked={f.consent} onChange={(e) => setF({ ...f, consent: e.target.checked })} className="mt-0.5 h-4 w-4" required />
        I agree that the estate&apos;s sales team may contact me about this enquiry.
      </label>
      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
      <Button type="submit" size="lg" className="h-11 w-full" disabled={state === 'sending' || !f.consent}>{state === 'sending' ? 'Sending...' : 'Send enquiry'}</Button>
    </form>
  );
}
