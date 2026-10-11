import { readFile, access, stat } from "node:fs/promises";
import assert from "node:assert/strict";
const credits = JSON.parse(
  await readFile("public/photos/credits.json", "utf8"),
);
const trips = [
  "hunza",
  "skardu",
  "fairy-meadows",
  "neelum",
  "swat",
  "naran",
  "shogran",
  "malam-jabba",
  "sharan",
  "mushkpuri",
  "kashmir",
  "basho",
  "northern-loop",
];
let checked = 0;
for (const id of trips) {
  const first = id === "northern-loop" ? "passu" : id;
  const second = id === "northern-loop" ? "skardu" : id + "-detail";
  for (const key of [first, second]) {
    const credit = credits.find((c) => c.id === key);
    assert(credit, `Missing source credit: ${key}`);
    assert(
      credit.source.startsWith("https://commons.wikimedia.org/"),
      "Use a traceable source",
    );
    assert(
      credit.artist && credit.license,
      "Photographer and licence required",
    );
    for (const suffix of ["", "-small"]) {
      const path = `public/photos/${key}${suffix}.webp`;
      await access(path);
      assert((await stat(path)).size > 0, `Empty image file: ${path}`);
      checked++;
    }
  }
}
for (const path of [
  "public/video/attabad.mp4",
  "public/video/attabad-mobile.mp4",
  "public/video/attabad-poster.webp",
]) {
  assert((await stat(path)).size > 0, `Empty media file: ${path}`);
}
const source = await readFile("src/data.ts", "utf8");
assert(!source.includes("artwork/"), "No generated destination imagery");
console.log(
  `PASS: ${trips.length} destinations, ${credits.length} credited photographs, ${checked} image references and the local hero video.`,
);
