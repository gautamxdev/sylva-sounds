import Link from "next/link";
import clsx from "clsx";

interface NeonButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  type?: "button" | "submit";
}

export function NeonButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
}: NeonButtonProps) {
  const styles = clsx(
    "inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 font-body text-sm font-medium transition-all duration-300 active:scale-[0.97]",
    variant === "primary" &&
      "border border-green-core bg-transparent text-green-core hover:bg-green-core hover:text-bg-primary",
    variant === "outline" &&
      "border border-green-core/60 bg-transparent text-green-core hover:border-green-core hover:shadow-[0_0_20px_rgba(26,255,107,0.2)]",
    variant === "ghost" &&
      "border border-white-soft/30 bg-transparent text-white-soft hover:border-green-core hover:text-green-core",
    className
  );

  if (href) {
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
