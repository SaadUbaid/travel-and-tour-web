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

The existing brand, fonts, image assets, hero film, destination stories, and booking flow are retained. `src/enhancements.css` adds lake-blue and warm-orange section colors, clearer controls, mobile touch targets, and scroll-revealed headings. The home page's destination window opens from a line into a pill, with manual Hunza, Skardu, Swat, and Kashmir previews and matching destination/tour links. Hunza reuses the local Attabad film. The window stacks and opens vertically on phones, and its replay collapses then reopens it. The hero's pause control and system reduced-motion preference apply throughout. See `DESIGN.md` for the refinement guidelines.

See `FLOW-UPDATE.md` for the section moves and file-level explanation. See `PHOTOGRAPHY.md` for image licences. The original HTML Codex attribution and `LICENSE.txt` are retained.

## Checks for this update

The production TypeScript/Vite build, asset validation, and seven DOM integration checks pass. Eleven browser checks verified route layouts and image decoding at widths from 320px to 1920px; four WCAG A/AA accessibility scans pass. Additional browser interaction checks cover destination selection, keyboard use, replay, resize interruption, video pausing, reduced motion, and heading spacing. Desktop and phone layouts were also visually reviewed. Some unrelated browser tests still contain older navigation/booking expectations; the entire legacy browser suite was not run.
