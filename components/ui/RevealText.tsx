"use client";

import { useLayoutEffect, useRef, type ElementType, type CSSProperties } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";

interface RevealTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Delay before the first word animates in (seconds) */
  delay?: number;
  stagger?: number;
}

/**
 * Splits text into words and animates each word up + in on scroll.
 * Words are inline-block spans so the reveal reads word-by-word.
 */
export function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  style,
  delay = 0,
  stagger = 0.05,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLElement>(".reveal-word > span");
      gsap.fromTo(
        words,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [text, delay, stagger]);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="reveal-word"
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <span style={{ display: "inline-block" }}>{word}</span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
