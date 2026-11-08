import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { COLORS, LINE2 } from "./art";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Absolute base for og:image / twitter:image URLs; set SITE_URL at build time.
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: "hadak_khona",
  description: LINE2,
  applicationName: "hadak_khona",
  authors: [{ name: "hadak_khona", url: "https://x.com/hadak_khona" }],
  creator: "hadak_khona",
  alternates: { canonical: "/" },
  // Not for search engines; robots.ts still lets link-preview bots through.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: { title: "hadak_khona", description: LINE2, type: "website", url: "/", siteName: "hadak_khona", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "hadak_khona", description: LINE2, creator: "@hadak_khona", site: "@hadak_khona" },
};

export const viewport: Viewport = {
  themeColor: COLORS.bg,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full font-mono">{children}</body>
    </html>
  );
}
