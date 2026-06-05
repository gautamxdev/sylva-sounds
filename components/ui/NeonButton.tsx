import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  type?: "button" | "submit";
}

export function NeonButton({
  children,
  href,
  external,
  onClick,
  variant = "primary",
  className,
  type = "button",
}: ButtonProps) {
  const styles = clsx(
    "inline-flex items-center justify-center gap-2 rounded-pill px-7 py-3.5 font-body text-sm font-semibold tracking-wide transition-all duration-300 active:scale-[0.98]",
    variant === "primary" &&
      "bg-olive-core text-surface-01 hover:bg-olive-dark shadow-sm hover:shadow-md",
    variant === "outline" &&
      "border-2 border-olive-core bg-transparent text-olive-dark hover:bg-olive-core hover:text-surface-01",
    variant === "ghost" &&
      "border border-beige-deep bg-transparent text-text-secondary hover:border-olive-muted hover:text-olive-dark",
    className
  );

  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
