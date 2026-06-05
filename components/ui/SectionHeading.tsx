import { RevealText } from "@/components/ui/RevealText";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  size?: "default" | "large";
  reveal?: boolean;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  dark = false,
  size = "default",
  reveal = false,
}: SectionHeadingProps) {
  const titleClass =
    size === "large"
      ? "font-semibold leading-[0.96] tracking-[-0.02em]"
      : "font-semibold leading-[1.02] tracking-[-0.015em]";

  const titleStyle = {
    fontSize: size === "large" ? "clamp(3.2rem, 8vw, 7rem)" : "clamp(2.2rem, 5.5vw, 5rem)",
    ...(dark ? { color: "var(--on-dark)" } : {}),
  };

  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p
        className="label-mono mb-4 text-base md:text-lg"
        style={dark ? { color: "var(--on-dark-label)" } : undefined}
      >
        {label}
      </p>
      {reveal ? (
        <RevealText
          text={title}
          className={`heading-display ${titleClass} ${align === "center" ? "mx-auto" : ""}`}
          style={titleStyle}
        />
      ) : (
        <h2 className={`heading-display ${titleClass}`} style={titleStyle}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`mt-6 max-w-2xl text-lg leading-relaxed md:text-xl lg:text-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
          style={dark ? { color: "var(--on-dark-dim)" } : { color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
