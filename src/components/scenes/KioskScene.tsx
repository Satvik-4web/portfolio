import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

const IsometricCampusMesh: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={groupRef} rotation={[0.5, 0.4, 0]}>
      {/* Central campus building pavilion */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 1, 1.4]} />
        <meshStandardMaterial
          color="#5EEAD4"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Adjacent Quad Wing */}
      <mesh position={[1.4, -0.2, 0.5]}>
        <boxGeometry args={[1.2, 0.6, 0.9]} />
        <meshStandardMaterial
          color="#8AA2FF"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Innovation ELC Tower */}
      <mesh position={[-1.2, 0.4, -0.4]}>
        <cylinderGeometry args={[0.4, 0.5, 1.8, 8]} />
        <meshStandardMaterial
          color="#F5C26B"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Spatial Ground Grid Ring */}
      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.4, 24]} />
        <meshBasicMaterial color="#5EEAD4" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export const KioskScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] p-6 sm:p-8 flex flex-col justify-between bg-[#11161D]/90 border border-[#1E2733] rounded-[40px] overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#1E2733]/80 pb-3 font-mono text-xs text-[#D7E2EA]/70 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
          <span className="text-[#5EEAD4]">CAMPUS DIGITAL TWIN // AR KIOSK</span>
        </div>
        <span className="text-white/40">TIET ELC FUNDED</span>
      </div>

      {/* Kiosk Display Window with R3F Canvas and Scanline */}
      <div className="relative my-auto h-[220px] sm:h-[240px] w-full rounded-2xl bg-[#090C11] border border-[#1E2733] overflow-hidden flex items-center justify-center">
        {/* Spatial 3D Canvas */}
        {isVisible && (
          <Canvas
            camera={{ position: [0, 1.5, 4.5], fov: 42 }}
            dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
            frameloop={reducedMotion ? 'demand' : 'always'}
            className="w-full h-full"
          >
            <ambientLight intensity={0.9} />
            <directionalLight position={[4, 5, 2]} intensity={1.5} color="#5EEAD4" />
            <IsometricCampusMesh reducedMotion={Boolean(reducedMotion)} />
          </Canvas>
        )}

        {/* Scanline Sweep animation */}
        {!reducedMotion && (
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-[#5EEAD4] shadow-[0_0_15px_#5EEAD4] pointer-events-none z-20"
            animate={{
              top: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* CRT Scanline faint texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) 1px, transparent 1px, transparent 2px)',
          }}
        />

        {/* Floating HUD telemetry */}
        <div className="absolute top-3 left-3 z-30 font-mono text-[9px] text-[#5EEAD4] bg-[#0C0C0C]/80 px-2 py-1 rounded border border-[#5EEAD4]/30 backdrop-blur">
          WAYPOINT: ELC_CENTRAL_QUAD
        </div>
        <div className="absolute bottom-3 right-3 z-30 font-mono text-[9px] text-white/50 bg-[#0C0C0C]/80 px-2 py-1 rounded border border-white/20 backdrop-blur">
          SCALE: 1:1 GEOMETRY STREAM
        </div>
      </div>

      {/* Footer bar */}
      <div className="pt-3 border-t border-[#1E2733]/80 flex items-center justify-between font-mono text-[10px] text-[#D7E2EA]/60 z-10">
        <span className="text-white/40">INTERACTIVE TOUCH ERGONOMICS</span>
        <span className="text-[#5EEAD4]">ZERO-INSTALL WEBGL</span>
      </div>
    </div>
  );
};
