"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LINES = 6;
const POINTS = 80;

function WaveLines() {
  const refs = useRef<(THREE.Line | null)[]>([]);
  const geometries = useMemo(() =>
    Array.from({ length: LINES }, (_, li) => {
      const positions = new Float32Array(POINTS * 3);
      for (let i = 0; i < POINTS; i++) {
        positions[i * 3]     = (i / (POINTS - 1) - 0.5) * 14;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (li - LINES / 2) * 0.9;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      return geo;
    }),
  []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    geometries.forEach((geo, li) => {
      const positions = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < POINTS; i++) {
        const x = (i / (POINTS - 1) - 0.5) * 14;
        const phase = li * 0.55 + t * 0.7;
        const y =
          Math.sin(x * 0.9 + phase) * 0.45 +
          Math.sin(x * 0.4 - phase * 1.3) * 0.28 +
          Math.sin(x * 1.6 + t * 0.5 + li * 0.3) * 0.15;
        positions[i * 3 + 1] = y;
      }
      geo.attributes.position.needsUpdate = true;
    });
  });

  return (
    <>
      {geometries.map((geo, li) => {
        const t = li / (LINES - 1);
        const color = new THREE.Color().setHSL(0.22 + t * 0.06, 0.5, 0.35 + t * 0.25);
        return (
          <primitive
            key={li}
            object={new THREE.Line(
              geo,
              new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 + t * 0.3 })
            )}
          />
        );
      })}
    </>
  );
}

export function WaveLine3D() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.6} />
      <WaveLines />
    </Canvas>
  );
}
