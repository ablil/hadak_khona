import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML in out/, deployed to Cloudflare Pages.
  output: "export",
  experimental: {
    agentFeedback: true,
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
