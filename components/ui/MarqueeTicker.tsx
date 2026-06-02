const items = [
  "MUSIC PRODUCTION",
  "SOUND DESIGN",
  "FILM SCORING",
  "MIXING & MASTERING",
  "AUDIO POST",
  "BRAND AUDIO",
];

export function MarqueeTicker() {
  const text = items.join(" · ") + " · ";
  const repeated = text.repeat(4);

  return (
    <div className="relative overflow-hidden border-y border-green-dim/40 bg-bg-secondary py-4">
      <div className="animate-marquee flex whitespace-nowrap">
        <span className="font-mono text-xs tracking-[0.2em] text-green-muted">{repeated}</span>
        <span className="font-mono text-xs tracking-[0.2em] text-green-muted" aria-hidden>
          {repeated}
        </span>
      </div>
    </div>
  );
}
