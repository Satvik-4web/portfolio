import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// Fixed clusters of points for genuine and counterfeit banknotes (variance vs skewness)
const GENUINE_POINTS = [
  { x: 30, y: 35 }, { x: 38, y: 48 }, { x: 25, y: 55 }, { x: 42, y: 30 },
  { x: 48, y: 58 }, { x: 32, y: 68 }, { x: 20, y: 40 }, { x: 40, y: 75 },
  { x: 28, y: 22 }, { x: 50, y: 42 }, { x: 35, y: 52 }, { x: 45, y: 65 },
];

const FORGED_POINTS = [
  { x: 65, y: 30 }, { x: 75, y: 45 }, { x: 82, y: 20 }, { x: 70, y: 60 },
  { x: 88, y: 55 }, { x: 60, y: 72 }, { x: 80, y: 78 }, { x: 72, y: 35 },
  { x: 85, y: 40 }, { x: 62, y: 50 }, { x: 90, y: 68 }, { x: 68, y: 82 },
];

const MODELS = [
  { name: 'Support Vector Machine (RBF)', path: 'M 54 10 Q 56 50 52 90' },
  { name: 'Random Forest Ensemble', path: 'M 52 10 Q 58 45 54 90' },
  { name: 'Logistic Regression Baseline', path: 'M 55 10 Q 54 50 53 90' },
];

export const ClassifierScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [modelIndex, setModelIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || reducedMotion) return;
    const interval = setInterval(() => {
      setModelIndex((prev) => (prev + 1) % MODELS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible, reducedMotion]);

  const activeModel = MODELS[modelIndex] || MODELS[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] p-6 sm:p-8 flex flex-col justify-between bg-[#11161D]/90 border border-[#1E2733] rounded-[40px] overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#1E2733]/80 pb-3 font-mono text-xs text-[#D7E2EA]/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F5C26B] animate-pulse" />
          <span className="text-[#F5C26B]">SCIKIT-LEARN // BINARY CLASSIFIER</span>
        </div>
        <span className="text-white/40">STATISTICAL WAVELET FEATURES</span>
      </div>

      {/* 2D Feature Scatter Space */}
      <div className="relative my-auto w-full h-[220px] rounded-2xl bg-[#0A0E14] border border-[#1E2733] p-4 flex flex-col justify-between overflow-hidden">
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(to right, #1E2733 1px, transparent 1px), linear-gradient(to bottom, #1E2733 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Scatter SVG */}
        <svg
          className="absolute inset-0 w-full h-full p-4 overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Decision boundary path with smooth transition */}
          <path
            d={activeModel.path}
            stroke="#F5C26B"
            strokeWidth="1.8"
            strokeDasharray="3 2"
            fill="none"
            className="transition-all duration-700 ease-in-out"
          />

          {/* Genuine Points (Mint) */}
          {GENUINE_POINTS.map((pt, i) => (
            <circle
              key={`gen-${i}`}
              cx={pt.x}
              cy={pt.y}
              r="2"
              fill="#5EEAD4"
              className="opacity-80"
            />
          ))}

          {/* Forged Points (Rose) */}
          {FORGED_POINTS.map((pt, i) => (
            <rect
              key={`forg-${i}`}
              x={pt.x - 1.8}
              y={pt.y - 1.8}
              width="3.6"
              height="3.6"
              fill="#FB7185"
              className="opacity-80"
            />
          ))}
        </svg>

        {/* Legend */}
        <div className="relative z-10 flex items-center justify-between font-mono text-[10px]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#5EEAD4]">
              <span className="w-2 h-2 rounded-full bg-[#5EEAD4]" />
              GENUINE
            </span>
            <span className="flex items-center gap-1.5 text-[#FB7185]">
              <span className="w-2 h-2 bg-[#FB7185]" />
              FORGED
            </span>
          </div>
          <span className="text-white/40 uppercase tracking-widest text-[9px]">
            model comparison
          </span>
        </div>

        {/* Active Model Indicator */}
        <div className="relative z-10 self-start font-mono text-[10px] bg-[#0E131A]/90 px-2.5 py-1 rounded border border-[#F5C26B]/30 text-[#F5C26B]">
          OPTIMIZING: {activeModel.name}
        </div>
      </div>

      {/* Footer bar */}
      <div className="pt-3 border-t border-[#1E2733]/80 flex items-center justify-between font-mono text-[10px] text-[#D7E2EA]/60">
        <span className="text-white/40">VARIANCE · SKEWNESS · CURTOSIS · ENTROPY</span>
        <span className="text-[#F5C26B]">SUPERVISED ML</span>
      </div>
    </div>
  );
};
