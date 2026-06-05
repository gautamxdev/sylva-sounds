"use client";

import clsx from "clsx";

interface TagChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function TagChip({ label, active, onClick }: TagChipProps) {
  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      onClick={onClick}
      className={clsx(
        "rounded-pill px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200",
        active
          ? "bg-olive-core text-surface-01"
          : "border border-beige-deep bg-surface-01 text-text-secondary hover:border-olive-muted hover:text-olive-dark",
        onClick && "cursor-pointer"
      )}
    >
      {label}
    </Tag>
  );
}
