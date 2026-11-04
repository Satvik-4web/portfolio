import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Crosshair, Satellite } from 'lucide-react';

export const SceneNavScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ lat: 30.3534, lon: 76.3619, alt: 420.5 });
  const [driftError, setDriftError] = useState(1.8);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Update telemetry coordinates slightly to simulate live flight navigation
  useEffect(() => {
    if (!isVisible || reducedMotion) return;
    const interval = setInterval(() => {
      setCoords((prev) => ({
        lat: Number((prev.lat + (Math.random() * 0.0004 - 0.0002)).toFixed(4)),
        lon: Number((prev.lon + (Math.random() * 0.0004 - 0.0002)).toFixed(4)),
        alt: Number((420 + Math.sin(Date.now() / 2000) * 8).toFixed(1)),
      }));
      setDriftError(Number((1.2 + Math.random() * 0.8).toFixed(2)));
    }, 1200);
    return () => clearInterval(interval);
  }, [isVisible, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] p-6 sm:p-8 flex flex-col justify-between bg-[#11161D]/90 border border-[#1E2733] rounded-[40px] overflow-hidden select-none font-mono"
    >
      {/* Top Header telemetry */}
      <div className="flex items-center justify-between border-b border-[#1E2733]/80 pb-3 text-xs text-[#D7E2EA]/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
          <span className="text-[#5EEAD4]">SCENENAV // GPS-DENIED SAN PIPELINE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#FB7185] bg-[#FB7185]/10 px-2 py-0.5 rounded border border-[#FB7185]/30 text-[10px]">
            GPS SIGNAL: JAMMED / 0 SATS
          </span>
          <span className="text-white/40">DRDO DIA-CoEs ALIGNMENT</span>
        </div>
      </div>

      {/* Center Visual Radar / Camera Viewport */}
      <div className="relative my-3 h-44 rounded-2xl bg-[#090D14] border border-[#1E2733] overflow-hidden flex items-center justify-center">
        {/* Terrain Orthoimagery Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(#5EEAD4 1px, transparent 1px), linear-gradient(90deg, #5EEAD4 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Sweep Scan Line */}
        {!reducedMotion && (
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5EEAD4] to-transparent shadow-[0_0_12px_#5EEAD4] z-10"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Simulated CNN Keypoint Detections */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: '25%', left: '30%', label: 'PT-01' },
            { top: '65%', left: '20%', label: 'PT-02' },
            { top: '40%', left: '70%', label: 'PT-03' },
            { top: '75%', left: '60%', label: 'PT-04' },
            { top: '20%', left: '80%', label: 'PT-05' },
          ].map((pt, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1"
              style={{ top: pt.top, left: pt.left }}
            >
              <span className="w-2 h-2 rounded-full border border-[#5EEAD4] bg-[#5EEAD4]/40" />
              <span className="text-[8px] text-[#5EEAD4]/80 hidden sm:inline">{pt.label}</span>
            </div>
          ))}
        </div>

        {/* Reticle / Crosshair */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <Crosshair className="w-12 h-12 text-[#5EEAD4]/70 animate-pulse" />
          <div className="text-[10px] text-[#D7E2EA] bg-[#0C0C0C]/80 px-2.5 py-1 rounded border border-[#1E2733] mt-1">
            EST. FIX: {coords.lat}° N, {coords.lon}° E
          </div>
        </div>

        {/* Satellite Map Match Indicator */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[9px] text-[#8AA2FF] bg-[#11161D]/80 px-2 py-1 rounded border border-[#1E2733]">
          <Satellite className="w-3 h-3 text-[#8AA2FF]" />
          <span>SENTINEL-2 TILES MATCHED</span>
        </div>
      </div>

      {/* Bottom Sensor Fusion Telemetry */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-[#0C0C0C]/70 border border-[#1E2733]">
          <span className="text-[9px] text-white/40 block">COVARIANCE DRIFT</span>
          <span className="text-[#5EEAD4] font-bold text-sm">±{driftError}m</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#0C0C0C]/70 border border-[#1E2733]">
          <span className="text-[9px] text-white/40 block">ALTITUDE (AGL)</span>
          <span className="text-[#D7E2EA] font-bold text-sm">{coords.alt}m</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#0C0C0C]/70 border border-[#1E2733]">
          <span className="text-[9px] text-white/40 block">EKF FILTER</span>
          <span className="text-[#8AA2FF] font-bold text-sm">FUSED + IMU</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#0C0C0C]/70 border border-[#1E2733]">
          <span className="text-[9px] text-white/40 block">EDGE INFERENCE</span>
          <span className="text-[#F5C26B] font-bold text-sm">32 FPS</span>
        </div>
      </div>
    </div>
  );
};
