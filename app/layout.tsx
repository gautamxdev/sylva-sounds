import type { Metadata } from "next";
import { displayFont, bodyFont } from "@/lib/fonts";
import "@/styles/globals.css";
import "@/styles/animations.css";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { MiniPlayer } from "@/components/audio/MiniPlayer";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { WaveformWorld } from "@/components/three/WaveformWorld";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Music, Sound & Audio Production`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL("https://sylvasounds.com"),
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <link rel="preconnect" href="https://open.spotify.com" />
        <link rel="preconnect" href="https://i.scdn.co" />
        <link rel="preconnect" href="https://p.scdn.co" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body>
        <AudioProvider>
          <SmoothScroll>
            <WaveformWorld />
            <Navbar />
            <ScrollIndicator />
            <main className="relative z-10">{children}</main>
            <Footer />
            <MiniPlayer />
          </SmoothScroll>
        </AudioProvider>
      </body>
    </html>
  );
}
