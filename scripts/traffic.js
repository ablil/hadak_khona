// Synthetic traffic for checking Cloudflare observability. Load goes up and down at random.
//
//   k6 run scripts/traffic.js
//
// Env:
//   BASE_URL  override target, no trailing slash (default: the deployed Worker)
//   DURATION  total seconds, default 300 (5 min)
//   MAX_RPS   peak requests/second, default 20
//   SEED      optional, makes the random load shape repeatable

import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "https://hadak-khona.ablil.workers.dev";

const DURATION = Number(__ENV.DURATION || 300);
const MAX_RPS = Number(__ENV.MAX_RPS || 20);

// mulberry32: tiny seeded PRNG so every VU (and reruns with SEED) builds the same stages.
function rng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const random = rng(Number(__ENV.SEED || Math.floor(Date.now() / 60000)));

// Random stages of 15–45s, each ramping to a random rate; ends by ramping down to 0.
function randomStages() {
  const stages = [];
  let left = DURATION - 10;
  while (left > 0) {
    const d = Math.min(left, 15 + Math.floor(random() * 31));
    stages.push({ duration: `${d}s`, target: Math.max(1, Math.round(random() * MAX_RPS)) });
    left -= d;
  }
  stages.push({ duration: "10s", target: 0 });
  return stages;
}

export const options = {
  scenarios: {
    wave: {
      executor: "ramping-arrival-rate",
      startRate: 1,
      timeUnit: "1s",
      preAllocatedVUs: Math.max(5, MAX_RPS),
      maxVUs: MAX_RPS * 3,
      stages: randomStages(),
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.05"],
  },
};

// Weighted mix of real pages, assets, and the occasional 404.
const ROUTES = [
  { path: "/", weight: 70, status: 200 },
  { path: "/opengraph-image", weight: 10, status: 200 },
  { path: "/icon.svg", weight: 8, status: 200 },
  { path: "/robots.txt", weight: 7, status: 200 },
  { path: "/does-not-exist", weight: 5, status: 404 },
];
const TOTAL_WEIGHT = ROUTES.reduce((sum, r) => sum + r.weight, 0);

function pickRoute() {
  let n = Math.random() * TOTAL_WEIGHT;
  for (const r of ROUTES) {
    if ((n -= r.weight) < 0) return r;
  }
  return ROUTES[0];
}

export default function () {
  const route = pickRoute();
  const res = http.get(`${BASE_URL}${route.path}`, {
    tags: { name: route.path },
    // 404s are expected for the bogus route; don't count them as failures.
    responseCallback: http.expectedStatuses(route.status),
  });
  check(res, { [`${route.path} -> ${route.status}`]: (r) => r.status === route.status });
  sleep(Math.random() * 0.5);
}
