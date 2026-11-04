import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface LivePortraitProps {
  cursor: { x: number; y: number };
  isTouch: boolean;
  reducedMotion: boolean;
  isClicked: boolean;
  onPointerDown?: () => void;
}

// -------------------------------------------------------------
// Interactive 3D Avatar Shaders (Butter-Smooth Normals, True Depth, Dynamic Lighting)
// -------------------------------------------------------------
const avatarVertexShader = `
  uniform sampler2D uDepthMap;
  uniform float uHasDepth;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec3 pos = position;
    if (uHasDepth > 0.5) {
      float depthVal = texture2D(uDepthMap, uv).r;
      // High-impact 3D depth displacement: nose, brow, and hair pop forward
      pos.z += depthVal * 0.38;
    }
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const avatarFragmentShader = `
  uniform sampler2D uTexture;
  uniform sampler2D uDepthMap;
  uniform float uHasDepth;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uCursor;
  uniform float uCursorVelocity;
  uniform float uHover;
  uniform float uBlink;

  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vec2 uv = vUv;

    // 1. Stereoscopic Micro-Parallax from depth relief
    vec2 sampleUv = uv;
    float depthVal = 0.5;
    if (uHasDepth > 0.5) {
      depthVal = texture2D(uDepthMap, uv).r;
      sampleUv += uCursor * (depthVal - 0.5) * 0.032;
    }

    // Velocity chromatic aberration (subtle, reacts to quick cursor flick)
    float chromOffset = (clamp(uCursorVelocity, 0.0, 1.0) * 1.6) / uResolution.x;
    float r = texture2D(uTexture, sampleUv - vec2(chromOffset, 0.0)).r;
    float g = texture2D(uTexture, sampleUv).g;
    float b = texture2D(uTexture, sampleUv + vec2(chromOffset, 0.0)).b;
    float a = texture2D(uTexture, sampleUv).a;

    // Alpha cutoff
    if (a < 0.02) {
      discard;
    }

    vec3 color = vec3(r, g, b);

    // 2. Interactive Dynamic 3D Cursor Lighting (Smooth Central Differences, Warm Golden Illumination)
    if (uHasDepth > 0.5) {
      float eps = 0.008; // 8px central difference eliminates discrete quantization ridges
      float dR = texture2D(uDepthMap, sampleUv + vec2(eps, 0.0)).r;
      float dL = texture2D(uDepthMap, sampleUv - vec2(eps, 0.0)).r;
      float dU = texture2D(uDepthMap, sampleUv + vec2(0.0, eps)).r;
      float dD = texture2D(uDepthMap, sampleUv - vec2(0.0, eps)).r;
      vec3 norm = normalize(vec3((dL - dR) * 12.0, (dD - dU) * 12.0, 1.0));

      // 3D Cursor light position in front of face
      vec3 lightPos = vec3(uCursor.x * 2.8, uCursor.y * 2.4 + 0.5, 2.4);
      vec3 pixelPos = vec3((sampleUv.x - 0.5) * 4.0, (sampleUv.y - 0.5) * 4.0, depthVal * 0.32);
      vec3 toLight = normalize(lightPos - pixelPos);

      // Diffuse light response
      float diff = max(dot(norm, toLight), 0.0);

      // Specular sheen on sculpted hair and cheekbones
      vec3 viewDir = vec3(0.0, 0.0, 1.0);
      vec3 halfVec = normalize(toLight + viewDir);
      float spec = pow(max(dot(norm, halfVec), 0.0), 24.0) * depthVal;

      // Warm dynamic key light shimmer (natural golden illumination, zero green)
      color += vec3(1.0, 0.94, 0.86) * (diff * 0.08 + spec * 0.14);

      // Warm golden rim highlight (matching hair rim in photo)
      float rim = pow(clamp(1.0 - dot(norm, viewDir), 0.0, 1.0), 3.0) * depthVal;
      color += vec3(1.0, 0.88, 0.72) * (rim * (0.08 + uHover * 0.12));
    }

    // 3. Living Natural Blink Animation (eyelid descends over eye socket)
    if (uBlink > 0.005) {
      // Left Eye: center (0.411, 0.463), radii (0.044, 0.021)
      vec2 leftEyeCenter = vec2(0.411, 0.463);
      vec2 leftEyeRadii = vec2(0.044, 0.021);
      vec2 leftNorm = (sampleUv - leftEyeCenter) / leftEyeRadii;
      if (dot(leftNorm, leftNorm) < 1.0) {
        float lidY = 1.0 - uBlink * 2.0;
        if (leftNorm.y > lidY) {
          vec3 skinCol = texture2D(uTexture, vec2(sampleUv.x, leftEyeCenter.y + leftEyeRadii.y * 1.15)).rgb;
          float crease = smoothstep(0.0, 0.18, leftNorm.y - lidY);
          color = mix(skinCol * 0.55, skinCol, crease);
        }
      }

      // Right Eye: center (0.579, 0.436), radii (0.044, 0.021)
      vec2 rightEyeCenter = vec2(0.579, 0.436);
      vec2 rightEyeRadii = vec2(0.044, 0.021);
      vec2 rightNorm = (sampleUv - rightEyeCenter) / rightEyeRadii;
      if (dot(rightNorm, rightNorm) < 1.0) {
        float lidY = 1.0 - uBlink * 2.0;
        if (rightNorm.y > lidY) {
          vec3 skinCol = texture2D(uTexture, vec2(sampleUv.x, rightEyeCenter.y + rightEyeRadii.y * 1.15)).rgb;
          float crease = smoothstep(0.0, 0.18, rightNorm.y - lidY);
          color = mix(skinCol * 0.55, skinCol, crease);
        }
      }
    }

    // 4. Feather bottom edge seamlessly into #0C0C0C background
    float bottomFeather = smoothstep(0.03, 0.18, uv.y);
    float finalAlpha = a * bottomFeather;

    gl_FragColor = vec4(color, finalAlpha);
  }
`;

// -------------------------------------------------------------
// Main LivePortrait Component
// -------------------------------------------------------------
export const LivePortrait: React.FC<LivePortraitProps> = ({
  cursor,
  isTouch,
  reducedMotion,
  isClicked,
  onPointerDown,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const clickAnimRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  // Velocity tracking
  const prevCursorRef = useRef({ x: 0, y: 0 });
  const smoothedVelRef = useRef(0);

  // Natural Blink State Machine
  const nextBlinkTimeRef = useRef(3.5);
  const blinkStateRef = useRef({ isBlinking: false, startTime: 0, duration: 0.18, value: 0 });

  // Load portrait texture (Satvik's 3D avatar)
  const portraitUrl = `${import.meta.env.BASE_URL}portrait.png`;
  const texture = useLoader(THREE.TextureLoader, portraitUrl);
  useMemo(() => {
    if (texture) {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
    }
  }, [texture]);

  // Load depth map
  const [depthTexture, setDepthTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      `${import.meta.env.BASE_URL}portrait-depth.png`,
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        setDepthTexture(tex);
      },
      undefined,
      () => setDepthTexture(null)
    );
  }, []);

  // Plane geometry: 140x140 segments, scaled compactly so text behind is fully visible
  const planeGeometry = useMemo(() => new THREE.PlaneGeometry(3.6, 3.6, 140, 140), []);

  // Shader uniforms
  const shaderUniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uDepthMap: { value: depthTexture || new THREE.Texture() },
      uHasDepth: { value: depthTexture ? 1.0 : 0.0 },
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1024, 1024) },
      uCursor: { value: new THREE.Vector2(0, 0) },
      uCursorVelocity: { value: 0 },
      uHover: { value: 0 },
      uBlink: { value: 0 },
    }),
    [texture, depthTexture]
  );

  // Click bounce trigger
  useEffect(() => {
    if (isClicked) clickAnimRef.current = 1.0;
  }, [isClicked]);

  // Animation and physics frame loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Calculate cursor velocity
    const dx = cursor.x - prevCursorRef.current.x;
    const dy = cursor.y - prevCursorRef.current.y;
    prevCursorRef.current = { x: cursor.x, y: cursor.y };
    const instantVel = Math.min(1.0, Math.hypot(dx, dy) * 14.0);
    smoothedVelRef.current = THREE.MathUtils.lerp(smoothedVelRef.current, instantVel, delta * 7);

    // 2. Natural Eye Blink Animation (every 4-6.5 seconds)
    const blink = blinkStateRef.current;
    if (!blink.isBlinking && time > nextBlinkTimeRef.current) {
      blink.isBlinking = true;
      blink.startTime = time;
      blink.duration = 0.18 + Math.random() * 0.04;
      nextBlinkTimeRef.current = time + 4.0 + Math.random() * 2.5;
    }

    if (blink.isBlinking) {
      const elapsed = time - blink.startTime;
      if (elapsed >= blink.duration) {
        blink.isBlinking = false;
        blink.value = 0;
      } else {
        blink.value = Math.sin((elapsed / blink.duration) * Math.PI);
      }
    }

    // 3. Update custom shader uniforms
    shaderUniforms.uTime.value = time;
    shaderUniforms.uCursor.value.set(cursor.x, cursor.y);
    shaderUniforms.uCursorVelocity.value = smoothedVelRef.current;
    shaderUniforms.uHover.value = THREE.MathUtils.lerp(
      shaderUniforms.uHover.value,
      isHovered ? 1.0 : 0.0,
      delta * 5
    );
    shaderUniforms.uBlink.value = blink.value;

    if (depthTexture) {
      shaderUniforms.uDepthMap.value = depthTexture;
      shaderUniforms.uHasDepth.value = 1.0;
    }

    if (reducedMotion) return;

    // 4. Idle breathing float + bounce
    const breathY = Math.sin(time * 1.8) * 0.035;
    const idleSway = Math.sin(time * 1.1) * 0.01;

    if (clickAnimRef.current > 0.001) {
      clickAnimRef.current = THREE.MathUtils.lerp(clickAnimRef.current, 0, delta * 7);
    }
    const bounceY = Math.sin(clickAnimRef.current * Math.PI) * 0.16;

    groupRef.current.position.y = breathY + bounceY - 0.44;

    // 5. Dynamic 3D Cursor Tilt Parallax (Yaw: ~20 deg, Pitch: ~12 deg)
    if (!isTouch) {
      const targetYaw = cursor.x * 0.35; // ~20 degrees
      const targetPitch = -cursor.y * 0.21; // ~12 degrees
      const targetRoll = -cursor.x * 0.04 + idleSway; // natural head tilt

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetYaw,
        delta * 6
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetPitch,
        delta * 6
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetRoll,
        delta * 6
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      position={[0, -0.44, 0.2]}
      renderOrder={1}
    >
      {/* Main Interactive 3D Mesh with True Depth Relief Displacement */}
      <mesh geometry={planeGeometry}>
        <shaderMaterial
          vertexShader={avatarVertexShader}
          fragmentShader={avatarFragmentShader}
          uniforms={shaderUniforms}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={true}
        />
      </mesh>
    </group>
  );
};
