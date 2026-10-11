# Flow update — 9 October 2026

## What changed

- Menu: Home, Destinations, Tours, About, Contact, Book now. The morphing dropdown remains; hovering previews it, clicking a main name opens the named page, and Arrow Down accesses dropdown links.
- Home: original video hero with tour search; four popular places; three featured tours; three reasons to choose Saadi; honest review state; final booking CTA.
- Destination pages: one template and only tours that visit the selected place. Hunza includes its standalone and Hunza/Skardu tour; Skardu includes its standalone, Basho, and combined tour. Basho is a place distinct from the Skardu & Basho tour.
- Tours: existing catalog split from Destinations. Days filter has counts, unavailable choices are disabled, filter chips are removable, and clear filters preserves the travel-date/group preferences. Published price ranges become usable when the operator supplies real rates.
- Tour detail: original story and itinerary retained. Added explicit price/inclusions/date/review status and a persistent booking action.
- Booking: chosen tour → preferred date/group → name/email/phone/optional note → review and manual WhatsApp/email handoff → reference and next steps. Back navigation keeps the draft during the current app session. Inline validation blocks incomplete steps. Large navigation is replaced by the same logo and a Back to tour link.
- Contact: retained original photo and contact details, added a short message form, WhatsApp link, common questions, and an opt-in Google area map.
- Terms/privacy and the small enquiry confirmation page use existing components.

## Existing sections moved intact

| Old Home section                       | New location                  |
| -------------------------------------- | ----------------------------- |
| Introductory three-column strip        | Travel stories `/experiences` |
| Neelum photo and editorial story       | Travel stories `/experiences` |
| Three travel-style cards               | Travel stories `/experiences` |
| Hunza & Skardu photo banner            | Travel stories `/experiences` |
| Personal planning/conversation section | About `/about`                |

Original photographs and source credit files were neither deleted nor renamed. The existing Experiences sections remain on that page. These whole-block moves are implemented in `src/components/JourneyStories.tsx`.

## Files and visual preservation

- `src/components/Hero.tsx`: headline/labels and search controls; video playback/fade/visibility logic unchanged.
- `src/components/Layout.tsx`: labels, links, and compact booking header/footer; dropdown timings retained.
- `src/components/ScrollStory.tsx`: destination/tour labels and action targets. The GSAP timeline is unchanged. An unfinished earlier edit had changed the highlight buttons to instant scrolling; their original smooth scrolling was restored, with instant scrolling still used for reduced motion.
- `src/components/BookingTicket.tsx`: original ticket extracted from Plan; same hover rotation values and markup classes. Its background planes and CSS animation remain unchanged.
- `src/components/UI.tsx`: existing cards extended to identify places versus tours and show real pricing/review status; the Reveal animation is unchanged.
- `src/flow.css`: new layout rules and mobile arrangements, reusing the existing palette, typography, buttons, cards, fields, and animation timing. No replacement scene keyframes or new animation library.
- `src/styles.css` and `src/styles/fonts.css`: not changed during this flow implementation. Their nonitalic changes already existed at the audit baseline.
- Photo, video, logo, and font assets: not edited during this flow implementation. The logo mark/favicon and nonitalic text from the earlier unfinished update are retained.

The prior requests for a different palette/full-bleed hero and changes to the ticket's 3D compositing were not applied during this flow-only update, in line with the later instruction to freeze the design and motion. The earlier ticket hover layering issue has not been browser-verified or repaired in this flow pass.

## What requires operator information

No verified prices, available departure dates, specific inclusions, customer reviews, refund policy, or payment provider were supplied. These were not invented. The app supports approved data in `src/data.ts` and honestly asks for a quote until it exists. Confirmation means the enquiry is prepared, not that it was sent, paid, or booked.

## Quick manual review

1. Home: choose Hunza, a future date, and a group size; Search tours should show only matching tours and carry the preferences into a tour enquiry.
2. Destinations: choose Skardu; only tours that include Skardu should appear.
3. Tours: combine days/type filters, save a tour, clear filters, and try an empty result.
4. Booking: try invalid fields, continue with valid details, go back, and confirm values remain. Opening WhatsApp/email must include the tour/date/travelers/contact details and enquiry reference. You decide whether to send it.
5. Confirmation: check that it never claims a paid or confirmed reservation. Edit enquiry should retain your draft while the app remains open.
6. Mobile: check the menu, wrapped filters, hero search, form inputs, bottom price summary, and booking action at 320/360/390px; scroll to ensure controls do not cover content.
7. Motion: check the hero loop, navigation hover, each cinematic destination, ticket hover/float, and reduced-motion switch.

The production build passed. Mobile rules were reviewed from source; browser visual checks and the full automated test suite were not executed.
