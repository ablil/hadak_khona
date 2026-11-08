import { ZELLIGE_SIZE, ZELLIGE_TILE } from "./art";
import { Hero } from "./hero";

const tile = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${ZELLIGE_SIZE}" height="${ZELLIGE_SIZE}" viewBox="0 0 ${ZELLIGE_SIZE} ${ZELLIGE_SIZE}" fill="none">${ZELLIGE_TILE}</svg>`,
);

export default function Home() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="atay-zellige" style={{ backgroundImage: `url("data:image/svg+xml,${tile}")` }} />
      <Hero />
      <a
        href="https://x.com/hadak_khona"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-muted opacity-60 transition-opacity hover:opacity-100"
      >
        @hadak_khona
      </a>
    </main>
  );
}
