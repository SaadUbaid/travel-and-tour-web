// Optional local visual QA. Not run in sessions without supported browser preview.
import { chromium } from "@playwright/test";
import { preview } from "vite";
import { mkdir } from "node:fs/promises";
const output = process.env.TRAVEL_PREVIEW_OUTPUT || "previews";
await mkdir(output, { recursive: true });
const server = await preview({
  preview: { host: "127.0.0.1", port: 5279, strictPort: true },
});
const browser = await chromium.launch({
  executablePath: process.env.TRAVEL_TEST_CHROMIUM,
  args: ["--no-sandbox"],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  for (const [route, name] of [
    ["/", "home"],
    ["/#/destinations", "destinations"],
    ["/#/trip/hunza", "hunza"],
    ["/#/plan?destination=skardu", "planner"],
    ["/#/about", "about"],
    ["/#/contact", "contact"],
  ]) {
    await page.goto("http://127.0.0.1:5279" + route);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1300);
    await page.screenshot({ path: `${output}/${name}-desktop.png` });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route, name] of [
    ["/", "home"],
    ["/#/plan?destination=skardu", "planner"],
    ["/#/trip/neelum", "neelum"],
  ]) {
    await page.goto("http://127.0.0.1:5279" + route);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${output}/${name}-mobile.png` });
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}
