# maskani-commerce UX and UI specification

## Principles

- **Trust first.** Fake listings and deposit scams are the main risk in Kenyan house hunting. Every
  page shows who lists the property, whether it is verified (managed on Maskani or verified lister,
  with date), and the rule that deposits for managed units are paid only to the business's verified
  paybill through the platform.
- **Fast on phones.** Server-rendered HTML, images as resized WebP through `next/image`, no client
  data fetching for listing content, LCP under 2.5 s on 3G.
- **Search engines.** Each estate and unit page has a canonical URL, Open Graph image, and
  `schema.org` structured data (`Residence`, `Offer`, `Place`); sitemap and robots generated from the
  published projection (R3 for the full set; estates and units in R1).
- **Plain design.** Maskani Marketplace logo, plum and gold tokens, no gradients, no AI-look icons.

## Brand

`public/brand/maskani-marketplace-logo.svg` (header), `maskani-marketplace-logo-dark.svg` (footer),
`maskani-marketplace-logo-stacked.svg` (share cards), favicon set. Tokens as in maskani-ui: plum
`#6E1A5A`, deep plum `#4E1240`, gold `#C8963E`, light gold `#E7C27A`, slate `#6A6E78`.

## Pages

### Estate page

```
[Marketplace logo]                                   [List your property]
Shaba Village, Syokimau                     Verified developer, managed on Maskani
Photos carousel
Amenities: borehole, perimeter wall, 24h security, parking
Units for sale
  3 bedroom apartment   from KES 7,500,000   120 m2   Available 6
  2 bedroom apartment   from KES 5,800,000    86 m2   Available 4
Payment example: 20% deposit, balance over 24 months (from the price list)
[ Enquire ]  form: name, phone, message, preferred contact; consent tick
Safety: never pay before viewing and signing
```

### Unit page

Photos, price, size, bedrooms, floor, block, features, payment example, estate summary, enquiry form,
share button.

## Data

Server components call maskani-api `GET /api/v1/market/estates/{slug}` and `/units/{id}` with ISR
revalidate 300 s; enquiry posts through a server action with honeypot and rate limiting on the API.
