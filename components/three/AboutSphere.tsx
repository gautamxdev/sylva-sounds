"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sphereVertexShader, sphereFragmentShader } from "./shaders";

export function AboutSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0.15 },
    }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = t;
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.15;
      wireRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={sphereVertexShader}
          fragmentShader={sphereFragmentShader}
          transparent
        />
      </mesh>
      <lineSegments ref={wireRef}>
        <wireframeGeometry args={[new THREE.SphereGeometry(2.01, 32, 32)]} />
        <lineBasicMaterial color="#1aff6b" transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}
