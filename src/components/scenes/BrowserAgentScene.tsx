import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Globe, MousePointer, CheckCircle, Terminal, Layers } from 'lucide-react';

const ACTIONS = [
  { action: "NAVIGATE", target: "https://portal.university.edu/student", status: "200 OK" },
  { action: "EXTRACT_DOM", target: "AccessibilityTree(pruned=72%)", status: "48 nodes" },
  { action: "GROUND_VISION", target: "BoundingBox(x=420, y=180, w=120)", status: "Confidence 0.99" },
  { action: "CLICK_ELEMENT", target: "button#submit-enrollment", status: "Executed" },
  { action: "VERIFY_MUTATION", target: "MutationObserver(url_changed)", status: "Success" }
];

export const BrowserAgentScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [actionIdx, setActionIdx] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Cycle action execution
  useEffect(() => {
    if (!isVisible || reducedMotion) return;
    const interval = setInterval(() => {
      setActionIdx((prev) => (prev + 1) % ACTIONS.length);
    }, 2400);
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
          <span className="text-[#5EEAD4]">AGENT // AUTONOMOUS BROWSER RUNTIME</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#8AA2FF] bg-[#8AA2FF]/10 px-2 py-0.5 rounded border border-[#8AA2FF]/30 text-[10px]">
            HEADLESS CHROMIUM
          </span>
          <span className="text-white/40">CDP + PLAYWRIGHT</span>
        </div>
      </div>

      {/* Simulated Browser URL & Window */}
      <div className="my-3 rounded-2xl bg-[#0C0C0C]/80 border border-[#1E2733] p-4 flex flex-col gap-3">
        {/* Fake Address Bar */}
        <div className="flex items-center gap-2 text-xs bg-[#161D28] px-3 py-1.5 rounded-lg border border-[#1E2733]">
          <Globe className="w-3.5 h-3.5 text-[#5EEAD4]" />
          <span className="text-[#D7E2EA] truncate text-[11px]">
            https://target-portal.internal/workflow/task-8914
          </span>
          <span className="ml-auto text-[9px] text-[#5EEAD4] bg-[#5EEAD4]/10 px-1.5 py-0.5 rounded">
            CONNECTED
          </span>
        </div>

        {/* Live DOM Grounding Frame */}
        <div className="relative h-28 rounded-xl bg-[#090D14] border border-[#1E2733]/60 p-3 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between text-[10px] text-white/40 border-b border-[#1E2733]/40 pb-1.5">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[#8AA2FF]" />
              ACCESSIBILITY TREE SNAPSHOT
            </span>
            <span className="text-[#5EEAD4]">70% TOKEN PRUNING</span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-auto">
            <div className="p-2 rounded bg-[#11161D] border border-[#1E2733] text-[9px] text-white/70">
              input#username
            </div>
            <div className="p-2 rounded bg-[#11161D] border border-[#1E2733] text-[9px] text-white/70">
              input#password
            </div>
            <div className="relative p-2 rounded bg-[#5EEAD4]/10 border border-[#5EEAD4] text-[9px] text-[#5EEAD4] font-bold flex items-center justify-between">
              <span>btn#submit</span>
              <MousePointer className="w-3 h-3 text-[#5EEAD4] animate-bounce" />
            </div>
          </div>

          <div className="text-[9px] text-[#D7E2EA]/50 flex items-center justify-between pt-1">
            <span>COORDS: X:420, Y:180</span>
            <span className="text-[#8AA2FF]">CONFIDENCE: 99.4%</span>
          </div>
        </div>
      </div>

      {/* Action Execution Pipeline */}
      <div className="p-3 rounded-xl bg-[#0C0C0C]/60 border border-[#1E2733] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#D7E2EA]">
          <Terminal className="w-4 h-4 text-[#5EEAD4] shrink-0" />
          <span>
            <strong className="text-[#5EEAD4]">{ACTIONS[actionIdx].action}:</strong>{' '}
            {ACTIONS[actionIdx].target}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0 font-mono text-[10px] text-[#5EEAD4]">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{ACTIONS[actionIdx].status}</span>
        </div>
      </div>
    </div>
  );
};
