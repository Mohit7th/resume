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

// Simple line-icons authored in a 0..100 box, hinting at each project's domain.
const ICONS = {
    book: `<path d="M50 26 C41 20 24 20 14 24 L14 76 C24 72 41 72 50 78 C59 72 76 72 86 76 L86 24 C76 20 59 20 50 26 Z"/><path d="M50 26 L50 78"/>`,
    shield: `<path d="M50 14 L82 26 L82 50 C82 70 68 82 50 88 C32 82 18 70 18 50 L18 26 Z"/><path d="M37 50 L47 60 L65 40"/>`,
    tag: `<path d="M84 16 L84 48 L48 84 L16 52 L52 16 Z"/><circle cx="69" cy="31" r="6"/>`,
    chart: `<path d="M20 82 L84 82"/><rect x="26" y="52" width="13" height="26"/><rect x="45" y="38" width="13" height="40"/><rect x="64" y="26" width="13" height="52"/>`,
    document: `<path d="M30 14 L58 14 L72 28 L72 86 L30 86 Z"/><path d="M58 14 L58 28 L72 28"/><path d="M40 46 L62 46 M40 58 L62 58 M40 70 L54 70"/>`,
    cherry: `<circle cx="38" cy="70" r="14"/><circle cx="66" cy="64" r="14"/><path d="M38 56 C46 28 62 22 78 22"/><path d="M66 50 C66 34 72 26 78 22"/>`,
    bookmark: `<path d="M32 16 L68 16 L68 84 L50 66 L32 84 Z"/>`,
    crop: `<path d="M30 18 L30 70 L82 70"/><path d="M18 30 L70 30 L70 82"/>`,
    play: `<rect x="16" y="26" width="68" height="48" rx="12"/><path d="M44 40 L60 50 L44 60 Z" fill="#FFFFFF" stroke="none"/>`,
    search: `<circle cx="44" cy="44" r="22"/><path d="M60 60 L82 82"/>`,
    wallet: `<rect x="18" y="30" width="64" height="46" rx="8"/><path d="M60 46 L82 46 L82 60 L60 60 Z"/><circle cx="66" cy="53" r="3" fill="#FFFFFF" stroke="none"/>`,
    droplet: `<path d="M50 16 C50 16 76 46 76 62 A26 26 0 0 1 24 62 C24 46 50 16 50 16 Z"/>`,
    house: `<path d="M20 50 L50 22 L80 50"/><path d="M30 46 L30 82 L70 82 L70 46"/>`,
    bulb: `<path d="M50 16 A24 24 0 0 1 66 58 L66 66 L34 66 L34 58 A24 24 0 0 1 50 16 Z"/><path d="M40 74 L60 74 M44 82 L56 82"/>`,
    briefcase: `<rect x="18" y="34" width="64" height="44" rx="8"/><path d="M38 34 L38 26 A6 6 0 0 1 44 20 L56 20 A6 6 0 0 1 62 26 L62 34"/><path d="M18 54 L82 54"/>`,
    bolt: `<path d="M54 14 L28 54 L46 54 L42 86 L72 44 L52 44 Z"/>`,
};

const PLACEHOLDERS = [
    { file: "sanskrit-sansadhan-web.png", tag: "Web application", title: "Sanskrit Sansadhan", icon: "book" },
    { file: "samd-pre-regulatory-web.png", tag: "Web application", title: "SaMD Regulatory Assistant", icon: "shield" },
    { file: "dealsdaddy-extension.png", tag: "Browser extension", title: "DealsDaddy Coupon Extension", icon: "tag" },
    { file: "dealsdaddy-admin.png", tag: "Web application", title: "DealsDaddy Admin Console", icon: "chart" },
    { file: "rezme.png", tag: "Web application", title: "Rezme", icon: "document" },
    { file: "join-cherry-web.png", tag: "Web application", title: "Join Cherry Web", icon: "cherry" },
    { file: "join-cherry-extension.png", tag: "Browser extension", title: "Join Cherry Extension", icon: "cherry" },
    { file: "minimine.png", tag: "Web application", title: "Minimine", icon: "bookmark" },
    { file: "quick-snip.png", tag: "Browser extension", title: "Quick Snip", icon: "crop" },
    { file: "al-go.png", tag: "Browser extension", title: "Al-go", icon: "play" },
    { file: "i-search.png", tag: "Browser extension", title: "i-Search", icon: "search" },
    { file: "web-resume.png", tag: "Web application", title: "Web Resume", icon: "document" },
    { file: "financial-data-mart.png", tag: "Data & BI", title: "Financial Data Mart", icon: "wallet" },
    { file: "oil-gas-reporting.png", tag: "Data & BI", title: "Oil & Gas Reporting", icon: "droplet" },
    { file: "real-estate-service.png", tag: "Data & BI", title: "Real Estate Service", icon: "house" },
    { file: "patent-analytics.png", tag: "Data & BI", title: "Patent Analytics", icon: "bulb" },
    { file: "clikjob-platform.png", tag: "Web application", title: "ClikJob AI Platform", icon: "briefcase" },
    { file: "clikjob-extension.png", tag: "Browser extension", title: "ClikJob Autofill Extension", icon: "bolt" },
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

function buildSvg({ tag, title, icon }) {
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
  <circle cx="650" cy="245" r="155" fill="#FFFFFF" opacity="0.06"/>
  <g transform="translate(520,115) scale(2.6)" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.22">${
      ICONS[icon] ?? ""
  }</g>
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
