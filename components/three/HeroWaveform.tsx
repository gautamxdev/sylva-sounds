"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { waveformVertexShader, waveformFragmentShader } from "./shaders";

export function HeroWaveform() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const targetAmplitude = useRef(0.3);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0.3 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.getElapsedTime();
    mat.uniforms.uAmplitude.value += (targetAmplitude.current - mat.uniforms.uAmplitude.value) * 0.05;
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 5]} color="#1aff6b" intensity={2} />
      <mesh ref={meshRef} rotation={[-0.3, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width * 1.2, 3, 128, 1]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={waveformVertexShader}
          fragmentShader={waveformFragmentShader}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
