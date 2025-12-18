import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexaForge Pro • AI Builder",
  description:
    "NexaForge Pro is the agentic AI website builder that transforms business briefs into production-ready experiences.",
  metadataBase: new URL("https://agentic-cf961a28.vercel.app"),
  openGraph: {
    title: "NexaForge Pro",
    description:
      "Accelerate from prompt to production with an agentic AI website builder. Design, copy, visuals, and integrations automated.",
    url: "https://agentic-cf961a28.vercel.app",
    siteName: "NexaForge Pro",
    images: [
      {
        url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
        width: 1200,
        height: 630,
        alt: "NexaForge Pro dashboard preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexaForge Pro",
    description:
      "Multi-agent AI system that delivers complete websites with one prompt.",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${heading.variable} ${sans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
