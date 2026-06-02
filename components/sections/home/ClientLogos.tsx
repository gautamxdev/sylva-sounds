import { clientLogos } from "@/lib/data";

export function ClientLogos() {
  const logos = [...clientLogos, ...clientLogos];

  return (
    <section className="overflow-hidden border-y border-grey-mid/20 bg-bg-secondary py-12">
      <p className="label-mono mb-8 text-center">TRUSTED BY</p>
      <div className="relative">
        <div className="animate-marquee flex whitespace-nowrap">
          {logos.map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="mx-12 font-display text-2xl font-semibold text-white-pure opacity-50 transition-opacity hover:opacity-100"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
