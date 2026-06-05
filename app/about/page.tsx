import { serviceCategories, creditsSummary } from "@/lib/data";
import { PageHeader } from "@/components/layout/PageHeader";
import { NeonButton } from "@/components/ui/NeonButton";
import { CreditsSection } from "@/components/sections/home/CreditsSection";

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        label="About"
        title="Sylva Sounds"
        subtitle="A music and audio post-production studio crafting sound for Indian cinema, OTT, advertising, and digital media."
      />

      <section className="bg-bg-primary px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="anim-in text-xl leading-relaxed text-text-secondary md:text-2xl">
            From original scores and trailer music to full sound post and Dolby Atmos delivery, we partner
            with filmmakers, brands, and production houses to shape audio that serves the story.
          </p>
          <p className="anim-in anim-delay-2 text-xl leading-relaxed text-text-secondary md:text-2xl">
            {creditsSummary.headline} — including work for Tata, OnePlus, Zee5, BMW, and more.
          </p>
        </div>
      </section>

      <section className="bg-surface-01 px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="anim-in heading-display mb-14 text-4xl font-semibold md:text-5xl lg:text-6xl">
            What We Offer
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {serviceCategories.map((c, i) => (
              <div
                key={c.id}
                className={`anim-in-scale anim-delay-${i + 1} glass p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <h3 className="font-display text-2xl font-semibold text-olive-dark">{c.title}</h3>
                <p className="mt-3 text-base text-text-secondary">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CreditsSection />

      <section className="bg-bg-primary px-6 py-20 text-center lg:px-8">
        <NeonButton href="/contact" variant="primary">Work With Us →</NeonButton>
      </section>
    </div>
  );
}
