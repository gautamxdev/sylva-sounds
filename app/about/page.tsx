import type { Metadata } from "next";
import { AboutContent } from "@/components/sections/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "A music and audio post-production studio crafting sound for Indian cinema, OTT, advertising, and digital media.",
};

export default function AboutPage() {
  return <AboutContent />;
}
