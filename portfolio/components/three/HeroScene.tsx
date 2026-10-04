"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Persona } from "@/data/site";

const TAU = Math.PI * 2;
const PHASOR_COUNT = 7;
const circlePoints = Array.from({ length: 65 }, (_, index) => {
  const angle = (index / 64) * TAU;
  return [Math.cos(angle), Math.sin(angle), 0] as [number, number, number];
});

function seededRandom(seed = 9173) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function useModePresence(active: boolean) {
  const group = useRef<THREE.Group>(null);
  const amount = useRef(active ? 1 : 0);

  useFrame((_, delta) => {
    if (!group.current) return;
    amount.current = THREE.MathUtils.damp(amount.current, active ? 1 : 0, 5.5, delta);
    const scale = 0.72 + amount.current * 0.28;
    group.current.scale.setScalar(scale);
    group.current.rotation.z = (1 - amount.current) * -0.2;
    group.current.position.y = (1 - amount.current) * -0.35;
    group.current.visible = amount.current > 0.015;
  });

  return group;
}

function FourierSculpture({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const presence = useModePresence(active);
  const mechanism = useRef<THREE.Group>(null);
  const ringRefs = useRef<Array<THREE.Group | null>>([]);
  const chainGeometry = useRef<THREE.BufferGeometry>(null);
  const cursor = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  const chainPositions = useMemo(() => new Float32Array(PHASOR_COUNT * 2 * 3), []);
  const wavePositions = useMemo(() => new Float32Array(170 * 3), []);
  const connector = useMemo(
    () => new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineDashedMaterial({
        color: "#a7f3d0",
        dashSize: 0.08,
        gapSize: 0.055,
        transparent: true,
        opacity: 0.45,
      }),
    ),
    [],
  );
  const wave = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(wavePositions, 3));
    return new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: "#6ee7b7", transparent: true, opacity: 0.94 }),
    );
  }, [wavePositions]);

  useEffect(() => () => {
    connector.geometry.dispose();
    (connector.material as THREE.Material).dispose();
    wave.geometry.dispose();
    (wave.material as THREE.Material).dispose();
  }, [connector, wave]);

  useFrame((state, delta) => {
    if (!mechanism.current) return;
    if (!reducedMotion) time.current += delta * 0.46;
    const t = time.current;
    const points: THREE.Vector3[] = [new THREE.Vector3(-2.05, 0.18, 0)];

    for (let index = 0; index < PHASOR_COUNT; index += 1) {
      const harmonic = index * 2 + 1;
      const radius = 1.34 / harmonic;
      const start = points[index];
      const end = new THREE.Vector3(
        start.x + Math.cos(t * harmonic) * radius,
        start.y + Math.sin(t * harmonic) * radius,
        0,
      );
      points.push(end);
      ringRefs.current[index]?.position.copy(start);
      ringRefs.current[index]?.scale.setScalar(radius);
      chainPositions.set([start.x, start.y, 0.02, end.x, end.y, 0.02], index * 6);
    }

    const chainAttribute = chainGeometry.current?.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (chainAttribute) chainAttribute.needsUpdate = true;

    const endpoint = points[points.length - 1];
    cursor.current?.position.set(0.2, endpoint.y, 0.08);
    connector.geometry.setFromPoints([
      new THREE.Vector3(endpoint.x, endpoint.y, 0.03),
      new THREE.Vector3(0.2, endpoint.y, 0.03),
    ]);
    connector.computeLineDistances();

    for (let index = 0; index < 170; index += 1) {
      const progress = index / 169;
      let sum = 0;
      for (let term = 0; term < PHASOR_COUNT; term += 1) {
        const harmonic = term * 2 + 1;
        sum += (1.34 / harmonic) * Math.sin(t * harmonic - progress * TAU * harmonic);
      }
      wavePositions[index * 3] = 0.2 + progress * 3.25;
      wavePositions[index * 3 + 1] = sum;
      wavePositions[index * 3 + 2] = 0;
    }
    const waveAttribute = wave.geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (waveAttribute) waveAttribute.needsUpdate = true;

    mechanism.current.rotation.y = THREE.MathUtils.lerp(
      mechanism.current.rotation.y,
      state.pointer.x * 0.12,
      0.035,
    );
    mechanism.current.rotation.x = THREE.MathUtils.lerp(
      mechanism.current.rotation.x,
      -state.pointer.y * 0.08,
      0.035,
    );
  });

  return (
    <group ref={presence}>
      <group ref={mechanism} rotation={[0.04, -0.08, -0.04]}>
        {Array.from({ length: PHASOR_COUNT }, (_, index) => (
          <group
            key={index}
            ref={(node) => { ringRefs.current[index] = node; }}
          >
            <Line
              points={circlePoints}
              color={index % 2 ? "#67e8f9" : "#6ee7b7"}
              lineWidth={0.65}
              transparent
              opacity={0.2 + (PHASOR_COUNT - index) * 0.035}
            />
          </group>
        ))}

        <lineSegments>
          <bufferGeometry ref={chainGeometry}>
            <bufferAttribute attach="attributes-position" args={[chainPositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#e8fff6" transparent opacity={0.82} />
        </lineSegments>

        <primitive object={connector} />

        <mesh ref={cursor}>
          <sphereGeometry args={[0.075, 18, 18]} />
          <meshStandardMaterial color="#ecfeff" emissive="#22d3ee" emissiveIntensity={2.8} />
        </mesh>

        <primitive object={wave} />

        {[-1.35, 0, 1.35].map((y) => (
          <Line key={y} points={[[0.2, y, -0.06], [3.45, y, -0.06]]} color="#64736e" opacity={0.13} transparent lineWidth={0.5} />
        ))}
        {Array.from({ length: 6 }, (_, index) => (
          <Line key={index} points={[[0.2 + index * 0.65, -1.42, -0.06], [0.2 + index * 0.65, 1.42, -0.06]]} color="#64736e" opacity={0.09} transparent lineWidth={0.5} />
        ))}
      </group>
    </group>
  );
}

type NeuralModel = {
  nodes: THREE.Vector3[];
  edges: Array<[number, number]>;
  edgePositions: Float32Array;
};

function createNeuralModel(): NeuralModel {
  const random = seededRandom();
  const nodes: THREE.Vector3[] = [];

  for (let index = 0; index < 76; index += 1) {
    const side = index % 2 === 0 ? -1 : 1;
    const radius = 0.35 + Math.cbrt(random()) * 0.75;
    const azimuth = random() * TAU;
    const elevation = Math.acos(random() * 2 - 1);
    const x = side * (0.18 + Math.abs(Math.sin(elevation) * Math.cos(azimuth)) * 1.28 * radius);
    const y = Math.cos(elevation) * 1.42 * radius + 0.08;
    const z = Math.sin(elevation) * Math.sin(azimuth) * 1.05 * radius;
    nodes.push(new THREE.Vector3(x, y, z));
  }

  const edges: Array<[number, number]> = [];
  nodes.forEach((node, index) => {
    const nearest = nodes
      .map((candidate, target) => ({ target, distance: node.distanceTo(candidate) }))
      .filter(({ target, distance }) => target !== index && distance < 0.9)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, index % 5 === 0 ? 3 : 2);
    nearest.forEach(({ target }) => {
      const edge: [number, number] = index < target ? [index, target] : [target, index];
      if (!edges.some(([a, b]) => a === edge[0] && b === edge[1])) edges.push(edge);
    });
  });

  const edgePositions = new Float32Array(edges.length * 6);
  edges.forEach(([start, end], index) => {
    edgePositions.set(nodes[start].toArray(), index * 6);
    edgePositions.set(nodes[end].toArray(), index * 6 + 3);
  });
  return { nodes, edges, edgePositions };
}

function NeuralTopology({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const presence = useModePresence(active);
  const system = useRef<THREE.Group>(null);
  const nodesMesh = useRef<THREE.InstancedMesh>(null);
  const pulsesMesh = useRef<THREE.InstancedMesh>(null);
  const model = useMemo(createNeuralModel, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pulseCount = 12;

  useEffect(() => {
    if (!nodesMesh.current) return;
    const teal = new THREE.Color("#67e8f9");
    const green = new THREE.Color("#6ee7b7");
    model.nodes.forEach((position, index) => {
      dummy.position.copy(position);
      const scale = index % 11 === 0 ? 1.55 : index % 5 === 0 ? 1.18 : 0.82;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      nodesMesh.current?.setMatrixAt(index, dummy.matrix);
      nodesMesh.current?.setColorAt(index, index % 3 === 0 ? teal : green);
    });
    nodesMesh.current.instanceMatrix.needsUpdate = true;
    if (nodesMesh.current.instanceColor) nodesMesh.current.instanceColor.needsUpdate = true;
  }, [dummy, model.nodes]);

  useFrame((state, delta) => {
    if (!system.current) return;
    if (!reducedMotion && pulsesMesh.current) {
      for (let index = 0; index < pulseCount; index += 1) {
        const edge = model.edges[(index * 13 + 5) % model.edges.length];
        const phase = (state.clock.elapsedTime * (0.22 + index * 0.012) + index / pulseCount) % 1;
        dummy.position.lerpVectors(model.nodes[edge[0]], model.nodes[edge[1]], phase);
        const swell = Math.sin(phase * Math.PI);
        dummy.scale.setScalar(0.7 + swell * 0.55);
        dummy.updateMatrix();
        pulsesMesh.current.setMatrixAt(index, dummy.matrix);
      }
      pulsesMesh.current.instanceMatrix.needsUpdate = true;
    }
    system.current.rotation.y += reducedMotion ? 0 : delta * 0.055;
    system.current.rotation.x = THREE.MathUtils.lerp(system.current.rotation.x, state.pointer.y * 0.14, 0.035);
    system.current.rotation.z = THREE.MathUtils.lerp(system.current.rotation.z, -state.pointer.x * 0.1, 0.035);
  });

  return (
    <group ref={presence}>
      <group ref={system} rotation={[0.05, -0.25, -0.05]}>
        <Float speed={reducedMotion ? 0 : 1.15} rotationIntensity={0.06} floatIntensity={0.18}>
          <mesh position={[-0.61, 0.08, 0]} scale={[1.05, 1.28, 0.94]}>
            <icosahedronGeometry args={[1.15, 4]} />
            <MeshDistortMaterial color="#0b3d35" wireframe transparent opacity={0.11} distort={0.16} speed={1.1} />
          </mesh>
          <mesh position={[0.61, 0.08, 0]} scale={[1.05, 1.28, 0.94]}>
            <icosahedronGeometry args={[1.15, 4]} />
            <MeshDistortMaterial color="#123c4b" wireframe transparent opacity={0.11} distort={0.16} speed={1.1} />
          </mesh>
        </Float>

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[model.edgePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#5eead4" transparent opacity={0.19} blending={THREE.AdditiveBlending} />
        </lineSegments>

        <instancedMesh ref={nodesMesh} args={[undefined, undefined, model.nodes.length]}>
          <sphereGeometry args={[0.052, 10, 10]} />
          <meshStandardMaterial vertexColors emissive="#22d3ee" emissiveIntensity={1.4} roughness={0.25} metalness={0.2} />
        </instancedMesh>

        <instancedMesh ref={pulsesMesh} args={[undefined, undefined, pulseCount]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color="#ecfeff" toneMapped={false} />
        </instancedMesh>
        {!reducedMotion && <Sparkles count={34} scale={[3.5, 3.5, 2.6]} size={1.2} speed={0.16} color="#67e8f9" opacity={0.35} />}
      </group>
    </group>
  );
}

function Visualization({ persona, reducedMotion }: { persona: Persona; reducedMotion: boolean }) {
  const stage = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!stage.current || reducedMotion) return;
    stage.current.position.x = THREE.MathUtils.lerp(stage.current.position.x, state.pointer.x * 0.1, 0.025);
    stage.current.position.y = THREE.MathUtils.lerp(stage.current.position.y, state.pointer.y * 0.08, 0.025);
  });

  return (
    <group ref={stage} scale={0.93} position={[0.12, 0, 0]}>
      <FourierSculpture active={persona === "product"} reducedMotion={reducedMotion} />
      <NeuralTopology active={persona === "ai"} reducedMotion={reducedMotion} />
    </group>
  );
}

export default function HeroScene({ persona }: { persona: Persona }) {
  const reducedMotion = useReducedMotion() ?? false;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [canRender, setCanRender] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const desktop = window.matchMedia("(min-width: 768px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateCapability = () => setCanRender(
      desktop.matches &&
      !motion.matches &&
      !connection?.saveData &&
      (navigator.hardwareConcurrency ?? 4) >= 4,
    );
    updateCapability();
    desktop.addEventListener("change", updateCapability);
    motion.addEventListener("change", updateCapability);
    return () => {
      desktop.removeEventListener("change", updateCapability);
      motion.removeEventListener("change", updateCapability);
    };
  }, []);

  useEffect(() => {
    if (!wrapperRef.current || !canRender) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [canRender]);

  if (!canRender) return <div className="hero-scene-fallback" aria-hidden />;

  return (
    <div ref={wrapperRef} className="hero-scene" aria-hidden>
      <Canvas
        dpr={[1, 1.4]}
        camera={{ position: [0, 0, 7.3], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={isVisible ? "always" : "never"}
      >
        <ambientLight intensity={0.36} />
        <pointLight position={[3.5, 4, 5]} intensity={18} color="#dffdf3" />
        <pointLight position={[-4, -2, 2]} intensity={11} color={persona === "ai" ? "#22d3ee" : "#10b981"} />
        <Visualization persona={persona} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
