"use client";

import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(p);
      setVisible(p > 0.05 && p < 0.95);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 md:block">
      <div className="relative h-32 w-px bg-beige-deep">
        <div
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-olive-core transition-all duration-150"
          style={{ top: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
