import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import assert from "node:assert/strict";
import { TravelProvider, useTravel } from "../src/state";
import { Header, Footer } from "../src/components/Layout";
import Destinations from "../src/pages/Destinations";
import Tours from "../src/pages/Tours";
import Plan from "../src/pages/Plan";
import Trip from "../src/pages/Trip";
import { trips } from "../src/data";
import Home from "../src/pages/Home";
const node = document.createElement("div");
document.body.append(node);
const root = createRoot(node);
let passed = 0;
const render = async (component: React.ReactNode, path: string) => {
  await act(async () =>
    root.render(
      <MemoryRouter key={path} initialEntries={[path]}>
        <TravelProvider>{component}</TravelProvider>
      </MemoryRouter>,
    ),
  );
};
const click = async (el: Element | null) => {
  assert(el, "Missing clickable target");
  await act(async () => (el as HTMLElement).click());
};
const button = (text: string) =>
  [...node.querySelectorAll("button")].find((e) =>
    e.textContent?.includes(text),
  ) || null;
const input = async (el: HTMLInputElement | null, value: string) => {
  assert(el, "Missing input");
  await act(async () => {
    Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    )!.set!.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });
};
const submit = async () => {
  const form = node.querySelector("form")!;
  assert(form.checkValidity(), "Form must satisfy native validation");
  await act(async () =>
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    ),
  );
};
const pass = (label: string) => {
  passed++;
  console.log("PASS:", label);
};
await render(<Home />, "/");
assert.equal(node.querySelectorAll("h1").length, 1);
assert.equal(node.querySelectorAll(".trip-card").length, 7);
assert(node.querySelector("video")?.getAttribute("src")?.includes("attabad"));
pass("Homepage includes the real local film and seven featured journeys (4 popular + 3 featured)");
await render(<Header />, "/nav-test");
const openPanel = async (el: Element | null) => {
  assert(el, "Missing panel trigger");
  await act(async () =>
    (el as HTMLElement).dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, cancelable: true }),
    ),
  );
};
await openPanel(button("Destinations"));
assert.equal(
  node
    .querySelector('[aria-controls="atlas-menu"]')
    ?.getAttribute("aria-expanded"),
  "true",
);
await openPanel(button("Tours"));
assert.equal(node.querySelectorAll(".atlas-menu").length, 1);
assert(node.querySelector(".journeys-panel"));
await act(async () =>
  document.dispatchEvent(
    new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
  ),
);
assert(!node.querySelector(".atlas-menu.open"));
await click(node.querySelector('[aria-label="Open navigation"]'));
assert(node.querySelector("#mobile-menu"));
await click(node.querySelector('[aria-label="Close navigation"]'));
assert(!node.querySelector("#mobile-menu"));
pass(
  "Shared navigation switches panels; Escape and mobile toggle close correctly",
);
await render(<Destinations />, "/destinations");
assert.equal(node.querySelectorAll(".trip-card").length, 12);
await render(<Tours />, "/tours?type=Day+trips");
assert.equal(node.querySelectorAll(".trip-card").length, 4);
await click(node.querySelector('[aria-label="Save Shogran"]'));
assert(node.querySelector('[aria-label="Unsave Shogran"]'));
await click(node.querySelector(".shortlist-filter"));
assert.equal(node.querySelectorAll(".trip-card").length, 1);
await click(node.querySelector('[aria-label="Unsave Shogran"]'));
assert(node.querySelector(".empty-state"));
pass(
  "Style filters and persisted shortlist produce correct results and empty state",
);
await render(<Destinations />, "/destinations?region=Gilgit-Baltistan");
assert.equal(node.querySelectorAll(".trip-card").length, 4);
pass("Region links initialize the collection filter");
await render(<Plan />, "/plan?destination=skardu");
assert.equal(
  (node.querySelector(".field-label select") as HTMLSelectElement).value,
  "skardu",
);
await click(button("I have a date"));
assert(!node.querySelector("form")!.checkValidity());
await click(button("I’m flexible"));
await submit();
assert(node.querySelector("h2")?.textContent?.includes("Your people"));
assert(!node.querySelector("form")!.checkValidity());
await input(
  node.querySelector('input[autocomplete="address-level2"]'),
  "Haripur",
);
await input(node.querySelector('input[type="number"]'), "4");
await click(button("Continue"));
assert(node.querySelector("h2")?.textContent?.includes("Nice to"));
assert(!node.querySelector("form")!.checkValidity());
await input(node.querySelector('input[autocomplete="name"]'), "Test Traveller");
await input(node.querySelector('input[type="email"]'), "traveller@example.com");
await submit();
assert(node.querySelector("h2")?.textContent?.includes("beautiful plan"));
const wa = node.querySelector<HTMLAnchorElement>('a[href^="https://wa.me/"]');
assert(wa);
const text = new URL(wa.href).searchParams.get("text")!;
for (const expected of [
  "Skardu",
  "Haripur",
  "Travellers: 4",
  "Test Traveller",
  "traveller@example.com",
  "Flexible",
])
  assert(text.includes(expected), expected);
assert(node.textContent?.includes("not a confirmed booking"));
await click(button("Edit your details"));
assert.equal(
  node.querySelector<HTMLInputElement>('input[type="email"]')?.value,
  "traveller@example.com",
);
pass(
  "Four-step planner validates fields, carries destination forward, preserves edits and creates a complete enquiry",
);
// Render every itinerary using the reduced-motion path; visual browser QA is a separate check.
const { Routes, Route } = await import("react-router-dom");
for (const trip of trips) {
  await render(
    <Routes>
      <Route path="/trip/:id" element={<Trip />} />
    </Routes>,
    `/trip/${trip.id}`,
  );
  assert.equal(node.querySelector("h1")?.textContent, trip.name);
  assert.equal(
    node.querySelectorAll(".itinerary-list details").length,
    trip.days,
  );
  assert(node.querySelector(".static-story"));
  assert(node.querySelector("#itinerary"));
}
pass(
  "All 13 destinations render their own title, itinerary and reduced-motion alternative",
);
let toggleMotionFn: (() => void) | undefined;
function MotionTestController() {
  const { toggleMotion } = useTravel();
  toggleMotionFn = toggleMotion;
  return null;
}
await render(
  <>
    <Routes>
      <Route path="/trip/:id" element={<Trip />} />
    </Routes>
    <MotionTestController />
    <Footer />
  </>,
  "/trip/skardu",
);
await act(async () => toggleMotionFn?.());
assert(node.querySelector(".story-rig"));
const { ScrollTrigger } = await import("gsap/ScrollTrigger");
assert(
  ScrollTrigger.getAll().length > 0,
  "Scroll story must initialize a GSAP timeline",
);
await act(async () => toggleMotionFn?.());
assert(node.querySelector(".static-story"));
assert.equal(
  ScrollTrigger.getAll().length,
  0,
  "Motion pause must clean up scroll triggers",
);
pass(
  "Cinematic GSAP story initializes, and motion pause cleans up the animation",
);
await act(async () => root.unmount());
console.log(
  `\n${passed} DOM integration checks passed. These checks do not verify rendered layout or animation.`,
);
