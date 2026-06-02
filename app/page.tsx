import { HeroSection } from "@/components/sections/home/HeroSection";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { CataloguePreview } from "@/components/sections/home/CataloguePreview";
import { PortfolioShowcase } from "@/components/sections/home/PortfolioShowcase";
import { ProcessFlow } from "@/components/sections/home/ProcessFlow";
import { ClientLogos } from "@/components/sections/home/ClientLogos";
import { ContactCTA } from "@/components/sections/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <ServicesGrid />
      <CataloguePreview />
      <PortfolioShowcase />
      <ProcessFlow />
      <ClientLogos />
      <ContactCTA />
    </>
  );
}
