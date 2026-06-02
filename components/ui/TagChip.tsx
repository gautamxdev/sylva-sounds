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
          ? "bg-green-core text-bg-primary"
          : "border border-grey-mid/50 bg-surface-01 text-grey-text hover:border-green-core/40 hover:text-white-soft",
        onClick && "cursor-pointer"
      )}
    >
      {label}
    </Tag>
  );
}
