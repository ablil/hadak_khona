import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { COLORS, LINE1, LINE2, ZELLIGE_SIZE, ZELLIGE_TILE, finalSceneSvg } from "./art";

export const alt = `${LINE1} ${LINE2}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Required for output: "export" to prerender the image at build time.
export const dynamic = "force-static";

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts/geist-mono");

const svgUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

const background = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}">
<defs>
  <pattern id="z" width="${ZELLIGE_SIZE}" height="${ZELLIGE_SIZE}" patternUnits="userSpaceOnUse">${ZELLIGE_TILE}</pattern>
  <radialGradient id="v" cx="50%" cy="50%" r="60%">
    <stop offset="0.35" stop-color="${COLORS.bg}" stop-opacity="1"/>
    <stop offset="1" stop-color="${COLORS.bg}" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="100%" height="100%" fill="${COLORS.bg}"/>
<rect width="100%" height="100%" fill="url(#z)" opacity="0.05"/>
<rect width="100%" height="100%" fill="url(#v)"/>
</svg>`);

export default async function Image() {
  const [regular, medium] = await Promise.all([
    readFile(join(fontDir, "GeistMono-Regular.ttf")),
    readFile(join(fontDir, "GeistMono-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", fontFamily: "Geist Mono", background: COLORS.bg }}>
        <img src={background} width={size.width} height={size.height} alt="" style={{ position: "absolute", top: 0, left: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <img src={svgUri(finalSceneSvg(240))} width={240} height={(240 * 118) / 168} alt="" />
          <div style={{ fontSize: 64, fontWeight: 500, color: COLORS.fg, letterSpacing: "-0.02em" }}>{LINE1}</div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: COLORS.muted }}>
            {LINE2}
            <div style={{ width: 13, height: 28, marginLeft: 6, background: COLORS.accent }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist Mono", data: regular, weight: 400, style: "normal" },
        { name: "Geist Mono", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
