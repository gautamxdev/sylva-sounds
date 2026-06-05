import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";

export const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
