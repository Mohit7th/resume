// Regenerates the social share image at public/assets/og-image.png.
// Run with: node scripts/generate-og-image.mjs
// Edit the SVG below and re-run to update the card.
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "../public/assets/og-image.png");

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2D336B"/>
      <stop offset="1" stop-color="#17204A"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="120" r="260" fill="#7886C7" opacity="0.12"/>
  <circle cx="1120" cy="560" r="180" fill="#A9B5DF" opacity="0.10"/>
  <rect x="0" y="0" width="16" height="630" fill="#7886C7"/>

  <circle cx="150" cy="150" r="52" fill="#7886C7"/>
  <text x="150" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="42" font-weight="700"
        fill="#FFFFFF" text-anchor="middle" dominant-baseline="central">MU</text>

  <text x="92" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="96" font-weight="700"
        fill="#FFFFFF">Mohit Uniyal</text>
  <text x="96" y="400" font-family="Segoe UI, Arial, sans-serif" font-size="46" font-weight="600"
        fill="#A9B5DF">Full-Stack Developer</text>
  <text x="96" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="400"
        fill="#EEF1FA">Web applications  ·  Browser extensions  ·  Data &amp; BI</text>

  <text x="96" y="565" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="600"
        fill="#7886C7">mohit7th.github.io/resume</text>
</svg>
`;

const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    font: { loadSystemFonts: true },
});
const pngData = resvg.render().asPng();
writeFileSync(outputPath, pngData);
console.log(`Wrote ${outputPath} (${pngData.length} bytes)`);
