# Travel With Saadi — enhancement guide

This is a refinement of the existing Pakistan travel site. Preserve its brand,
Instrument Serif display typography, Inter body typography, real destination
photographs, Attabad film, factual content, routes, saved tours and enquiry flow.
The home page helps visitors discover a place; catalogs and booking prioritize
clear controls and completing the task.

The visual direction remains scenic and personal. Forest green is the primary
action color. Lake blue identifies the featured journeys section; warm orange
and a light peach surface distinguish the services section. Keep photography
dominant and use color to make sections easier to scan.

| Role                      | Token / value                                                                  |
| ------------------------- | ------------------------------------------------------------------------------ |
| Canvas                    | `--paper`, #fbfbf9                                                             |
| Surface                   | white; `--meadow`, #eaf1eb for the destination window                          |
| Primary text              | `--ink`, #111827                                                               |
| Secondary text            | `--muted`, #4b5563                                                             |
| Border                    | `--line`, #e2e8f0                                                              |
| Primary action / success  | `--green`, #105a36; white foreground                                           |
| Lake accent / information | `--lake`, #175e70; `--lake-light`, #e8f2f5                                     |
| Warm accent / warning     | `--sunset`, #9d4a26; `--sunset-light`, #faeee5                                 |
| Focus                     | `--focus`, #bc601d                                                             |
| Error                     | Existing inline error text with an exclamation and explicit recovery           |
| Display / body            | Existing Instrument Serif / Inter, self-hosted                                 |
| Type scale                | Existing responsive display scale; 13–16px reading and control text            |
| Spacing                   | 4px base; tight control groups, generous existing section spacing              |
| Shape                     | 12px service cards; pills for controls and the reference-inspired media window |
| Depth                     | Prefer flat colored surfaces; retain existing unrelated elevation              |

The destination window belongs inside Popular destinations, between its heading
and destination cards. Keep it inset to that section's content width, with a
compact composition and an even margin before the cards.

The signature is “Go [destination window] north.” It reveals from a hairline
through a circle into a pill when it enters the viewport. Phones stack the words
and open the window vertically. Manual destination buttons change the actual
Pakistan photograph and matching destination/tour links. Replay reverses and
reopens the window. There is no automatic destination carousel.

Use Web Animations for this bounded 2.1-second focal reveal; its localized size
animation deliberately reproduces the reference's text displacement. Resize
cancels the sequence and shows the final responsive state. Other entrances use
opacity and transform; home headings fade in word by word on entering the reading
area and fade out on leaving it. The effect repeats in either scroll direction,
and reduced motion keeps the words fully visible. Do not pin
the page, hijack scrolling, float review cards, or add new animation dependencies.

Controls have 44px touch targets, visible keyboard focus, text labels, and pressed
states. Touch devices show card actions without requiring hover. The existing
motion preference controls the new sequences and is now accessible in the hero.
System reduced motion displays the final layout and static imagery. Content is
visible by default; observers progressively enhance entrances and keyboard focus
immediately reveals a focused group.

## Review

2026-10-30: Additive home-page and shared-control refinement. Preserved the
incumbent type, section structure and product content. The Hunza window reuses
the local Attabad film with a native loop; other places use existing photography.
Videos pause when hidden or unselected. Verified desktop and phone renders,
destination switching, keyboard selection, replay, resize interruption, motion
preferences and destination links. Responsive route/image checks passed at
320–1920px, and four WCAG A/AA scans passed after correcting footer contrast and
booking progress semantics. The design detector's only warnings concern the
incumbent Inter font, intentionally retained to preserve the requested identity.
