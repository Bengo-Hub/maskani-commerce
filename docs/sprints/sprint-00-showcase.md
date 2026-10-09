# Sprint 0: scaffold and estate showcase

| Item | Detail |
|---|---|
| Scaffold | Next 16 App Router, Tailwind v4, brand tokens and logos, legal links, cookie consent, `/healthz` |
| Pages | `/`, `/estates/[slug]`, `/units/[id]` server rendered with ISR |
| Enquiry | Server action posting to maskani-api market enquiries; honeypot; success state |
| SEO | Metadata, canonical, Open Graph, JSON-LD for estates and units, sitemap of published estates |
| Devops | Dockerfile, `build.sh`, deploy workflow, devops-k8s `apps/maskani-commerce`, host `maskani.codevertexafrica.com` |

## Progress

As of 2026-10-08.

- [x] Docs: README, plan, UX/UI spec, sprints
- [x] maskani-api public market endpoints: `/api/v1/market/estates`, `/estates/{slug}`, rate limited `/enquiries`
- [x] devops-k8s `apps/maskani-commerce` values drafted (not yet committed; waits for the first image)
- [x] Scaffold (Next 16.4, shadcn components shared with maskani-ui), brand, `/healthz`; `pnpm audit --prod` clean
- [x] Home (published estates) and estate page with ISR (5 minutes), units grouped by type with from-price and payment example
- [x] Enquiry form with honeypot and consent. It posts from the visitor's browser to the public API, not through a server action, so the API's per-IP limit sees each visitor (an in-cluster post would put everyone behind the pod's IP)
- [x] SEO: metadata, canonical, Open Graph, JSON-LD (escaped), sitemap and robots
- [x] Dockerfile, `build.sh`, deploy workflow, repo `Bengo-Hub/maskani-commerce`
- [ ] Unit page (`/units/{id}`): the public unit route is not built in maskani-api yet
- [ ] Legal links and cookie consent
- [ ] Public estate photos: media is private (signed links); needs a public photo projection

### Gaps found by the 2026-10-09 audit
Plan: `.claude/plans/maskani-r1-completion-r2-rentals-2026-10-09.md` (wave in brackets).

- [ ] The acceptance line says an enquiry appears in maskani-ui under Sales; maskani-ui has no enquiries inbox yet although `GET /enquiries` and `PATCH /enquiries/{id}` exist (wave 2.12)
- [ ] `GET /market/units/{id}` is named in the UX spec but not built; unit page, unit JSON-LD and sitemap entries follow it (wave 2.12)
- [ ] Legal links and cookie consent from shared-ui-lib (`LegalLinks`, `CookieNotice`); add shared-ui-lib as a dependency (wave 2.12)
- [ ] Photos go through `next/image` with the configured remote pattern instead of a plain `<img>` (wave 1c)
- [ ] not-found and error pages (wave 1c)
- [ ] Dead code: `components/ui/badge.tsx`, `components/ui/checkbox.tsx`, the unused `unitId`/`unitLabel` props on `EnquiryForm`, three unused images in `public/images` (wave 1c)

## Acceptance

Estate and unit pages render with JavaScript disabled; Lighthouse mobile performance at least 90; an
enquiry appears in maskani-ui under Sales with the source unit.

## Rules to apply

Standing rules in [README.md](README.md).
