import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ShieldCheck, Terminal, Cpu, CheckCircle2 } from 'lucide-react';

const QUERIES = [
  "Synthesize technical spec for autonomous flight controller without cloud upload",
  "Retrieve local embedding clusters for DRDO radar signal modulation papers",
  "Validate database migration triggers against 3NF schema constraints"
];

export const SovaraScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [queryIndex, setQueryIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Step progression
  useEffect(() => {
    if (!isVisible || reducedMotion) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 4) {
          setQueryIndex((q) => (q + 1) % QUERIES.length);
          return 0;
        }
        return prev + 1;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [isVisible, reducedMotion]);

  const steps = [
    { label: "QUERY INGESTION", detail: "Natural language query parsed & sanitized" },
    { label: "LANGGRAPH ROUTER", detail: "Evaluating agentic intent & tool dispatch" },
    { label: "QDRANT VECTOR DB", detail: "Cosine search over local dense embeddings (38ms)" },
    { label: "OLLAMA LOCAL LLM", detail: "Quantized weights running offline on local VRAM" },
    { label: "GUARDRAIL VERIFIER", detail: "Zero hallucination check & citation synthesis" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] p-6 sm:p-8 flex flex-col justify-between bg-[#11161D]/90 border border-[#1E2733] rounded-[40px] overflow-hidden select-none"
    >
      {/* Top Header telemetry */}
      <div className="flex items-center justify-between border-b border-[#1E2733]/80 pb-3 font-mono text-xs text-[#D7E2EA]/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
          <span className="text-[#5EEAD4]">SOVARA // AGENTIC LOCAL-RAG</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#5EEAD4] bg-[#5EEAD4]/10 px-2 py-0.5 rounded border border-[#5EEAD4]/30 text-[10px]">
            AIR-GAPPED 100%
          </span>
          <span className="text-white/40">OLLAMA + QDRANT</span>
        </div>
      </div>

      {/* Query Bar */}
      <div className="my-3 p-3.5 rounded-xl bg-[#0C0C0C]/80 border border-[#1E2733] font-mono text-xs text-[#D7E2EA]">
        <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase mb-1">
          <Terminal className="w-3 h-3 text-[#5EEAD4]" />
          <span>Active Prompt Stream</span>
        </div>
        <div className="text-[#D7E2EA] truncate flex items-center gap-1.5">
          <span className="text-[#5EEAD4]">&gt;</span>
          <span>{QUERIES[queryIndex]}</span>
        </div>
      </div>

      {/* Pipeline Steps View */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 my-2">
        {steps.map((step, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;
          return (
            <div
              key={step.label}
              className={`p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                isCurrent
                  ? 'bg-[#161D28] border-[#5EEAD4] shadow-[0_0_15px_rgba(94,234,212,0.15)]'
                  : isDone
                  ? 'bg-[#11161D] border-[#5EEAD4]/40 text-white/80'
                  : 'bg-[#0E131A] border-[#1E2733]/50 text-white/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] uppercase tracking-wider">
                  0{idx + 1}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-3 h-3 text-[#5EEAD4]" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-ping" />
                ) : null}
              </div>
              <div className="font-mono text-[10px] font-semibold tracking-tight text-[#D7E2EA]">
                {step.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Explanation / Telemetry Output */}
      <div className="mt-2 p-3.5 rounded-xl bg-[#0C0C0C]/60 border border-[#1E2733] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="font-mono text-xs text-[#D7E2EA]/90 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#8AA2FF] shrink-0" />
          <span>
            <strong className="text-[#5EEAD4]">{steps[activeStep].label}:</strong>{' '}
            {steps[activeStep].detail}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 font-mono text-[10px] text-white/50">
          <span>LATENCY: 38ms</span>
          <span className="text-[#5EEAD4] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            0% CLOUD LEAK
          </span>
        </div>
      </div>
    </div>
  );
};
