import { HeroCanvas } from "@/components/three/HeroCanvas";
import { NeonButton } from "@/components/ui/NeonButton";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-32 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <HeroCanvas density="light" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="heading-display whitespace-pre-line text-4xl font-bold text-white-pure md:text-6xl">
          {"Let's Build Something\nUnforgettable"}
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-grey-text">
          Ready to elevate your project with world-class audio? Let&apos;s start the conversation.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NeonButton href="/contact" variant="primary">
            Start a Project
          </NeonButton>
          <NeonButton href="/catalogue" variant="ghost">
            Listen First
          </NeonButton>
        </div>
      </div>
    </section>
  );
}
