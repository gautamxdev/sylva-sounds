"use client";

interface WaveformVisualizerProps {
  progress?: number;
  animated?: boolean;
  bars?: number;
  className?: string;
}

export function WaveformVisualizer({
  progress = 0,
  animated = false,
  bars = 48,
  className = "",
}: WaveformVisualizerProps) {
  const heights = Array.from({ length: bars }, (_, i) => {
    const base = 0.2 + Math.sin(i * 0.5) * 0.3 + Math.cos(i * 0.3) * 0.2;
    return Math.max(0.15, Math.min(1, base));
  });

  return (
    <div className={`flex h-full items-center gap-[2px] ${className}`}>
      {heights.map((h, i) => {
        const filled = i / bars <= progress;
        return (
          <div
            key={i}
            className={`flex-1 rounded-full transition-colors duration-150 ${
              filled ? "bg-olive-core" : "bg-beige-deep"
            } ${animated ? "waveform-bar" : ""}`}
            style={{
              height: `${h * 100}%`,
              animationDelay: animated ? `${i * 0.05}s` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}

export function StaticWaveform({ className = "" }: { className?: string }) {
  return <WaveformVisualizer animated={false} bars={32} className={className} />;
}
