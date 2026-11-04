import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SCHEDULE = [
  { id: 1, code: 'MATH-201', time: '09:00', title: 'Calculus III' },
  { id: 2, code: 'CS-304', time: '11:00', title: 'Operating Systems' },
  { id: 3, code: 'ELC-102', time: '13:00', title: 'Hardware Lab' },
  { id: 4, code: 'AI-401', time: '15:00', title: 'Neural Networks' },
  { id: 5, code: 'FOCUS', time: '17:00', title: 'Study Session' },
];

export const NexTimeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlot, setActiveSlot] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(45 * 60);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Cycle active schedule slot
  useEffect(() => {
    if (!isVisible || reducedMotion) return;
    const interval = setInterval(() => {
      setActiveSlot((prev) => (prev % SCHEDULE.length) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, [isVisible, reducedMotion]);

  // Pomodoro ticking focus timer
  useEffect(() => {
    if (!isVisible || reducedMotion) return;
    const timerInterval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 45 * 60));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [isVisible, reducedMotion]);

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] p-6 sm:p-8 flex flex-col justify-between bg-[#11161D]/90 border border-[#1E2733] rounded-[40px] overflow-hidden"
    >
      {/* Top Header telemetry */}
      <div className="flex items-center justify-between border-b border-[#1E2733]/80 pb-3 font-mono text-xs text-[#D7E2EA]/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
          <span className="text-[#5EEAD4]">ENGINE: REALTIME SCHEDULE</span>
        </div>
        <div className="flex items-center gap-4">
          <span>TERM 05</span>
          <span className="text-white/40">TIET // CS</span>
        </div>
      </div>

      {/* Main Timetable View */}
      <div className="relative my-4 py-3">
        {/* Mint "Now" indicator line sweeping across */}
        {!reducedMotion && (
          <motion.div
            className="absolute top-0 bottom-0 w-[2px] bg-[#5EEAD4] shadow-[0_0_12px_#5EEAD4] z-20 pointer-events-none"
            animate={{
              left: ['8%', '88%'],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#5EEAD4] shadow-[0_0_8px_#5EEAD4]" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#5EEAD4] shadow-[0_0_8px_#5EEAD4]" />
          </motion.div>
        )}

        {/* Schedule Slots */}
        <div className="space-y-2.5">
          {SCHEDULE.map((item) => {
            const isActive = item.id === activeSlot;
            const isDone = item.id < activeSlot;
            const statusLabel = isActive ? 'NOW' : isDone ? 'DONE' : 'NEXT';

            return (
              <div
                key={item.id}
                className={`relative flex items-center justify-between p-3 rounded-xl border transition-all duration-500 ${
                  isActive
                    ? 'bg-[#161D28] border-[#5EEAD4] shadow-[0_0_20px_rgba(94,234,212,0.12)]'
                    : 'bg-[#0E131A] border-[#1E2733]/60 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#5EEAD4]">{item.time}</span>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-[#D7E2EA] tracking-wide">
                      {item.title}
                    </div>
                    <div className="font-mono text-[10px] text-[#D7E2EA]/50">{item.code}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border transition-colors ${
                      isActive
                        ? 'bg-[#5EEAD4]/20 border-[#5EEAD4] text-[#5EEAD4]'
                        : isDone
                        ? 'bg-white/5 border-white/20 text-white/50'
                        : 'bg-amber-500/10 border-amber-500/30 text-[#F5C26B]'
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Telemetry: Attendance Ring + Focus Pomodoro */}
      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#1E2733]/80">
        {/* Attendance Ring */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0E131A] border border-[#1E2733]">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="#1E2733"
                strokeWidth="3.5"
                fill="none"
              />
              <motion.circle
                cx="20"
                cy="20"
                r="16"
                stroke="#5EEAD4"
                strokeWidth="3.5"
                strokeDasharray="100.5"
                strokeDashoffset={reducedMotion ? '14' : '14'}
                strokeLinecap="round"
                fill="none"
                animate={reducedMotion ? undefined : { strokeDashoffset: [40, 14] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              />
            </svg>
            <span className="absolute font-mono text-[10px] font-bold text-[#5EEAD4]">86%</span>
          </div>
          <div>
            <div className="font-mono text-[10px] text-[#5EEAD4] uppercase tracking-wider">
              Safe &gt;80%
            </div>
            <div className="text-xs font-medium text-[#D7E2EA]">Attendance</div>
          </div>
        </div>

        {/* Pomodoro Timer */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0E131A] border border-[#1E2733]">
          <div className="w-10 h-10 rounded-xl bg-[#F5C26B]/15 border border-[#F5C26B]/40 flex items-center justify-center font-mono text-sm font-bold text-[#F5C26B] shrink-0">
            45
          </div>
          <div>
            <div className="font-mono text-[10px] text-[#F5C26B] uppercase tracking-wider">
              Pomodoro
            </div>
            <div className="font-mono text-sm font-semibold text-white tracking-widest">
              {timeFormatted}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
