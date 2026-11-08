import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML in out/, deployed to Cloudflare Pages.
  output: "export",
  experimental: {
    agentFeedback: true,
    // Most visitors are first-timers from Twitter: inline CSS to skip the render-blocking request.
    inlineCss: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
