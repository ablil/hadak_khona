import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { LINE2 } from "./art";
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
  openGraph: { title: "hadak_khona", description: LINE2, type: "website" },
  twitter: { card: "summary_large_image", title: "hadak_khona", description: LINE2, creator: "@hadak_khona" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full font-mono">{children}</body>
    </html>
  );
}
