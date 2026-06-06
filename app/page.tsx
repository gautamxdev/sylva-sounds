import { HeroSection } from "@/components/sections/home/HeroSection";
import { ClientLogos } from "@/components/sections/home/ClientLogos";
import { FeaturedWork } from "@/components/sections/home/FeaturedWork";
import { OurCatalogue } from "@/components/sections/home/OurCatalogue";
import { ProcessSteps } from "@/components/sections/home/ProcessSteps";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { MediaTypes } from "@/components/sections/home/MediaTypes";
import { ContactCTA } from "@/components/sections/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientLogos />
      <FeaturedWork />
      <OurCatalogue />
      <ProcessSteps />
      <div id="services">
        <ServicesOverview />
      </div>
      <MediaTypes />
      <ContactCTA />
    </>
  );
}
