import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { tracks, formatDuration } from "@/lib/data";
import { NeonButton } from "@/components/ui/NeonButton";
import { TrackPlayer } from "@/components/catalogue/TrackPlayer";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return tracks.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Props) {
  const track = tracks.find((t) => t.slug === params.slug);
  if (!track) return { title: "Track Not Found" };
  return { title: track.title, description: track.description };
}

export default function TrackPage({ params }: Props) {
  const track = tracks.find((t) => t.slug === params.slug);
  if (!track) notFound();

  const tiers = [
    { name: "Free Preview", price: "Free", desc: "30-second preview for evaluation" },
    { name: "Standard License", price: "From $299", desc: "Full track license for single project use" },
    { name: "Exclusive Rights", price: "Custom", desc: "Full ownership and exclusivity" },
  ];

  return (
    <div className="pt-24">
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-card">
            {track.artwork && (
              <Image src={track.artwork} alt={track.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            )}
          </div>
          <div>
            <Link href="/catalogue" className="label-mono mb-4 inline-block hover:text-white-soft">
              ← Back to Catalogue
            </Link>
            <h1 className="heading-display text-4xl font-bold text-white-pure md:text-5xl">{track.title}</h1>
            <p className="mt-2 font-mono text-sm text-grey-text">
              {track.genre} · {formatDuration(track.duration)} · {track.bpm} BPM
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {track.mood.map((m) => (
                <span key={m} className="rounded-pill border border-green-dim/50 px-3 py-1 font-mono text-xs text-green-muted">
                  {m}
                </span>
              ))}
            </div>
            {track.description && (
              <p className="mt-6 text-grey-text">{track.description}</p>
            )}
            <div className="mt-8">
              <TrackPlayer track={track} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-secondary px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="heading-display mb-8 text-2xl font-bold text-white-pure">Licensing Options</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`glass p-6 ${track.licensingTier === tier.name.toLowerCase().split(" ")[0] ? "border-green-core/40" : ""}`}
              >
                <h3 className="font-display font-semibold text-white-pure">{tier.name}</h3>
                <p className="mt-2 font-display text-2xl font-bold text-green-core">{tier.price}</p>
                <p className="mt-2 text-sm text-grey-text">{tier.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <NeonButton href="/contact" variant="primary">
              Request License →
            </NeonButton>
          </div>
        </div>
      </section>
    </div>
  );
}
