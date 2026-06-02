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
        hover && "hover:scale-[1.02] hover:border-green-core/30 hover:shadow-[0_0_30px_rgba(26,255,107,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}
