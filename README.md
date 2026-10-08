# maskani-commerce

**Maskani Marketplace**, the public property site of Maskani by Codevertex
(`https://maskani.codevertexafrica.com`). The SRDD calls this component maskani-marketplace.

Release 3 (Q3 2027) delivers the full marketplace: homes, offices, shops, warehouses and land for
rent or sale, verified listers, search and map, enquiries, viewings and applications. Release 1 ships
an **estate showcase**: a server-rendered page per estate listing its units for sale from the
developer's live price list, with an enquiry form.

It reads only a published projection from maskani-api (`/api/v1/market/*`). It has no route to any
tenant's operational data and no sign-in for browsing.

## Documents

| File | Content |
|---|---|
| [plan.md](plan.md) | Scope by release |
| [docs/ux-ui-spec.md](docs/ux-ui-spec.md) | Pages, SEO, trust signals, brand |
| [docs/sprints/](docs/sprints/README.md) | Sprint plans and rules |

## Stack

Next 16 App Router with server rendering and ISR, React 19, Tailwind v4, `@bengo-hub/shared-ui-lib`
(legal links, cookie consent), pnpm. No client-side data fetching for listing pages; enquiries post
through a server action to maskani-api.

```bash
cp .env.example .env.local
pnpm install
pnpm dev        # http://localhost:3021
pnpm type-check && pnpm build
```
