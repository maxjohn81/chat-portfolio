"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

function Shape() {
  const meshRef = useRef<Mesh>(null);

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <MeshDistortMaterial
          color="#3b82f6"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

export function FloatingShape() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <Shape />
    </Canvas>
  );
}