import type { MetadataRoute } from "next";

// Required for output: "export" to prerender robots.txt at build time.
export const dynamic = "force-static";

// Link-preview bots must still reach the page and /opengraph-image, or the Twitter card breaks.
const PREVIEW_BOTS = [
  "Twitterbot",
  "facebookexternalhit",
  "LinkedInBot",
  "Slackbot-LinkExpanding",
  "Discordbot",
  "TelegramBot",
  "WhatsApp",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: PREVIEW_BOTS, allow: "/" },
      { userAgent: "*", disallow: "/" },
    ],
  };
}
