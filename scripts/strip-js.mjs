// Post-build: remove Next's client runtime from the exported HTML.
// The page has no client components (animation and typing are pure CSS), so hydration only costs
// ~175KB of JS. If you add interactivity, drop this step from the build script.
import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";

const strip = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<link\b[^>]*\bas="script"[^>]*\/?>/g, "");

const entries = await readdir(OUT, { recursive: true });

for (const file of entries.filter((f) => f.endsWith(".html"))) {
  const path = join(OUT, file);
  const html = await readFile(path, "utf8");
  await writeFile(path, strip(html));
}

// JS chunks and RSC payloads are now unreferenced. Keep robots.txt (Twitterbot needs its allow rule).
const unreferenced = (f) =>
  (f.endsWith(".txt") && f !== "robots.txt") || (f.startsWith(join("_next", "static")) && f.endsWith(".js"));
for (const file of entries.filter(unreferenced)) {
  await rm(join(OUT, file), { force: true });
}

console.log("strip-js: removed client runtime from exported HTML");
