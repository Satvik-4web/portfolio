import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const ROLES = [
  { id: 'admin', label: 'Admin', scope: 'ALL_RESOURCES_WILDCARD', badgeColor: '#5EEAD4' },
  { id: 'principal', label: 'Principal', scope: 'INSTITUTE_METRICS_READ', badgeColor: '#8AA2FF' },
  { id: 'hod', label: 'HOD', scope: 'DEPARTMENT_CURRICULUM_CRUD', badgeColor: '#F5C26B' },
  { id: 'faculty', label: 'Faculty', scope: 'CLASS_ATTENDANCE_WRITE', badgeColor: '#5EEAD4' },
  { id: 'student', label: 'Student', scope: 'SELF_PROFILE_SCHEDULE_READ', badgeColor: '#8AA2FF' },
];

export const RoleAccessScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
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
      setActiveRoleIdx((prev) => (prev + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [isVisible, reducedMotion]);

  const activeRole = ROLES[activeRoleIdx];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] p-6 sm:p-8 flex flex-col justify-between bg-[#11161D]/90 border border-[#1E2733] rounded-[40px] overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#1E2733]/80 pb-3 font-mono text-xs text-[#D7E2EA]/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8AA2FF] animate-pulse" />
          <span className="text-[#8AA2FF]">LARAVEL SANCTUM // RBAC ENGINE</span>
        </div>
        <span className="text-white/40">5 TIER AUTHORIZATION</span>
      </div>

      {/* Center Layout: Login Box + Token Router + Role Cards */}
      <div className="my-auto py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Token Issuer Box (Left, 5 cols) */}
        <div className="md:col-span-5 p-4 rounded-2xl bg-[#0E131A] border border-[#1E2733] space-y-2">
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-emerald-400">POST /api/auth/token</span>
            <span className="text-white/50">200 OK</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#080B10] border border-[#1E2733] font-mono text-[10px] space-y-1">
            <div className="text-white/40"># Authenticated Identity</div>
            <div className="text-[#5EEAD4] font-semibold flex items-center justify-between">
              <span>role: &quot;{activeRole.label.toLowerCase()}&quot;</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4]" />
            </div>
            <div className="text-white/50 truncate">
              token: 18|sanctum_eyJhbGciOi...
            </div>
          </div>

          <div className="text-[10px] font-mono text-white/50 flex items-center justify-between pt-1">
            <span>revoke_on_pwd_change: true</span>
            <span className="text-[#8AA2FF]">STRICT RBAC</span>
          </div>
        </div>

        {/* Roles List (Right, 7 cols) */}
        <div className="md:col-span-7 space-y-2">
          {ROLES.map((role, idx) => {
            const isTarget = idx === activeRoleIdx;
            return (
              <div
                key={role.id}
                className={`relative flex items-center justify-between px-3.5 py-2 rounded-xl border transition-all duration-300 ${
                  isTarget
                    ? 'bg-[#161D28] border-[#5EEAD4] shadow-[0_0_15px_rgba(94,234,212,0.15)] scale-[1.02]'
                    : 'bg-[#0E131A]/60 border-[#1E2733]/50 opacity-40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isTarget ? 'bg-[#5EEAD4] shadow-[0_0_8px_#5EEAD4]' : 'bg-white/20'
                    }`}
                  />
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#D7E2EA]">
                      {role.label}
                    </span>
                    <span className="hidden sm:inline font-mono text-[10px] text-white/40 ml-2">
                      [{role.scope}]
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isTarget ? (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#5EEAD4]/20 border border-[#5EEAD4] text-[#5EEAD4] font-medium flex items-center gap-1">
                      ✓ granted
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#FB7185]/10 border border-[#FB7185]/30 text-[#FB7185] font-light">
                      403
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer diagnostic */}
      <div className="pt-3 border-t border-[#1E2733]/80 flex items-center justify-between font-mono text-[10px] text-[#D7E2EA]/60">
        <span className="text-white/40">MIDDLEWARE: VerifyBearerRole.php</span>
        <span className="text-[#5EEAD4]">ISOLATED DASHBOARDS: 5/5 ACTIVE</span>
      </div>
    </div>
  );
};
