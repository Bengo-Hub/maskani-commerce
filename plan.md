# maskani-commerce plan

## Release 1: estate showcase (demo slice)

| Page | Content |
|---|---|
| `/` | Maskani Marketplace introduction, featured estates (tenants that opted in), how verification works, "never pay before viewing" safety note |
| `/estates/[slug]` | Estate profile: name, location (town, area), amenities, photos, units for sale grouped by type with price, size, bedrooms, status (available or reserved), enquiry form |
| `/units/[id]` | Unit page: photos, price, deposit and instalment example from the price list, features, enquiry form |
| `/legal/*` | Terms and privacy from shared-ui-lib legal links |

Enquiries go to `POST /api/v1/market/enquiries` (rate limited); the developer sees them in maskani-ui
under Sales. Contacts stay masked until the seeker chooses to share.

## Release 3: full marketplace

Listings for rent and sale across categories, search with filters, map search (Codevertex maps
service), saved searches and favourites, lister verification badges, moderation reporting, viewing
booking, online applications into leasing, offers into sales, featured placement and listing plans
paid through treasury, server-rendered listing and area pages with structured data, canonical links
and sitemaps (NFR-12), 99.9% availability target.

## Sprints

| Sprint | Scope |
|---|---|
| [S0](docs/sprints/sprint-00-showcase.md) | Scaffold, brand, devops, estate showcase |
| [S8](docs/sprints/sprint-08-marketplace.md) | Release 3 marketplace |
