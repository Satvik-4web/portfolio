import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Edges, RoundedBox, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

type ObjectType = 'torus-knot' | 'icosahedron' | 'rounded-cube' | 'torus-ring';

interface CornerObjectConfig {
  type: ObjectType;
  color: string;
  corner: 'tl' | 'tr' | 'bl' | 'br';
}

const CORNER_CONFIGS: CornerObjectConfig[] = [
  {
    type: 'torus-knot',
    color: '#1F3330', // Mint-tinted dark metallic (#5EEAD4 accent)
    corner: 'tl',
  },
  {
    type: 'icosahedron',
    color: '#24283B', // Periwinkle-tinted dark metallic (#8AA2FF accent)
    corner: 'tr',
  },
  {
    type: 'rounded-cube',
    color: '#332B20', // Amber-tinted dark metallic (#F5C26B accent)
    corner: 'bl',
  },
  {
    type: 'torus-ring',
    color: '#362128', // Rose-tinted dark metallic (#FB7185 accent)
    corner: 'br',
  },
];

interface CornerMeshProps {
  config: CornerObjectConfig;
  reducedMotion: boolean;
  isTouch: boolean;
  mousePos: { x: number; y: number };
}

const CornerMesh: React.FC<CornerMeshProps> = ({
  config,
  reducedMotion,
  isTouch,
  mousePos,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const isLeft = config.corner === 'tl' || config.corner === 'bl';
  const isTop = config.corner === 'tl' || config.corner === 'tr';

  // Damped cursor lean state
  const currentLean = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Invalidate frame so demand frameloop always draws animations
    state.invalidate();

    if (!groupRef.current) return;

    const W = viewport.width;
    const H = viewport.height;
    const isMobile = W < 6.5;

    // 12% inset positioning:
    // Outer edge is 0.5 * W. 12% inset brings center to:
    // |x| = (0.5 - 0.12) * W = 0.38 * W.
    // On mobile, push slightly further into corners (y: 0.41 * H) to leave the entire center text stack clear.
    const baseX = isLeft ? -0.38 * W : 0.38 * W;
    const baseY = isTop
      ? (isMobile ? 0.40 * H : 0.38 * H)
      : (isMobile ? -0.40 * H : -0.38 * H);

    // Cursor lean: disabled on touch devices and prefers-reduced-motion
    let targetLeanX = 0;
    let targetLeanY = 0;
    if (!isTouch && !reducedMotion) {
      targetLeanX = mousePos.x * 0.18;
      targetLeanY = mousePos.y * 0.18;
    }

    currentLean.current.x = THREE.MathUtils.lerp(
      currentLean.current.x,
      targetLeanX,
      Math.min(1, delta * 4)
    );
    currentLean.current.y = THREE.MathUtils.lerp(
      currentLean.current.y,
      targetLeanY,
      Math.min(1, delta * 4)
    );

    // Sine float drift (gentle, zero under reduced-motion)
    const time = state.clock.getElapsedTime();
    const phase = (isLeft ? 0 : 1.5) + (isTop ? 0 : 2.5);
    const driftY = reducedMotion ? 0 : Math.sin(time * 0.9 + phase) * 0.045;
    const driftX = reducedMotion ? 0 : Math.cos(time * 0.7 + phase) * 0.035;

    groupRef.current.position.set(
      baseX + currentLean.current.x + driftX,
      baseY + currentLean.current.y + driftY,
      0
    );

    // Gentle slow rotation for dynamic reflections (static under reduced-motion)
    if (meshRef.current && !reducedMotion) {
      meshRef.current.rotation.x = time * 0.22 + phase;
      meshRef.current.rotation.y = time * 0.28 + phase;
    }
  });

  // Responsive scale:
  // On desktop: keep object bounding radius < 10% of viewport width (approx 0.055 * W)
  // On mobile (390px): scale to ~90-110px equivalent in viewport units
  const scale = useMemo(() => {
    if (viewport.width < 6.5) {
      // Mobile: viewport.width ~3.2, 90-110px is ~0.42 scale
      return 0.42;
    }
    // Desktop: clamp scale so bounding radius is ~5.5% of viewport width (well under 10%)
    // This keeps the object strictly within the outer 18% of screen width (x in [0.325W, 0.435W])
    const computed = viewport.width * 0.058;
    return Math.max(0.48, Math.min(0.82, computed));
  }, [viewport.width]);

  // Shared dark metallic material: metalness 0.85, roughness 0.28, tinted with accent
  const material = useMemo(
    () => (
      <meshStandardMaterial
        color={config.color}
        metalness={0.85}
        roughness={0.28}
        envMapIntensity={1.2}
      />
    ),
    [config.color]
  );

  return (
    <group ref={groupRef} scale={scale}>
      {config.type === 'torus-knot' && (
        <mesh ref={meshRef} castShadow={false} receiveShadow={false}>
          <torusKnotGeometry args={[0.55, 0.16, 96, 24, 2, 3]} />
          {material}
          <Edges threshold={15} color="#5EEAD4" />
        </mesh>
      )}

      {config.type === 'icosahedron' && (
        <mesh ref={meshRef} castShadow={false} receiveShadow={false}>
          <icosahedronGeometry args={[0.74, 0]} />
          {material}
          <Edges threshold={15} color="#5EEAD4" />
        </mesh>
      )}

      {config.type === 'rounded-cube' && (
        <RoundedBox
          ref={meshRef}
          args={[1.08, 1.08, 1.08]}
          radius={0.16}
          smoothness={4}
          castShadow={false}
          receiveShadow={false}
        >
          {material}
          <Edges threshold={15} color="#5EEAD4" />
        </RoundedBox>
      )}

      {config.type === 'torus-ring' && (
        <mesh ref={meshRef} castShadow={false} receiveShadow={false}>
          <torusGeometry args={[0.7, 0.2, 32, 64]} />
          {material}
          <Edges threshold={15} color="#5EEAD4" />
        </mesh>
      )}
    </group>
  );
};

const SceneContainer: React.FC<{
  reducedMotion: boolean;
  isTouch: boolean;
  mousePos: { x: number; y: number };
}> = ({ reducedMotion, isTouch, mousePos }) => {
  return (
    <>
      {/* Procedural lighting ONLY: no remote HDRI files (zero network fetches) */}
      <Environment resolution={256}>
        {/* Key lightformer top-left */}
        <Lightformer
          form="rect"
          intensity={2.8}
          position={[-6, 5, -2]}
          scale={[12, 6, 1]}
          color="#D7E2EA"
        />
        {/* Fill lightformer right */}
        <Lightformer
          form="rect"
          intensity={2.0}
          position={[6, -3, 2]}
          scale={[8, 5, 1]}
          color="#8AA2FF"
        />
        {/* Overhead soft lightformer */}
        <Lightformer
          form="ring"
          intensity={2.2}
          position={[0, 6, 0]}
          scale={6}
          color="#FFFFFF"
        />
        {/* Rim accent lightformer */}
        <Lightformer
          form="circle"
          intensity={3.2}
          position={[0, -5, -4]}
          scale={7}
          color="#5EEAD4"
        />
      </Environment>

      {/* Soft mint rim light */}
      <directionalLight position={[0, 4, -6]} intensity={1.8} color="#5EEAD4" />

      {/* Subtle key and ambient fill */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#E6FFFA" />

      {/* The 4 clean shapes placed with 12% corner insets */}
      {CORNER_CONFIGS.map((cfg) => (
        <CornerMesh
          key={cfg.corner}
          config={cfg}
          reducedMotion={reducedMotion}
          isTouch={isTouch}
          mousePos={mousePos}
        />
      ))}
    </>
  );
};

export const AboutObjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Detect reduced motion
    const rmQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(rmQuery.matches);
    const rmHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    rmQuery.addEventListener('change', rmHandler);

    // Detect touch device
    const checkTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(checkTouch);

    // Pause rendering when section is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.02 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Mouse tracking for cursor lean (only active on non-touch devices)
    const handleMouseMove = (e: MouseEvent) => {
      if (checkTouch) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      rmQuery.removeEventListener('change', rmHandler);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {isVisible && (
        <Canvas
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          camera={{ position: [0, 0, 8.5], fov: 42 }}
          dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
          frameloop={reducedMotion ? 'demand' : 'always'}
          className="pointer-events-none w-full h-full"
          style={{ pointerEvents: 'none', background: 'transparent' }}
        >
          <SceneContainer
            reducedMotion={reducedMotion}
            isTouch={isTouch}
            mousePos={mousePos}
          />
        </Canvas>
      )}
    </div>
  );
};
