"use client";

import { useEffect, useState } from "react";
import { KAS, LAPTOP, LINE1, LINE2, POT, SPARKLES, VIEWBOX, sparklePath } from "./art";
import "./hero.css";

const ANIM_MS = 1950;
const CHAR_MS = 28;
const LINE_PAUSE_MS = 200;

export function Hero() {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const total = LINE1.length + LINE2.length;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setTyped(total), 0);
      return () => clearTimeout(t);
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let at = ANIM_MS + 100;
    for (let i = 1; i <= total; i++) {
      if (i === LINE1.length + 1) at += LINE_PAUSE_MS;
      timers.push(setTimeout(() => setTyped(i), at));
      at += CHAR_MS;
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  const t1 = Math.min(typed, LINE1.length);
  const t2 = Math.max(0, typed - LINE1.length);
  const onLine2 = typed > LINE1.length;

  return (
    <div className="relative flex flex-col gap-4 md:gap-6">
      <Scene />
      <h1 className="text-[34px] font-medium tracking-[-0.02em] md:text-[56px]">
        <span className="sr-only">{LINE1}</span>
        <span aria-hidden>
          {LINE1.slice(0, t1)}
          {typed > 0 && !onLine2 && <Cursor />}
          <span className="invisible">{LINE1.slice(t1)}</span>
        </span>
      </h1>
      <p className="max-w-[310px] text-[15px] leading-[1.5] text-muted md:max-w-none md:text-[22px]">
        <span className="sr-only">{LINE2}</span>
        <span aria-hidden>
          {LINE2.slice(0, t2)}
          {onLine2 && <Cursor />}
          <span className="invisible">{LINE2.slice(t2)}</span>
        </span>
      </p>
    </div>
  );
}

function Cursor() {
  return <span className="atay-blink ml-[0.15em] inline-block h-[1em] w-[0.5em] translate-y-[0.12em] bg-accent" />;
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
