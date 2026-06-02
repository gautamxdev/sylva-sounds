import type { Metadata } from "next";
import { syne, dmSans, jetbrainsMono } from "@/lib/fonts";
import "@/styles/globals.css";
import "@/styles/animations.css";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { MiniPlayer } from "@/components/audio/MiniPlayer";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";

export const metadata: Metadata = {
  title: {
    default: "Sylva Sounds — Premium Audio Production",
    template: "%s | Sylva Sounds",
  },
  description:
    "Premium end-to-end audio production house delivering music composition, sound design, mixing, mastering, and post-production for film, media, and brands.",
  openGraph: {
    title: "Sylva Sounds — Premium Audio Production",
    description: "Where technology meets artistry. Music, sound design, mixing, mastering, and post-production.",
    type: "website",
    locale: "en_US",
    siteName: "Sylva Sounds",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sylva Sounds",
    description: "Premium audio production for film, media, and brands.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        <AudioProvider>
          <Navbar />
          <ScrollIndicator />
          <main>{children}</main>
          <Footer />
          <MiniPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
