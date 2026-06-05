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
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
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
