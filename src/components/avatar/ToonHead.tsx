import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import * as THREE from 'three';
import { AvatarConfig } from '../../data/avatar';

interface ToonHeadProps {
  config: AvatarConfig;
  cursor: { x: number; y: number };
  isTouch: boolean;
  reducedMotion: boolean;
  isClicked: boolean;
  onPointerDown?: () => void;
}

export const ToonHead: React.FC<ToonHeadProps> = ({
  config,
  cursor,
  isTouch,
  reducedMotion,
  isClicked,
  onPointerDown,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const eyesGroupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);
  const leftEyebrowRef = useRef<THREE.Group>(null);
  const rightEyebrowRef = useRef<THREE.Group>(null);
  const mouthRef = useRef<THREE.Group>(null);

  // 3-Tone Gradient Map for Toon Shading (Dark shadow, warm mid-tone, clean highlight)
  const toonGradient = useMemo(() => {
    const colors = new Uint8Array([85, 180, 255]);
    const texture = new THREE.DataTexture(colors, 3, 1, THREE.RedFormat);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Shared Toon Materials
  const skinMaterial = useMemo(
    () =>
      new THREE.MeshToonMaterial({
        color: config.skinTone,
        gradientMap: toonGradient,
      }),
    [config.skinTone, toonGradient]
  );

  const hairMaterial = useMemo(
    () =>
      new THREE.MeshToonMaterial({
        color: config.hairColor,
        gradientMap: toonGradient,
      }),
    [config.hairColor, toonGradient]
  );

  const hairSideMaterial = useMemo(
    () =>
      new THREE.MeshToonMaterial({
        color: new THREE.Color(config.hairColor).multiplyScalar(0.75),
        gradientMap: toonGradient,
      }),
    [config.hairColor, toonGradient]
  );

  const shirtMaterial = useMemo(
    () =>
      new THREE.MeshToonMaterial({
        color: config.shirtColor,
        gradientMap: toonGradient,
      }),
    [config.shirtColor, toonGradient]
  );

  const eyebrowMaterial = useMemo(
    () =>
      new THREE.MeshToonMaterial({
        color: config.eyebrowColor,
        gradientMap: toonGradient,
      }),
    [config.eyebrowColor, toonGradient]
  );

  const glassesMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: config.glasses.frameColor,
        roughness: 0.2,
        metalness: 0.8,
      }),
    [config.glasses.frameColor]
  );

  const lensMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#E0F2FE',
        transmission: 0.85,
        opacity: 0.35,
        transparent: true,
        roughness: 0.05,
        ior: 1.5,
      }),
    []
  );

  // Blinking Logic: Every 3 to 5 seconds randomly
  const [blinkScale, setBlinkScale] = useState(1);
  useEffect(() => {
    if (reducedMotion) return;
    let timer: NodeJS.Timeout;

    const triggerBlink = () => {
      setBlinkScale(0.08); // Eyes shut
      setTimeout(() => {
        setBlinkScale(1); // Eyes open
        const nextInterval = 3000 + Math.random() * 2500;
        timer = setTimeout(triggerBlink, nextInterval);
      }, 130);
    };

    const initialInterval = 2800 + Math.random() * 2000;
    timer = setTimeout(triggerBlink, initialInterval);

    return () => clearTimeout(timer);
  }, [reducedMotion]);

  // Click bounce & eyebrow wave state
  const clickAnimRef = useRef(0);
  useEffect(() => {
    if (isClicked) {
      clickAnimRef.current = 1.0;
    }
  }, [isClicked]);

  // Per-frame Animation
  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // 1. Idle breathing & gentle float
    const breathFloat = Math.sin(time * 2.0) * 0.035;
    const idleSway = Math.sin(time * 1.4) * 0.015;

    // Decay click bounce
    if (clickAnimRef.current > 0.001) {
      clickAnimRef.current = THREE.MathUtils.lerp(clickAnimRef.current, 0, delta * 7);
    }
    const bounceY = Math.sin(clickAnimRef.current * Math.PI) * 0.14;

    if (rootGroupRef.current) {
      rootGroupRef.current.position.y = breathFloat + bounceY - 0.55;
      rootGroupRef.current.rotation.z = idleSway;
    }

    // 2. Cursor follow for Head (yaw max ~18 deg = 0.31 rad, pitch max ~12 deg = 0.21 rad)
    if (!isTouch && headGroupRef.current) {
      const targetYaw = cursor.x * 0.31;
      const targetPitch = -cursor.y * 0.21;

      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        targetYaw,
        delta * 6
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        targetPitch,
        delta * 6
      );
    }

    // 3. Eyes follow cursor slightly more than the head
    if (!isTouch && eyesGroupRef.current) {
      const eyeTargetX = cursor.x * 0.06;
      const eyeTargetY = cursor.y * 0.045;
      eyesGroupRef.current.position.x = THREE.MathUtils.lerp(
        eyesGroupRef.current.position.x,
        eyeTargetX,
        delta * 8
      );
      eyesGroupRef.current.position.y = THREE.MathUtils.lerp(
        eyesGroupRef.current.position.y,
        eyeTargetY,
        delta * 8
      );
    }

    // 4. Eyebrows wave on click
    const waveY = clickAnimRef.current * 0.07;
    if (leftEyebrowRef.current && rightEyebrowRef.current) {
      leftEyebrowRef.current.position.y = 0.38 + waveY;
      rightEyebrowRef.current.position.y = 0.38 + waveY;
    }

    // 5. Gentle periodic smile pulse
    if (mouthRef.current) {
      const smilePulse = Math.sin(time * 1.8) * 0.04;
      mouthRef.current.scale.set(1 + smilePulse, 1 + smilePulse, 1);
    }
  });

  // Calculate face proportions from faceShape config
  const faceProportions = useMemo(() => {
    switch (config.faceShape) {
      case 'round':
        return { width: 1.05 * config.jawWidth, height: 1.02, depth: 1.02 * config.cheekFullness };
      case 'square':
        return { width: 1.08 * config.jawWidth, height: 1.05, depth: 0.98 * config.cheekFullness };
      case 'oval':
      default:
        return { width: 0.98 * config.jawWidth, height: 1.12, depth: 0.95 * config.cheekFullness };
    }
  }, [config.faceShape, config.jawWidth, config.cheekFullness]);

  // Render Hair Geometry based on config.hairStyle
  const renderHair = () => {
    const hairY = 0.38 * config.hairlineHeight;

    switch (config.hairStyle) {
      case 'buzz':
        return (
          <group position={[0, hairY, -0.05]}>
            <mesh scale={[0.96 * faceProportions.width, 0.98 * faceProportions.height, 0.96 * faceProportions.depth]}>
              <sphereGeometry args={[1, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
              <primitive object={hairMaterial} attach="material" />
              <Outlines thickness={0.02} color="#05080C" />
            </mesh>
          </group>
        );

      case 'short':
        return (
          <group position={[0, hairY, 0]}>
            {/* Top crown */}
            <mesh position={[0, 0.45, -0.05]} scale={[0.98, 0.65, 0.98]}>
              <sphereGeometry args={[0.92, 24, 24]} />
              <primitive object={hairMaterial} attach="material" />
              <Outlines thickness={0.022} color="#05080C" />
            </mesh>
            {/* Side tapers */}
            <mesh position={[-0.85, 0.15, -0.05]} scale={[0.2, 0.5, 0.8]}>
              <sphereGeometry args={[0.8, 16, 16]} />
              <primitive object={hairSideMaterial} attach="material" />
            </mesh>
            <mesh position={[0.85, 0.15, -0.05]} scale={[0.2, 0.5, 0.8]}>
              <sphereGeometry args={[0.8, 16, 16]} />
              <primitive object={hairSideMaterial} attach="material" />
            </mesh>
            {/* Front fringe */}
            <mesh position={[0, 0.6, 0.42]} rotation={[0.2, 0, 0]} scale={[0.65, 0.25, 0.35]}>
              <capsuleGeometry args={[0.25, 0.5, 8, 16]} />
              <primitive object={hairMaterial} attach="material" />
              <Outlines thickness={0.02} color="#05080C" />
            </mesh>
          </group>
        );

      case 'quiff':
        return (
          <group position={[0, hairY, 0]}>
            {/* Main sculpted crown volume */}
            <mesh position={[0, 0.42, -0.05]} scale={[0.96, 0.68, 0.96]}>
              <sphereGeometry args={[0.92, 24, 24]} />
              <primitive object={hairMaterial} attach="material" />
              <Outlines thickness={0.024} color="#05080C" />
            </mesh>
            {/* Tapered sides (Fade) */}
            <mesh position={[-0.82, 0.15, -0.05]} scale={[0.22, 0.48, 0.75]}>
              <sphereGeometry args={[0.8, 16, 16]} />
              <primitive object={hairSideMaterial} attach="material" />
            </mesh>
            <mesh position={[0.82, 0.15, -0.05]} scale={[0.22, 0.48, 0.75]}>
              <sphereGeometry args={[0.8, 16, 16]} />
              <primitive object={hairSideMaterial} attach="material" />
            </mesh>
            {/* Signature Swept Quiff Lock: swoops up and back */}
            <mesh
              position={[0.06, 0.78, 0.32]}
              rotation={[-0.38, 0.22, -0.15]}
              scale={[0.55, 0.38, 0.75]}
            >
              <coneGeometry args={[0.62, 1.1, 16]} />
              <primitive object={hairMaterial} attach="material" />
              <Outlines thickness={0.024} color="#05080C" />
            </mesh>
            {/* Secondary front volume lock */}
            <mesh
              position={[-0.22, 0.68, 0.35]}
              rotation={[-0.25, -0.15, 0.18]}
              scale={[0.42, 0.3, 0.55]}
            >
              <sphereGeometry args={[0.5, 16, 16]} />
              <primitive object={hairMaterial} attach="material" />
              <Outlines thickness={0.02} color="#05080C" />
            </mesh>
          </group>
        );

      case 'curly':
        return (
          <group position={[0, hairY + 0.08, -0.05]}>
            {[
              [0, 0.68, 0.2, 0.32],
              [-0.35, 0.62, 0.25, 0.28],
              [0.35, 0.64, 0.22, 0.28],
              [-0.55, 0.42, 0.1, 0.26],
              [0.55, 0.42, 0.1, 0.26],
              [-0.22, 0.76, -0.1, 0.3],
              [0.24, 0.74, -0.12, 0.3],
              [0, 0.72, -0.32, 0.32],
              [-0.4, 0.46, -0.28, 0.28],
              [0.4, 0.46, -0.28, 0.28],
            ].map(([x, y, z, r], i) => (
              <mesh key={i} position={[x, y, z]}>
                <sphereGeometry args={[r, 16, 16]} />
                <primitive object={hairMaterial} attach="material" />
                <Outlines thickness={0.02} color="#05080C" />
              </mesh>
            ))}
          </group>
        );

      case 'long':
        return (
          <group position={[0, hairY, -0.05]}>
            <mesh position={[0, 0.42, 0]} scale={[0.98, 0.68, 0.98]}>
              <sphereGeometry args={[0.9, 24, 24]} />
              <primitive object={hairMaterial} attach="material" />
              <Outlines thickness={0.024} color="#05080C" />
            </mesh>
            <mesh position={[-0.78, -0.15, 0]} rotation={[0, 0, 0.12]} scale={[0.28, 0.9, 0.42]}>
              <capsuleGeometry args={[0.26, 0.7, 8, 16]} />
              <primitive object={hairMaterial} attach="material" />
              <Outlines thickness={0.02} color="#05080C" />
            </mesh>
            <mesh position={[0.78, -0.15, 0]} rotation={[0, 0, -0.12]} scale={[0.28, 0.9, 0.42]}>
              <capsuleGeometry args={[0.26, 0.7, 8, 16]} />
              <primitive object={hairMaterial} attach="material" />
              <Outlines thickness={0.02} color="#05080C" />
            </mesh>
          </group>
        );

      case 'bald':
      default:
        return null;
    }
  };

  // Render Beard cleanly without covering the mouth
  const renderBeard = () => {
    if (config.beard.style === 'none') return null;

    const beardMaterial = new THREE.MeshToonMaterial({
      color: config.beard.color,
      gradientMap: toonGradient,
    });

    if (config.beard.style === 'stubble') {
      return (
        <group position={[0, -0.48, 0.28]}>
          {/* Subtle chin strap contour */}
          <mesh scale={[0.82 * faceProportions.width, 0.25, 0.72]}>
            <torusGeometry args={[0.52, 0.055, 12, 24, Math.PI]} />
            <primitive object={beardMaterial} attach="material" />
            <Outlines thickness={0.015} color="#05080C" />
          </mesh>
        </group>
      );
    }

    if (config.beard.style === 'short' || config.beard.style === 'full') {
      const isFull = config.beard.style === 'full';
      return (
        <group position={[0, -0.48, 0.35]}>
          {/* Chin goatee patch */}
          <mesh position={[0, -0.1, 0.28]} scale={[0.32 * (isFull ? 1.4 : 1), isFull ? 0.28 : 0.18, 0.2]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <primitive object={beardMaterial} attach="material" />
            <Outlines thickness={0.02} color="#05080C" />
          </mesh>
          {/* Trimmed mustache */}
          <mesh position={[0, 0.14, 0.44]} scale={[0.28, 0.06, 0.12]}>
            <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
            <primitive object={beardMaterial} attach="material" />
            <Outlines thickness={0.018} color="#05080C" />
          </mesh>
        </group>
      );
    }

    return null;
  };

  // Render Glasses
  const renderGlasses = () => {
    if (!config.glasses.enabled || config.glasses.style === 'none') return null;

    const eyeDistance = 0.34 * config.eyeSpacing;
    const isRound = config.glasses.style === 'round';

    return (
      <group position={[0, 0.12, 0.92]}>
        {/* Bridge */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[eyeDistance * 0.65, 0.035, 0.04]} />
          <primitive object={glassesMaterial} attach="material" />
        </mesh>

        {/* Left Frame */}
        <group position={[-eyeDistance, 0, 0]}>
          <mesh>
            {isRound ? (
              <torusGeometry args={[0.21 * config.eyeSize, 0.025, 16, 32]} />
            ) : (
              <boxGeometry args={[0.42 * config.eyeSize, 0.32 * config.eyeSize, 0.035]} />
            )}
            <primitive object={glassesMaterial} attach="material" />
          </mesh>
          {/* Lens */}
          <mesh position={[0, 0, 0.01]}>
            <circleGeometry args={[0.18 * config.eyeSize, 24]} />
            <primitive object={lensMaterial} attach="material" />
          </mesh>
        </group>

        {/* Right Frame */}
        <group position={[eyeDistance, 0, 0]}>
          <mesh>
            {isRound ? (
              <torusGeometry args={[0.21 * config.eyeSize, 0.025, 16, 32]} />
            ) : (
              <boxGeometry args={[0.42 * config.eyeSize, 0.32 * config.eyeSize, 0.035]} />
            )}
            <primitive object={glassesMaterial} attach="material" />
          </mesh>
          {/* Lens */}
          <mesh position={[0, 0, 0.01]}>
            <circleGeometry args={[0.18 * config.eyeSize, 24]} />
            <primitive object={lensMaterial} attach="material" />
          </mesh>
        </group>

        {/* Temples */}
        <mesh position={[-eyeDistance - 0.22, 0.02, -0.32]} rotation={[0, 0.1, 0]}>
          <boxGeometry args={[0.025, 0.025, 0.65]} />
          <primitive object={glassesMaterial} attach="material" />
        </mesh>
        <mesh position={[eyeDistance + 0.22, 0.02, -0.32]} rotation={[0, -0.1, 0]}>
          <boxGeometry args={[0.025, 0.025, 0.65]} />
          <primitive object={glassesMaterial} attach="material" />
        </mesh>
      </group>
    );
  };

  // Render Optional Accessories
  const renderAccessories = () => {
    if (config.accessories === 'headphones') {
      return (
        <group position={[0, 0.12, -0.05]}>
          {/* Headband arch */}
          <mesh position={[0, 0.88, 0]}>
            <torusGeometry args={[0.98, 0.06, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#1E2733" roughness={0.3} metalness={0.7} />
            <Outlines thickness={0.02} color="#05080C" />
          </mesh>
          {/* Earcups */}
          <mesh position={[-1.05, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.22, 24]} />
            <meshStandardMaterial color="#5EEAD4" roughness={0.2} metalness={0.6} />
            <Outlines thickness={0.02} color="#05080C" />
          </mesh>
          <mesh position={[1.05, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.28, 0.28, 0.22, 24]} />
            <meshStandardMaterial color="#5EEAD4" roughness={0.2} metalness={0.6} />
            <Outlines thickness={0.02} color="#05080C" />
          </mesh>
        </group>
      );
    }
    return null;
  };

  const eyeDistance = 0.32 * config.eyeSpacing;

  return (
    <group
      ref={rootGroupRef}
      onPointerDown={onPointerDown}
      scale={1.12}
      position={[0, -0.55, 0]}
    >
      {/* ================= BODY & SHOULDERS ================= */}
      <group position={[0, -1.25, 0]}>
        {/* Neck */}
        <mesh position={[0, 0.42, -0.05]}>
          <cylinderGeometry args={[0.34, 0.42, 0.52, 24]} />
          <primitive object={skinMaterial} attach="material" />
          <Outlines thickness={0.022} color="#05080C" />
        </mesh>

        {/* Shoulders & Upper Chest */}
        <mesh position={[0, -0.18, -0.05]} scale={[1.85, 0.85, 1.15]}>
          <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
          <primitive object={shirtMaterial} attach="material" />
          <Outlines thickness={0.026} color="#05080C" />
        </mesh>

        {/* Collar Ring */}
        <mesh position={[0, 0.26, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.44, 0.07, 16, 32]} />
          <meshToonMaterial
            color="#222B38"
            gradientMap={toonGradient}
          />
          <Outlines thickness={0.02} color="#05080C" />
        </mesh>
      </group>

      {/* ================= HEAD GROUP ================= */}
      <group ref={headGroupRef} position={[0, 0, 0]}>
        {/* Head Base Mesh */}
        <mesh scale={[faceProportions.width, faceProportions.height, faceProportions.depth]}>
          <sphereGeometry args={[0.95, 32, 32]} />
          <primitive object={skinMaterial} attach="material" />
          <Outlines thickness={0.026} color="#05080C" />
        </mesh>

        {/* Soft Cheeks Blushing */}
        <mesh
          position={[-0.56 * config.jawWidth, -0.06, 0.68]}
          scale={[0.28 * config.cheekFullness, 0.22, 0.28 * config.cheekFullness]}
        >
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#E28D76" transparent opacity={0.3} />
        </mesh>
        <mesh
          position={[0.56 * config.jawWidth, -0.06, 0.68]}
          scale={[0.28 * config.cheekFullness, 0.22, 0.28 * config.cheekFullness]}
        >
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#E28D76" transparent opacity={0.3} />
        </mesh>

        {/* Ears */}
        <mesh
          position={[-0.95 * faceProportions.width, 0.04, -0.05]}
          rotation={[0.1, -0.2, -0.15]}
          scale={[0.18 * config.earSize, 0.32 * config.earSize, 0.24 * config.earSize]}
        >
          <sphereGeometry args={[0.75, 16, 16]} />
          <primitive object={skinMaterial} attach="material" />
          <Outlines thickness={0.02} color="#05080C" />
        </mesh>
        <mesh
          position={[0.95 * faceProportions.width, 0.04, -0.05]}
          rotation={[0.1, 0.2, 0.15]}
          scale={[0.18 * config.earSize, 0.32 * config.earSize, 0.24 * config.earSize]}
        >
          <sphereGeometry args={[0.75, 16, 16]} />
          <primitive object={skinMaterial} attach="material" />
          <Outlines thickness={0.02} color="#05080C" />
        </mesh>

        {/* Nose (Cute stylized button) */}
        <mesh
          position={[0, -0.02, 0.88]}
          rotation={[0.15, 0, 0]}
          scale={[0.14 * config.noseSize, 0.16 * config.noseSize, 0.18 * config.noseSize]}
        >
          <sphereGeometry args={[0.7, 20, 20]} />
          <primitive object={skinMaterial} attach="material" />
          <Outlines thickness={0.018} color="#05080C" />
        </mesh>

        {/* ================= EYES & BROWS ================= */}
        <group ref={eyesGroupRef}>
          {/* Left Eye */}
          <group
            ref={leftEyeRef}
            position={[-eyeDistance, 0.14, 0.82]}
            scale={[1, blinkScale, 1]}
          >
            {/* Eyeball (White Sphere) */}
            <mesh scale={[0.19 * config.eyeSize, 0.21 * config.eyeSize, 0.18]}>
              <sphereGeometry args={[1, 24, 24]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
              <Outlines thickness={0.02} color="#05080C" />
            </mesh>

            {/* Iris */}
            <mesh position={[0.015, 0, 0.14]} scale={[0.11 * config.eyeSize, 0.11 * config.eyeSize, 0.05]}>
              <sphereGeometry args={[1, 24, 24]} />
              <meshBasicMaterial color={config.eyeColor} />
            </mesh>

            {/* Pupil */}
            <mesh position={[0.015, 0, 0.16]} scale={[0.06 * config.eyeSize, 0.06 * config.eyeSize, 0.04]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color="#0A0708" />
            </mesh>

            {/* Primary Specular Highlight */}
            <mesh position={[0.045, 0.045, 0.17]} scale={0.038 * config.eyeSize}>
              <sphereGeometry args={[1, 12, 12]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>

            {/* Secondary Tiny Highlight */}
            <mesh position={[-0.025, -0.025, 0.17]} scale={0.02 * config.eyeSize}>
              <sphereGeometry args={[1, 10, 10]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>

          {/* Right Eye */}
          <group
            ref={rightEyeRef}
            position={[eyeDistance, 0.14, 0.82]}
            scale={[1, blinkScale, 1]}
          >
            {/* Eyeball (White Sphere) */}
            <mesh scale={[0.19 * config.eyeSize, 0.21 * config.eyeSize, 0.18]}>
              <sphereGeometry args={[1, 24, 24]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
              <Outlines thickness={0.02} color="#05080C" />
            </mesh>

            {/* Iris */}
            <mesh position={[-0.015, 0, 0.14]} scale={[0.11 * config.eyeSize, 0.11 * config.eyeSize, 0.05]}>
              <sphereGeometry args={[1, 24, 24]} />
              <meshBasicMaterial color={config.eyeColor} />
            </mesh>

            {/* Pupil */}
            <mesh position={[-0.015, 0, 0.16]} scale={[0.06 * config.eyeSize, 0.06 * config.eyeSize, 0.04]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color="#0A0708" />
            </mesh>

            {/* Primary Specular Highlight */}
            <mesh position={[0.015, 0.045, 0.17]} scale={0.038 * config.eyeSize}>
              <sphereGeometry args={[1, 12, 12]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>

            {/* Secondary Tiny Highlight */}
            <mesh position={[-0.045, -0.025, 0.17]} scale={0.02 * config.eyeSize}>
              <sphereGeometry args={[1, 10, 10]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>
        </group>

        {/* Eyebrows (Capsules, friendly confident tilt) */}
        <group
          ref={leftEyebrowRef}
          position={[-eyeDistance, 0.38, 0.82]}
          rotation={[0.05, 0.08, 0.08]}
          scale={[0.28, 0.065 * config.eyebrowThickness, 0.08]}
        >
          <capsuleGeometry args={[0.5, 0.6, 8, 16]} />
          <primitive object={eyebrowMaterial} attach="material" />
          <Outlines thickness={0.018} color="#05080C" />
        </group>

        <group
          ref={rightEyebrowRef}
          position={[eyeDistance, 0.38, 0.82]}
          rotation={[0.05, -0.08, -0.08]}
          scale={[0.28, 0.065 * config.eyebrowThickness, 0.08]}
        >
          <capsuleGeometry args={[0.5, 0.6, 8, 16]} />
          <primitive object={eyebrowMaterial} attach="material" />
          <Outlines thickness={0.018} color="#05080C" />
        </group>

        {/* ================= MOUTH / SMILE ================= */}
        {/* Clean, charming curved smile line with subtle white teeth reveal */}
        <group ref={mouthRef} position={[0, -0.26, 0.82]}>
          {/* Smile Lip Curve */}
          <mesh
            rotation={[Math.PI * 0.88, 0, 0]}
            scale={[0.82 * config.mouthWidth, 0.75, 1]}
          >
            <torusGeometry
              args={[
                0.16,
                0.022,
                16,
                32,
                Math.PI * (0.65 + config.smileAmount * 0.35),
              ]}
            />
            <meshToonMaterial
              color="#542024"
              gradientMap={toonGradient}
            />
            <Outlines thickness={0.016} color="#05080C" />
          </mesh>

          {/* Friendly subtle white teeth strip inside smile */}
          <mesh position={[0, -0.015, 0.01]} scale={[0.18 * config.mouthWidth, 0.045, 0.02]}>
            <capsuleGeometry args={[0.5, 0.6, 6, 12]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* Hair */}
        {renderHair()}

        {/* Beard */}
        {renderBeard()}

        {/* Glasses */}
        {renderGlasses()}

        {/* Accessories */}
        {renderAccessories()}
      </group>
    </group>
  );
};
