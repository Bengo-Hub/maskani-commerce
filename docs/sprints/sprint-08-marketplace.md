# Sprint 8: Release 3 marketplace

Matches `maskani-api/docs/sprints/sprint-08-r3-marketplace.md`.

| Item | Detail |
|---|---|
| Search | Filters (purpose, category, location, price, bedrooms, size, amenities, furnished, parking, availability date, verified only), sort, pagination |
| Map | Clustered pins and drawn areas through `@bengo-hub/maps`; distance to roads, schools, hospitals where known |
| Listing pages | Rent and sale, all categories; verified badge with date; lister card with masked contact |
| Seeker account | Phone OTP; saved searches with alerts; favourites |
| Enquiries and viewings | Enquiry with masked contact; viewing slot booking with reminders |
| Applications and offers | Rental application into the lister's leasing workflow; offer on a sale listing |
| Listers | Listing plans, featured placement paid through treasury, listing performance stats |
| Moderation | Report a listing; takedown notices |
| SEO | Area pages, sitemaps, structured data, canonical links |
| Categories and kinds | Homes, offices and co-working, shops, warehouses, land; for sale, rent, lease and short stay. Workspace listings book by the hour, day or month; short stays open the unit's pos-api booking widget |
| Land | Plot size, zoning, title type, and the official search date (ArdhiSasa or registry) shown on verified land listings; safe-payment rule on every land and sale page |
| Management tenders | Owners post a request for management (property, units, services, budget); verified management firms bid; side-by-side comparison; the accepted bid becomes a mandate in the firm's Maskani tenant. Research in `maskani-api/docs/market-research.md` |
| Lister profiles | Agency or firm page with verification badge and date, EARB number for agents, active listings, response time |

## Rules to apply

Standing rules in [README.md](README.md); map components from the shared maps package (tenant slug and
token on its WebSocket, see `logistics-fleet-ws-and-notifications-2026-09-19.md`).
