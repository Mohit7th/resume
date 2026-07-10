// Generates branded placeholder images for every project card.
// Run with: node scripts/generate-project-placeholders.mjs
// Add/adjust entries in PLACEHOLDERS and re-run to regenerate.
// Replace any file with a real screenshot at the same path when available.
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = resolve(__dirname, "../public/assets");

// Category → gradient + accent, so cards read as one cohesive set while each
// category has its own hue.
const THEMES = {
    "Web application": { from: "#5B7CC2", to: "#17204A", accent: "#A9B5DF" },
    "Browser extension": { from: "#9C6AB5", to: "#2E2350", accent: "#E0B7F0" },
    "Data & BI": { from: "#2C7A8B", to: "#143440", accent: "#8FD3D6" },
};

const PLACEHOLDERS = [
    { file: "sanskrit-sansadhan-web.png", tag: "Web application", title: "Sanskrit Sansadhan" },
    { file: "samd-pre-regulatory-web.png", tag: "Web application", title: "SaMD Regulatory Assistant" },
    { file: "dealsdaddy-extension.png", tag: "Browser extension", title: "DealsDaddy Coupon Extension" },
    { file: "dealsdaddy-admin.png", tag: "Web application", title: "DealsDaddy Admin Console" },
    { file: "rezme.png", tag: "Web application", title: "Rezme" },
    { file: "join-cherry-web.png", tag: "Web application", title: "Join Cherry Web" },
    { file: "join-cherry-extension.png", tag: "Browser extension", title: "Join Cherry Extension" },
    { file: "minimine.png", tag: "Web application", title: "Minimine" },
    { file: "quick-snip.png", tag: "Browser extension", title: "Quick Snip" },
    { file: "al-go.png", tag: "Browser extension", title: "Al-go" },
    { file: "i-search.png", tag: "Browser extension", title: "i-Search" },
    { file: "web-resume.png", tag: "Web application", title: "Web Resume" },
    { file: "financial-data-mart.png", tag: "Data & BI", title: "Financial Data Mart" },
    { file: "oil-gas-reporting.png", tag: "Data & BI", title: "Oil & Gas Reporting" },
    { file: "real-estate-service.png", tag: "Data & BI", title: "Real Estate Service" },
    { file: "patent-analytics.png", tag: "Data & BI", title: "Patent Analytics" },
];

function escapeXml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// Naive word-wrap so long titles break into readable lines.
function wrap(text, maxChars) {
    const words = text.split(" ");
    const lines = [];
    let current = "";
    for (const word of words) {
        if ((current + " " + word).trim().length > maxChars) {
            if (current) lines.push(current.trim());
            current = word;
        } else {
            current = (current + " " + word).trim();
        }
    }
    if (current) lines.push(current.trim());
    return lines;
}

function buildSvg({ tag, title }) {
    const { from, to, accent } = THEMES[tag];
    const lines = wrap(title, 16);
    const lineHeight = 62;
    const startY = 250 - ((lines.length - 1) * lineHeight) / 2;
    const titleTspans = lines
        .map(
            (line, i) =>
                `<text x="70" y="${
                    startY + i * lineHeight
                }" font-family="Segoe UI, Arial, sans-serif" font-size="52" font-weight="700" fill="#FFFFFF">${escapeXml(
                    line
                )}</text>`
        )
        .join("\n");

    return `
<svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#bg)"/>
  <circle cx="700" cy="70" r="170" fill="#FFFFFF" opacity="0.08"/>
  <circle cx="760" cy="400" r="120" fill="${accent}" opacity="0.12"/>
  <rect x="0" y="0" width="10" height="450" fill="${accent}"/>

  <rect x="70" y="118" width="${tag.length * 14 + 44}" height="40" rx="20" fill="#FFFFFF" opacity="0.16"/>
  <text x="92" y="145" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="600" fill="#FFFFFF" letter-spacing="1">${escapeXml(
      tag.toUpperCase()
  )}</text>

  ${titleTspans}
</svg>
`;
}

for (const item of PLACEHOLDERS) {
    const svg = buildSvg(item);
    const resvg = new Resvg(svg, {
        fitTo: { mode: "width", value: 800 },
        font: { loadSystemFonts: true },
    });
    const png = resvg.render().asPng();
    writeFileSync(resolve(assetsDir, item.file), png);
    console.log(`Wrote ${item.file} (${png.length} bytes)`);
}
