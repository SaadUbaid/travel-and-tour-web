import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/#/destinations",
  "/#/trip/hunza",
  "/#/trip/skardu",
  "/#/trip/fairy-meadows",
  "/#/about",
  "/#/experiences",
  "/#/contact",
  "/#/plan",
  "/#/credits",
  "/#/missing",
];
const responsiveOnlyRoutes = [
  "/#/destinations/hunza",
  "/#/tours",
  "/#/tours/hunza",
  "/#/booking",
  "/#/thank-you",
  "/#/terms",
  "/#/privacy",
];
// Run on a machine with browser preview support: npm run test:browser.
for (const width of [320, 360, 390, 768, 1024, 1440, 1920])
  test(`routes fit ${width}px and images decode`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const path of routes) {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      if (path === "/#/credits")
        await expect(page.locator(".credit-grid img").first()).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
        await Promise.all(
          [...document.images].map((i) => i.decode().catch(() => {})),
        );
      });
      const report = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        broken: [...document.images]
          .filter((i) => !i.naturalWidth)
          .map((i) => i.src),
      }));
      expect(report.width, path).toBeLessThanOrEqual(width + 1);
      expect(report.broken, path).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
for (const width of [320, 768, 1024, 1440])
  test(`additional pages fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of responsiveOnlyRoutes) {
      await page.goto(path);
      await expect(page.locator("main h1, main h2, main h3").first()).toBeVisible();
      const documentWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      expect(documentWidth, path).toBeLessThanOrEqual(width + 1);
    }
  });
for (const width of [320, 360, 1440])
  test(`designer profile opens accessibly and fits ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "About the designer" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Husnain" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("About the designer");
    await expect(dialog).toContainText(
      "I built it to share the places and journeys that make Pakistan special.",
    );
    await dialog.getByRole("button", { name: "Connect" }).click();
    await expect(
      dialog.locator('a[href="https://github.com/thehusnain"]'),
    ).toContainText("@thehusnain");
    await expect(
      dialog.locator(
        'a[href="https://www.instagram.com/thehusnainhere/"]',
      ),
    ).toContainText("@thehusnainhere");
    const documentWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(documentWidth).toBeLessThanOrEqual(width + 1);
    const accessibility = await new AxeBuilder({ page })
      .include(".creator-profile")
      .analyze();
    expect(accessibility.violations).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });
test("Atlas uses one morphing panel and keyboard dismissal", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const discover = page.getByRole("button", { name: "Discover", exact: true });
  await discover.hover();
  await expect(page.locator(".atlas-menu")).toHaveClass(/open/);
  await page.getByRole("button", { name: "Journeys", exact: true }).hover();
  await expect(page.locator(".atlas-menu")).toHaveCount(1);
  await expect(page.locator(".panel-current .journeys-panel")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".atlas-menu")).not.toHaveClass(/open/);
});
test("destination story responds to scroll and offers a skip", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/#/trip/hunza");
  await expect(page.locator(".story-rig")).toBeVisible();
  await page.evaluate(() => {
    const el = document.querySelector(".story-rig");
    window.scrollTo({
      top: el.offsetTop + (el.offsetHeight - innerHeight) * 0.48,
      behavior: "instant",
    });
  });
  await expect(page.locator(".story-chapter")).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await expect
    .poll(() =>
      page
        .locator(".story-chapter")
        .evaluate((el) => Number(getComputedStyle(el).opacity)),
    )
    .toBeGreaterThan(0.9);
  await page.getByRole("button", { name: "Skip to itinerary" }).click();
  await expect(page.locator("#itinerary")).toBeInViewport();
});
test("booking validates and prepares an enquiry without claiming a booking", async ({
  page,
}) => {
  await page.goto("/#/plan?destination=skardu");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Leaving from").fill("Haripur");
  await page.getByLabel("Number of travellers").fill("4");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Your name", { exact: true }).fill("Sample Traveller");
  await page.getByLabel("Email address").fill("sample@example.com");
  await page.getByRole("button", { name: "Review your plan" }).click();
  const link = page.getByRole("link", { name: "Open in WhatsApp" });
  await expect(link).toBeVisible();
  const body = new URL(await link.getAttribute("href")).searchParams.get(
    "text",
  );
  expect(body).toContain("Skardu");
  expect(body).toContain("Travellers: 4");
  expect(body).toContain("Haripur");
  await expect(page.getByText(/not a confirmed booking/)).toBeVisible();
});
test("shortlist persists and filters the collection", async ({ page }) => {
  await page.goto("/#/destinations");
  await page
    .getByRole("button", { name: "Save Hunza Valley", exact: true })
    .click();
  await page.reload();
  await page.locator(".shortlist-filter").click();
  await expect(page.locator(".trip-card")).toHaveCount(1);
  await expect(page.locator(".card-title")).toContainText("Hunza Valley");
});
for (const path of ["/", "/#/destinations", "/#/plan", "/#/trip/hunza"])
  test(`accessibility scan ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
