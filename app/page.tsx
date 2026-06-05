import { HeroSection } from "@/components/sections/home/HeroSection";
import { ClientLogos } from "@/components/sections/home/ClientLogos";
import { StatsRow } from "@/components/sections/home/StatsRow";
import { FeaturedWork } from "@/components/sections/home/FeaturedWork";
import { Showreel } from "@/components/sections/home/Showreel";
import { ProcessSteps } from "@/components/sections/home/ProcessSteps";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { MediaTypes } from "@/components/sections/home/MediaTypes";
import { CreditsSection } from "@/components/sections/home/CreditsSection";
import { ContactCTA } from "@/components/sections/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientLogos />
      <StatsRow />
      <FeaturedWork />
      <Showreel />
      <ProcessSteps />
      <ServicesOverview />
      <MediaTypes />
      <CreditsSection />
      <ContactCTA />
    </>
  );
}
