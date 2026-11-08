// Shared drawing data for the hero scene (app/hero.tsx) and the OG image (app/opengraph-image.tsx).
// Coordinates live in the VIEWBOX space.

export const LINE1 = "Salam, World!";
export const LINE2 = "I drink atay, I write code, then magic happens.";

export const COLORS = {
  bg: "#0A0A0B",
  fg: "#EDEDED",
  muted: "#A3A3A3",
  accent: "#22C55E",
  tea: "#D9A441",
};

export const VIEWBOX = { x: 38, y: 14, w: 168, h: 118 };

export const POT = {
  paths: [
    "M58 130 H82 L79 124 H61 Z",
    "M61 124 C44 122 42 100 56 92 C60 89 64 88 64 84 H76 C76 88 80 89 84 92 C98 100 96 122 79 124 Z",
    "M63 84 Q70 68 77 84",
    "M70 76 V73",
    "M94 102 C103 101 106 90 115 79 L119 81 C111 93 108 109 94 114",
    "M57 95 C41 92 39 115 50 118",
  ],
  finial: { cx: 70, cy: 71, r: 2 },
  band: "M50 108 H90",
};

export const KAS = {
  outline: "M142 78 L147 130 H173 L178 78",
  band: "M143.6 92 H176.4",
  base: "M147.5 125 H172.5",
  inside: "M143.5 78 L148.4 128.5 H171.6 L176.5 78 Z",
  stream: "M125 58 C145 58 157 66 158 80 L158 128",
  stem: "M170 82 L176 68",
  leaves: ["M176 68 q6 -6 11 -4 q-4 6 -11 4z", "M174 73 q-7 -5 -10 -1 q5 4 10 1z"],
  steam: ["M152 70 q-3 -5 0 -10 q3 -5 0 -10", "M161 66 q-3 -5 0 -10 q3 -5 0 -10"],
};

export const LAPTOP = {
  screen: { x: 132, y: 84, width: 56, height: 36, rx: 3 },
  base: "M126 122 H194 L198 128 H122 Z",
  prompt: "M139 97 L143 100.5 L139 104",
  cursor: { x: 146, y: 96, width: 5, height: 9 },
};

export const SPARKLES = [
  { x: 128, y: 72, r: 5, color: COLORS.fg },
  { x: 194, y: 78, r: 4, color: COLORS.accent },
  { x: 190, y: 112, r: 3.5, color: COLORS.fg },
  { x: 132, y: 110, r: 3, color: COLORS.accent },
];

export const sparklePath = ({ x, y, r }: { x: number; y: number; r: number }) =>
  `M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r} Z`;

// 8-point star (khatam) lattice, tiled as the page background.
export const ZELLIGE_TILE = `<g stroke="${COLORS.fg}" stroke-width="1.5" stroke-linejoin="round"><rect x="24" y="24" width="48" height="48"/><path d="M48 14 L82 48 L48 82 L14 48 Z"/><path d="M48 14 V0 M82 48 H96 M48 82 V96 M14 48 H0"/><path d="M24 24 L0 0 M72 24 L96 0 M72 72 L96 96 M24 72 L0 96"/></g>`;
export const ZELLIGE_SIZE = 96;

// End state of the animation (teapot + laptop) as a standalone SVG string.
export function finalSceneSvg(width: number) {
  const { x, y, w, h } = VIEWBOX;
  const stroke = `fill="none" stroke="${COLORS.fg}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const s = LAPTOP.screen;
  const c = LAPTOP.cursor;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${(width * h) / w}" viewBox="${x} ${y} ${w} ${h}">
<g ${stroke}>
${POT.paths.map((d) => `<path d="${d}"/>`).join("")}
<circle cx="${POT.finial.cx}" cy="${POT.finial.cy}" r="${POT.finial.r}"/>
<path d="${POT.band}" stroke-opacity="0.5" stroke-width="1.5"/>
<rect x="${s.x}" y="${s.y}" width="${s.width}" height="${s.height}" rx="${s.rx}"/>
<path d="${LAPTOP.base}"/>
<path d="${LAPTOP.prompt}" stroke-width="1.5"/>
</g>
<rect x="${c.x}" y="${c.y}" width="${c.width}" height="${c.height}" fill="${COLORS.accent}"/>
</svg>`;
}
