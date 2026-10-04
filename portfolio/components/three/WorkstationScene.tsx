"use client";

import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";

const MODEL_PATH = "/models/futuristic-workstation.glb";

function WorkstationModel() {
  const { scene } = useGLTF(MODEL_PATH);

  return (
    <group
      position={[0, -1.08, 0]}
      rotation={[-0.04, -0.12, 0]}
      scale={1.38}
    >
      <primitive object={scene} />
    </group>
  );
}

export default function WorkstationScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "160px" },
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [4.4, 3.15, 5.7], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={isVisible && !reducedMotion ? "always" : "demand"}
      >
        <ambientLight intensity={0.9} />
        <hemisphereLight args={["#d8fff4", "#07110e", 1.4]} />
        <directionalLight position={[4, 6, 5]} intensity={3.2} color="#edfff9" />
        <pointLight position={[-3, 2, 4]} intensity={14} color="#10b981" />
        <pointLight position={[3, 1, 2]} intensity={9} color="#22d3ee" />

        <Suspense fallback={null}>
          <WorkstationModel />
          <ContactShadows
            position={[0, -1.15, 0]}
            opacity={0.34}
            scale={6}
            blur={2.6}
            far={3.4}
            resolution={512}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          target={[0, 0.15, 0]}
          enableDamping
          dampingFactor={0.065}
          enablePan={false}
          enableRotate
          rotateSpeed={0.72}
          enableZoom
          zoomSpeed={0.75}
          minDistance={5.2}
          maxDistance={10.5}
          minPolarAngle={Math.PI * 0.08}
          maxPolarAngle={Math.PI * 0.92}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
