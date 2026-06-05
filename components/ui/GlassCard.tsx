import clsx from "clsx";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={clsx(
        "glass p-6 transition-all duration-300",
        hover && "hover:border-olive-muted/40 hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
