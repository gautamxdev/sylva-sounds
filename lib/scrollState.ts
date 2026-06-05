/**
 * Global, render-free scroll/pointer store for the cinematic "sound world".
 * Written every Lenis scroll + pointer move; read inside R3F useFrame loops.
 * Intentionally a plain mutable singleton so the WebGL world can react every
 * frame without triggering React re-renders.
 */

export type Stage =
  | "silence"
  | "sound"
  | "projects"
  | "composition"
  | "production"
  | "legacy"
  | "collaboration";

const STAGE_THRESHOLDS: { stage: Stage; until: number }[] = [
  { stage: "silence", until: 0.06 },
  { stage: "sound", until: 0.2 },
  { stage: "projects", until: 0.4 },
  { stage: "composition", until: 0.56 },
  { stage: "production", until: 0.7 },
  { stage: "legacy", until: 0.88 },
  { stage: "collaboration", until: 1.01 },
];

export const scrollState = {
  /** 0..1 across the whole document */
  progress: 0,
  /** smoothed scroll velocity from Lenis */
  velocity: 0,
  /** normalized pointer, -1..1 */
  pointerX: 0,
  pointerY: 0,
  /** transient "now playing" pulse, decays each frame */
  pulse: 0,
  /** route-based intensity (1 = home/full, lower = subtle inner pages) */
  intensity: 1,
};

export function setScroll(progress: number, velocity: number) {
  scrollState.progress = Number.isFinite(progress) ? Math.min(Math.max(progress, 0), 1) : 0;
  scrollState.velocity = Number.isFinite(velocity) ? velocity : 0;
}

export function setPointer(x: number, y: number) {
  scrollState.pointerX = x;
  scrollState.pointerY = y;
}

export function triggerPulse(value = 1) {
  scrollState.pulse = Math.max(scrollState.pulse, value);
}

export function setIntensity(value: number) {
  scrollState.intensity = value;
}

export function getStage(progress = scrollState.progress): Stage {
  for (const t of STAGE_THRESHOLDS) if (progress < t.until) return t.stage;
  return "collaboration";
}
