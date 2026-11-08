import type { CSSProperties } from "react";
import { KAS, LAPTOP, LINE1, LINE2, POT, SPARKLES, VIEWBOX, sparklePath } from "./art";
import "./hero.css";

// Typing is pure CSS (no client JS): every character is revealed at its own delay.
// Keep TYPE_START_MS just after the scene timeline in hero.css (--t: 1.95s).
const TYPE_START_MS = 2050;
const CHAR_MS = 28;
const LINE_PAUSE_MS = 200;
const LINE2_START_MS = TYPE_START_MS + LINE1.length * CHAR_MS + LINE_PAUSE_MS;

export function Hero() {
  return (
    <div className="relative flex flex-col gap-4 md:gap-6">
      <Scene />
      <h1 className="text-[34px] font-medium tracking-[-0.02em] md:text-[56px]">
        <span className="sr-only">{LINE1}</span>
        <Typed text={LINE1} start={TYPE_START_MS} next={LINE2_START_MS} />
      </h1>
      <p className="max-w-[310px] text-[15px] leading-[1.5] text-muted md:max-w-none md:text-[22px]">
        <span className="sr-only">{LINE2}</span>
        <Typed text={LINE2} start={LINE2_START_MS} last />
      </p>
    </div>
  );
}

// `next` = when the following line starts; the cursor sits on this line's last char until then.
// `last` = the final line keeps a blinking cursor after typing ends.
function Typed({ text, start, next, last }: { text: string; start: number; next?: number; last?: boolean }) {
  const chars = [...text];
  return (
    <span aria-hidden>
      {chars.map((ch, i) => {
        const at = start + i * CHAR_MS;
        const isEnd = i === chars.length - 1;
        const hold = isEnd ? (next ?? at + CHAR_MS) - at : CHAR_MS;
        const cursor = isEnd && last ? "atay-char-cursor-final" : "";
        return (
          <span
            key={i}
            className={`atay-char ${cursor}`}
            style={{ "--at": `${at}ms`, "--hold": `${hold}ms` } as CSSProperties}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}

function Scene() {
  const { x, y, w, h } = VIEWBOX;
  return (
    <svg
      className="atay-scene h-auto w-[168px] md:w-[210px]"
      viewBox={`${x} ${y} ${w} ${h}`}
      fill="none"
      role="img"
      aria-label="A Moroccan teapot pours tea into a glass, which turns into a laptop"
    >
      <defs>
        <clipPath id="kas-inside">
          <path d={KAS.inside} />
        </clipPath>
      </defs>

      <g className="atay-glass">
        <path className="atay-stream" d={KAS.stream} pathLength={100} />
        <g clipPath="url(#kas-inside)">
          <rect className="atay-tea" x="140" y="84" width="40" height="45" />
        </g>
        <g className="atay-line">
          <path d={KAS.outline} />
          <path d={KAS.band} strokeWidth={1.5} strokeDasharray="1 4" />
          <path d={KAS.base} strokeWidth={1.5} />
        </g>
        <g className="atay-garnish">
          <path d={KAS.stem} className="stroke-accent" strokeWidth={1.5} strokeLinecap="round" />
          {KAS.leaves.map((d) => (
            <path key={d} d={d} className="fill-accent" />
          ))}
          <g className="atay-steam">
            {KAS.steam.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </g>
      </g>

      <g className="atay-sparkles">
        {SPARKLES.map((sp) => (
          <path key={sp.x} d={sparklePath(sp)} fill={sp.color} />
        ))}
      </g>

      <g className="atay-laptop">
        <g className="atay-line">
          <rect {...LAPTOP.screen} />
          <path d={LAPTOP.base} />
          <path d={LAPTOP.prompt} strokeWidth={1.5} />
        </g>
        <rect className="atay-blink fill-accent" {...LAPTOP.cursor} />
      </g>

      <g className="atay-pot atay-line">
        {POT.paths.map((d) => (
          <path key={d} d={d} />
        ))}
        <circle {...POT.finial} />
        <path d={POT.band} strokeOpacity={0.5} strokeWidth={1.5} />
      </g>
    </svg>
  );
}
