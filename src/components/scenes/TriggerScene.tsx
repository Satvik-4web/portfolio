import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const TriggerScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [statePhase, setStatePhase] = useState<'commit' | 'rollback'>('commit');
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
      setStatePhase((prev) => (prev === 'commit' ? 'rollback' : 'commit'));
    }, 3200);
    return () => clearInterval(interval);
  }, [isVisible, reducedMotion]);

  const isCommit = statePhase === 'commit';

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] p-6 sm:p-8 flex flex-col justify-between bg-[#11161D]/90 border border-[#1E2733] rounded-[40px] overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#1E2733]/80 pb-3 font-mono text-xs text-[#D7E2EA]/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FB7185] animate-pulse" />
          <span className="text-[#FB7185]">ORACLE PL/SQL // ACID ENGINE</span>
        </div>
        <span className="text-white/40">SCHEMA: 3NF / BCNF COMPLIANT</span>
      </div>

      {/* Center Flow Diagram: 3 Nodes + Pipeline */}
      <div className="my-auto py-4 space-y-5">
        {/* Nodes horizontal pipeline */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 relative">
          {/* Connection line between nodes */}
          <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-[#1E2733] -translate-y-1/2 z-0">
            {!reducedMotion && (
              <motion.div
                className={`h-full ${isCommit ? 'bg-[#5EEAD4]' : 'bg-[#FB7185]'}`}
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>

          {/* Node 1: Household */}
          <div className="relative z-10 p-3 sm:p-4 rounded-2xl bg-[#0E131A] border border-[#1E2733] text-center">
            <div className="font-mono text-[9px] text-white/40 uppercase">SOURCE</div>
            <div className="font-semibold text-xs sm:text-sm text-[#D7E2EA] mt-1">Household</div>
            <div className="font-mono text-[10px] text-[#5EEAD4] mt-1">
              {isCommit ? 'qty: +14.2kg' : 'qty: -0.00kg'}
            </div>
          </div>

          {/* Node 2: Collection Hub */}
          <div className="relative z-10 p-3 sm:p-4 rounded-2xl bg-[#0E131A] border border-[#1E2733] text-center">
            <div className="font-mono text-[9px] text-white/40 uppercase">ROUTER</div>
            <div className="font-semibold text-xs sm:text-sm text-[#D7E2EA] mt-1">Collection</div>
            <div className="font-mono text-[10px] text-[#8AA2FF] mt-1">sector: PB-01</div>
          </div>

          {/* Node 3: Vehicle Unit */}
          <div className="relative z-10 p-3 sm:p-4 rounded-2xl bg-[#0E131A] border border-[#1E2733] text-center">
            <div className="font-mono text-[9px] text-white/40 uppercase">TARGET</div>
            <div className="font-semibold text-xs sm:text-sm text-[#D7E2EA] mt-1">Vehicle</div>
            <div className="font-mono text-[10px] text-[#F5C26B] mt-1">cap: 4,200kg</div>
          </div>
        </div>

        {/* Oracle PL/SQL Trigger Verification Monitor */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-500 font-mono text-xs ${
            isCommit
              ? 'bg-[#0E1B18]/70 border-[#5EEAD4]/60 shadow-[0_0_20px_rgba(94,234,212,0.1)]'
              : 'bg-[#1E0D12]/70 border-[#FB7185]/60 shadow-[0_0_20px_rgba(251,113,133,0.1)]'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px]">
            <span className="text-white/60">TRIGGER: check_waste_quantity_before_insert</span>
            <span
              className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                isCommit
                  ? 'bg-[#5EEAD4]/20 text-[#5EEAD4] border border-[#5EEAD4]'
                  : 'bg-[#FB7185]/20 text-[#FB7185] border border-[#FB7185]'
              }`}
            >
              {isCommit ? 'COMMIT' : 'ROLLBACK'}
            </span>
          </div>

          <div className="pt-2 text-[10px] sm:text-[11px] leading-relaxed">
            {isCommit ? (
              <div className="text-[#5EEAD4] space-y-1">
                <div>&gt; [SUCCESS] Quantity &gt; 0 and capacity valid.</div>
                <div className="text-white/50">&gt; Transaction committed to Oracle redo logs.</div>
              </div>
            ) : (
              <div className="text-[#FB7185] space-y-1">
                <div>&gt; [EXCEPTION] ORA-20001: quantity must be &gt; 0 / ROLLBACK</div>
                <div className="text-white/50">&gt; Database state preserved. Zero dirty writes.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="pt-3 border-t border-[#1E2733]/80 flex items-center justify-between font-mono text-[10px] text-[#D7E2EA]/60">
        <span className="text-white/40">PL/SQL CURSORS &amp; PROCEDURES</span>
        <span className="text-[#FB7185]">ACID GUARANTEED</span>
      </div>
    </div>
  );
};
