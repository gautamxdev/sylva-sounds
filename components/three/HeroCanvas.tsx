"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { AboutSphere } from "./AboutSphere";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const HeroWaveform = dynamic(() => import("./HeroWaveform").then((m) => m.HeroWaveform), {
  ssr: false,
});

const ParticleField = dynamic(() => import("./ParticleField").then((m) => m.ParticleField), {
  ssr: false,
});

interface HeroCanvasProps {
  density?: "full" | "light";
}

function CanvasWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return <Suspense fallback={null}>{children}</Suspense>;
}

export function HeroCanvas({ density = "full" }: HeroCanvasProps) {
  const particleCount = density === "full" ? 4000 : 1500;

  return (
    <div className="pointer-events-none absolute inset-0">
      <CanvasWrapper>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <color attach="background" args={["#030805"]} />
          <ParticleField count={particleCount} />
          <HeroWaveform />
        </Canvas>
      </CanvasWrapper>
    </div>
  );
}

export function AboutCanvas() {
  return (
    <div className="pointer-events-none h-full min-h-[400px] w-full">
      <CanvasWrapper>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} color="#1aff6b" intensity={1.5} />
          <AboutSphere />
        </Canvas>
      </CanvasWrapper>
    </div>
  );
}
