import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { AvatarConfig } from '../../data/avatar';
import { ToonHead } from './ToonHead';
import { LivePortrait } from './LivePortrait';

interface AvatarCanvasProps {
  config: AvatarConfig;
  className?: string;
}

// Mint Wireframe Icosahedron Halo strictly for ToonHead (?toon=1)
const ToonHalo: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !haloRef.current) return;
    haloRef.current.rotation.y += delta * 0.25;
    haloRef.current.rotation.x += delta * 0.15;
  });

  return (
    <mesh ref={haloRef} position={[0, 0.2, -0.7]} scale={1.8} renderOrder={0}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#5EEAD4"
        wireframe
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </mesh>
  );
};

// GLB Fallback if /public/face.glb is supplied
const GLBHead: React.FC<{
  cursor: { x: number; y: number };
  isTouch: boolean;
  reducedMotion: boolean;
}> = ({ cursor, isTouch, reducedMotion }) => {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}face.glb`);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion || isTouch || !groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      cursor.x * 0.35,
      delta * 6
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -cursor.y * 0.22,
      delta * 6
    );
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} scale={1.2}>
      <primitive object={scene} />
    </group>
  );
};

export const AvatarCanvas: React.FC<AvatarCanvasProps> = ({ config, className = '' }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hasGLB, setHasGLB] = useState<boolean>(false);
  const [useToon, setUseToon] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouch(isTouchDevice);
    setReducedMotion(isReduced);

    // Routing: Default is Satvik's interactive 3D avatar bust.
    // ?toon=1 forces procedural cartoon ToonHead.
    const params = new URLSearchParams(window.location.search);
    setUseToon(params.get('toon') === '1');

    // Verify if face.glb exists and is an actual binary model, not HTML SPA fallback
    fetch(`${import.meta.env.BASE_URL}face.glb`, { method: 'HEAD' })
      .then((res) => {
        const ct = res.headers.get('content-type') || '';
        if (res.ok && !ct.includes('text/html')) {
          setHasGLB(true);
        } else {
          setHasGLB(false);
        }
      })
      .catch(() => setHasGLB(false));

    // IntersectionObserver to pause rendering when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      setCursor({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`relative w-full h-full cursor-pointer select-none overflow-visible ${className}`}
      title="Satvik"
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 42 }}
          dpr={Math.min(window.devicePixelRatio || 1, 2)}
          frameloop={reducedMotion ? 'demand' : 'always'}
          className="w-full h-full overflow-visible pointer-events-auto"
          gl={{ alpha: true, antialias: true }}
        >
          {/* Lighting for 3D elements */}
          <ambientLight intensity={0.75} />
          <directionalLight
            position={[-1.5, 1.8, 3.8]}
            intensity={0.8}
            color="#FFF4EB"
          />
          <directionalLight
            position={[1.5, 1.2, 3.5]}
            intensity={0.4}
            color="#EAF2FA"
          />

          {/* If Toon mode, show Toon Halo */}
          {useToon && <ToonHalo reducedMotion={reducedMotion} />}

          {/* Main Avatar Flow:
              1. /public/face.glb if exists
              2. <ToonHead /> if ?toon=1
              3. <LivePortrait /> (DEFAULT: Satvik's interactive 3D avatar bust)
          */}
          {hasGLB ? (
            <GLBHead
              cursor={cursor}
              isTouch={isTouch}
              reducedMotion={reducedMotion}
            />
          ) : useToon ? (
            <ToonHead
              config={config}
              cursor={cursor}
              isTouch={isTouch}
              reducedMotion={reducedMotion}
              isClicked={isClicked}
              onPointerDown={handleClick}
            />
          ) : (
            <LivePortrait
              cursor={cursor}
              isTouch={isTouch}
              reducedMotion={reducedMotion}
              isClicked={isClicked}
              onPointerDown={handleClick}
            />
          )}
        </Canvas>
      )}
    </div>
  );
};
