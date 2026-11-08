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
    </main>
  );
}
