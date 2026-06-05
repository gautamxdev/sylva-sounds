"use client";

import { brandLogos } from "@/lib/data";

// Brand colors sourced from Simple Icons / official brand guidelines
// Displayed on dark background — using each brand's official or adapted hex
const BRAND_COLORS: Record<string, string> = {
  BMW: "#0166B1",
  OnePlus: "#EB0028",
  Tata: "#00A0E3",
  Zee5: "#BE52F2",
  NCS: "#3BC51B",
  Fastrack: "#E8A020",
  Parle: "#E04020",
  "White Hill Music": "#C8B040",
  "Wings Music": "#60A0DC",
  Spininn: "#9060DC",
};

/** Inline colored SVG logo for brands where we have a local SVG */
function InlineSVGLogo({ name, color }: { name: string; color: string }) {
  // BMW
  if (name === "BMW") return (
    <svg viewBox="0 0 24 24" height={56} fill={color} aria-label="BMW" role="img">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 .78C18.196.78 23.219 5.803 23.219 12c0 6.196-5.022 11.219-11.219 11.219C5.803 23.219.781 18.196.781 12S5.804.78 12 .78zm-.678.63c-.33.014-.66.042-.992.078l-.107 2.944a9.95 9.95 0 0 1 .71-.094l.07-1.988-.013-.137.043.13.664 1.489h.606l.664-1.488.04-.131-.01.137.07 1.988c.232.022.473.054.71.094l-.109-2.944a14.746 14.746 0 0 0-.992-.078l-.653 1.625-.023.12-.023-.12-.655-1.625zm6.696 1.824l-1.543 2.428c.195.15.452.371.617.522l1.453-.754.092-.069-.069.094-.752 1.453c.163.175.398.458.53.63l2.43-1.544a16.135 16.135 0 0 0-.46-.568L18.777 6.44l-.105.092.078-.115.68-1.356-.48-.48-1.356.68-.115.078.091-.106 1.018-1.539c-.18-.152-.351-.291-.57-.46zM5.5 3.785c-.36.037-.638.283-1.393 1.125a18.97 18.97 0 0 0-.757.914l2.074 1.967c.687-.76.966-1.042 1.508-1.613.383-.405.6-.87.216-1.317-.208-.242-.558-.295-.85-.175l-.028.01.01-.026a.7.7 0 0 0-.243-.734.724.724 0 0 0-.537-.15zm.006.615c.136-.037.277.06.308.2.032.14-.056.272-.154.382-.22.25-1.031 1.098-1.031 1.098l-.402-.383c.417-.51.861-.974 1.062-1.158a.55.55 0 0 1 .217-.139zM12 4.883a7.114 7.114 0 0 0-7.08 6.388v.002a7.122 7.122 0 0 0 8.516 7.697 7.112 7.112 0 0 0 5.68-6.97A7.122 7.122 0 0 0 12 4.885v-.002zm-5.537.242c.047 0 .096.013.14.043.088.059.128.16.106.26-.026.119-.125.231-.205.318l-1.045 1.12-.42-.4s.787-.832 1.045-1.099c.102-.106.168-.17.238-.205a.331.331 0 0 1 .14-.037zM12 5.818A6.175 6.175 0 0 1 18.182 12H12v6.182A6.175 6.175 0 0 1 5.818 12H12V5.818Z"/>
    </svg>
  );

  // OnePlus
  if (name === "OnePlus") return (
    <svg viewBox="0 0 24 24" height={52} fill={color} aria-label="OnePlus" role="img">
      <path d="M0 3.74V24h20.26V12.428h-2.256v9.317H2.254V5.995h9.318V3.742zM18.004 0v3.74h-3.758v2.256h3.758v3.758h2.255V5.996H24V3.74h-3.758V0zm-6.45 18.756V8.862H9.562c0 .682-.228 1.189-.577 1.504-.367.297-.91.437-1.556.437h-.245v1.625h2.133v6.31h2.237z"/>
    </svg>
  );

  // Tata
  if (name === "Tata") return (
    <svg viewBox="0 0 24 24" height={54} fill={color} aria-label="Tata" role="img">
      <path d="M9.774 11.568c.193-1.322.168-2.013-1.768-1.906-2.223.124-4.476.265-7.849 1.027A5.63 5.63 0 0 0 0 12c0 1.52.618 2.99 1.787 4.254 1.06 1.144 2.556 2.095 4.326 2.752a15.48 15.48 0 0 0 2.014.588c.13-.527.959-3.907 1.616-7.823l.03-.202m14.07-.88c-3.372-.762-5.624-.902-7.846-1.026-1.937-.107-1.962.584-1.768 1.906l.046.298c.65 3.848 1.458 7.16 1.598 7.72C20.595 18.508 24 15.516 24 12c0-.443-.054-.88-.157-1.311m-.491-1.324a7.163 7.163 0 0 0-1.14-1.618c-1.06-1.144-2.555-2.095-4.325-2.752-1.784-.662-3.82-1.011-5.887-1.011-2.068 0-4.103.35-5.887 1.01-1.77.658-3.266 1.61-4.326 2.753A7.17 7.17 0 0 0 .648 9.366c2.304-.557 6.245-1.293 9.904-1.37.353-.008.596.105.756.307.196.248.18 1.128.175 1.522l-.104 10.18a18.507 18.507 0 0 0 1.244 0l-.104-10.18c-.005-.394-.02-1.274.175-1.522.16-.202.403-.315.756-.308 3.658.078 7.597.813 9.902 1.37z"/>
    </svg>
  );

  return null;
}

/** Text badge for brands without SVG assets */
function TextBadge({ name, color }: { name: string; color: string }) {
  const abbr = name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase();
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="font-display text-lg font-bold leading-none tracking-tight"
        style={{ color }}
      >
        {abbr}
      </span>
      <span className="font-body text-[9px] uppercase tracking-widest" style={{ color: `${color}80` }}>
        {name.split(" ")[0]}
      </span>
    </div>
  );
}

/** Image logo (PNG/JPG) with opacity treatment */
function ImgLogo({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-14 w-auto max-w-[160px] object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 md:h-16"
      loading="lazy"
    />
  );
}

function BrandItem({ name }: { name: string }) {
  const color = BRAND_COLORS[name] ?? "rgba(240,236,227,0.55)";

  if (name === "BMW" || name === "OnePlus" || name === "Tata") {
    return <InlineSVGLogo name={name} color={color} />;
  }
  if (name === "Zee5") {
    return <ImgLogo src="/logos/zee5.jpg" alt="Zee5" />;
  }
  if (name === "Fastrack") {
    return <ImgLogo src="/logos/fastrack.png" alt="Fastrack" />;
  }
  if (name === "NCS") {
    return (
      <span className="font-display text-3xl font-black tracking-tight md:text-4xl" style={{ color }}>
        NCS
      </span>
    );
  }
  return <TextBadge name={name} color={color} />;
}

export function ClientLogos() {
  const items = brandLogos.map(b => b.name);
  const doubled = [...items, ...items];

  return (
    <section data-stage="sound" className="veil-dark py-16 md:py-20">
      <p
        className="label-mono mb-12 text-center text-base md:text-lg"
        style={{ color: "rgba(92,107,61,0.55)" }}
      >
        Brands We&apos;ve Served
      </p>

      <div
        className="marquee-track overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="animate-marquee flex w-max items-center">
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="mx-12 flex h-20 shrink-0 items-center justify-center md:mx-20 md:h-24"
            >
              <BrandItem name={name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
