# Travel With Saadi

A frontend-only Pakistan tour website built with React, TypeScript, Vite, React Router, GSAP/ScrollTrigger, and the existing responsive CSS design. Authentic local photographs, the Attabad video, animated navigation, destination stories, and the floating 3D enquiry ticket are retained.

## Start

Use Node 22.12+ or a compatible newer Node version.

```bash
npm ci
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

The ZIP includes complete source and a ready-built `dist/` directory. Serve `dist/` over HTTP on a static host; do not open its HTML using `file://`.

## Pages

| Route                   | Purpose                                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| `/#/`                   | Search, four popular destinations, three featured tours, reasons to choose Saadi, reviews, booking entry |
| `/#/destinations`       | Twelve places with name/region filters                                                                   |
| `/#/destinations/:id`   | Existing cinematic treatment, photos, and only tours visiting that place                                 |
| `/#/tours`              | Thirteen tours; destination, days, price, type, saved tours, and sorting                                 |
| `/#/tours/:id`          | Tour story, itinerary, price status, inclusions, dates, reviews, and persistent booking button           |
| `/#/booking?tour=hunza` | Choose date/group → details → review/send → confirmation                                                 |
| `/#/thank-you`          | Enquiry reference and next steps; never falsely claims a booking                                         |
| `/#/about`              | Saadi, values, and the personal planning story                                                           |
| `/#/contact`            | Phone/WhatsApp/email, short enquiry form, common questions, opt-in area map                              |
| `/#/terms`              | Enquiry terms and explanation of information handling                                                    |
| `/#/experiences`        | Retained travel styles and whole photo/story sections moved from Home                                    |
| `/#/credits`            | Original image and film attributions                                                                     |

Legacy `/trip/:id`, `/plan?destination=...`, and original HTML entry points remain supported. Old destination catalog links with type, duration, sorting, or saved filters open the Tours catalog with those filters. `/privacy` also opens Terms & privacy.

## Booking and real data

There is no payment processor, seat inventory, backend, or automatically confirmed booking. The user opens WhatsApp/email and presses Send themselves. The final reference identifies a prepared enquiry, not a confirmed reservation. An external app opening does not prove delivery.

`src/data.ts` contains the tours and their destination mapping. The original project has no verified rates, departures, inclusions, or customer reviews, so no figures or testimonials were invented. Populate these optional fields with operator-approved information:

- `pricePerPerson`: PKR rate used for starting prices, numeric price filters, and live group totals.
- `departures`: future ISO dates (`YYYY-MM-DD`) when the operator supplies fixed departures.
- `includes`: confirmed inclusions.
- `reviews`: real entries with `name`, `rating`, and `text`.

Until supplied, customers see “Price on request”, date confirmation information, and honest empty review states. Search dates are preferences, not live availability filters. There are no child discounts, supplements, or taxes assumed by the calculation.

Form details stay in React memory while navigating back and forth and are cleared on a page refresh. Saved tour IDs and motion preference use local storage. No personal form data is stored in local storage. The map loads Google content only after the user clicks Load map.

## Motion and design

The existing fonts, palette, image assets/crops, video loop, GSAP scene timeline, menu transitions, ticket tilt values, and CSS keyframes were retained. `src/flow.css` supplies the layouts for new controls/pages and responsive arrangements using the existing visual system. `src/components/BookingTicket.tsx` extracts the original ticket markup and pointer motion for reuse. Motion remains optional through the existing pause control and reduced-motion preference.

See `FLOW-UPDATE.md` for the section moves and file-level explanation. See `PHOTOGRAPHY.md` for image licences. The original HTML Codex attribution and `LICENSE.txt` are retained.

## Checks for this update

Production TypeScript/Vite build completed. New mobile layout rules were reviewed in source. Full automated tests and rendered browser checks were not run, at the user's request and because supported browser preview was unavailable. The existing `tests/` folder is the previous release's suite; its old flow expectations are not certification of this update.
