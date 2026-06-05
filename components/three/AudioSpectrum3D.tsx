"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const COLS = 36;
const ROWS = 8;
const COUNT = COLS * ROWS;
const SPACING_X = 0.4;
const SPACING_Z = 0.36;

function barHeight(col: number, row: number, t: number) {
  return Math.max(
    0.08,
    Math.abs(
      Math.sin(col * 0.34 + t * 1.9) * 0.62 +
        Math.sin(col * 0.7 - t * 1.2) * 0.3 +
        Math.sin(row * 0.5 + t * 0.7) * 0.16 +
        Math.cos((col + row * 0.4) * 0.25 + t * 1.05) * 0.2
    ) * 2.6
  );
}

function SpectrumBars() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colors = useMemo(() => Array.from({ length: COUNT }, () => new THREE.Color()), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < COUNT; i++) {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x = (col - COLS / 2) * SPACING_X;
      const z = (row - ROWS / 2) * SPACING_Z;
      const h = barHeight(col, row, t);

      dummy.position.set(x, h * 0.5, z);
      dummy.scale.set(0.16, h, 0.16);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const n = Math.min(h / 2.6, 1);
      colors[i].setHSL(0.2 + n * 0.08, 0.55, 0.18 + n * 0.34);
      meshRef.current.setColorAt(i, colors[i]);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <boxGeometry />
      <meshStandardMaterial roughness={0.25} metalness={0.55} toneMapped={false} />
    </instancedMesh>
  );
}

/** A glowing sine waveform line sweeping across the front of the bars */
function WaveformLine() {
  const POINTS = 120;
  const ref = useRef<THREE.Line>(null!);

  const geometry = useMemo(() => {
    const positions = new Float32Array(POINTS * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#e8d066"),
        transparent: true,
        opacity: 0.9,
        toneMapped: false,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const positions = geometry.attributes.position.array as Float32Array;
    const width = COLS * SPACING_X;
    for (let i = 0; i < POINTS; i++) {
      const x = (i / (POINTS - 1) - 0.5) * width;
      const y =
        Math.sin(x * 0.9 + t * 2.4) * 0.5 +
        Math.sin(x * 0.45 - t * 1.6) * 0.3 +
        Math.sin(x * 1.7 + t * 1.1) * 0.16 +
        1.4;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = (ROWS / 2) * SPACING_Z + 0.5;
    }
    geometry.attributes.position.needsUpdate = true;
  });

  return <primitive ref={ref} object={new THREE.Line(geometry, material)} />;
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null!);
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 0.16;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 0.1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    smooth.current.x += (pointer.current.x - smooth.current.x) * 0.05;
    smooth.current.y += (pointer.current.y - smooth.current.y) * 0.05;
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.12 + smooth.current.x;
    groupRef.current.rotation.x = -0.24 + smooth.current.y;
  });

  return (
    <group ref={groupRef}>
      <SpectrumBars />
      <WaveformLine />
    </group>
  );
}

export function AudioSpectrum3D() {
  return (
    <Canvas
      camera={{ position: [0, 4, 11], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.8]}
    >
      <ambientLight intensity={0.9} color="#c8b890" />
      <directionalLight position={[3, 10, 6]} intensity={1.6} color="#e8d890" />
      <spotLight position={[-5, 14, 5]} angle={0.4} penumbra={0.7} intensity={1.2} color="#d4a840" />
      <pointLight position={[-4, 4, -3]} intensity={0.7} color="#6b8a40" />
      <pointLight position={[8, 2, 8]} intensity={0.45} color="#c8983c" />
      <Scene />
      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.35} luminanceSmoothing={0.85} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
