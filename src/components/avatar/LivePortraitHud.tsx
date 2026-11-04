import React from 'react';

/**
 * Subtle tech HUD frame with 4 corner L-brackets and 3 verified callouts
 * pointing to key regions of Satvik's portrait with hairline leader lines.
 * Strictly uses Satvik's verified facts: id, role, focus.
 */
export const LivePortraitHud: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-20 overflow-visible"
      aria-hidden="true"
    >
      {/* 1. Corner L-Brackets (24px) */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 0 4px rgba(94, 234, 212, 0.35))' }}
      >
        {/* Top-Left Bracket */}
        <path
          d="M 4 28 L 4 4 L 28 4"
          fill="none"
          stroke="#5EEAD4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.65"
        />
        {/* Top-Right Bracket */}
        <path
          d="M calc(100% - 28px) 4 L calc(100% - 4px) 4 L calc(100% - 4px) 28"
          fill="none"
          stroke="#5EEAD4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.65"
        />
        {/* Bottom-Left Bracket */}
        <path
          d="M 4 calc(100% - 28px) L 4 calc(100% - 4px) L 28 calc(100% - 4px)"
          fill="none"
          stroke="#5EEAD4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.65"
        />
        {/* Bottom-Right Bracket */}
        <path
          d="M calc(100% - 28px) calc(100% - 4px) L calc(100% - 4px) calc(100% - 4px) L calc(100% - 4px) calc(100% - 28px)"
          fill="none"
          stroke="#5EEAD4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.65"
        />
      </svg>

      {/* 2. Callout 1: Left / Temple (id: satvik) */}
      <div className="absolute top-[42%] left-[-16px] sm:left-[-24px] md:left-[-38px] flex items-center space-x-1.5 font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-wider text-[#5EEAD4] bg-[#0C0C0C]/85 backdrop-blur-md px-2 py-0.5 rounded border border-[#5EEAD4]/30 shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4] animate-pulse" />
        <span className="text-[#D7E2EA]/70">id:</span>
        <span className="font-semibold text-[#5EEAD4]">satvik</span>
        {/* Leader hairline line pointing towards left temple */}
        <svg
          className="absolute left-full top-1/2 -translate-y-1/2 w-6 sm:w-10 h-6 pointer-events-none"
          viewBox="0 0 40 24"
          fill="none"
        >
          <path
            d="M 0 12 L 24 12 L 36 18"
            stroke="#5EEAD4"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.6"
          />
          <circle cx="36" cy="18" r="2" fill="#5EEAD4" opacity="0.9" />
        </svg>
      </div>

      {/* 3. Callout 2: Right side / Cheek (role: full-stack dev · cto) */}
      <div className="absolute top-[52%] right-[-14px] sm:right-[-26px] md:right-[-42px] hidden sm:flex items-center space-x-1.5 font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-wider text-[#5EEAD4] bg-[#0C0C0C]/85 backdrop-blur-md px-2 py-0.5 rounded border border-[#5EEAD4]/30 shadow-md">
        {/* Leader hairline line from right cheek to label */}
        <svg
          className="absolute right-full top-1/2 -translate-y-1/2 w-6 sm:w-10 h-6 pointer-events-none"
          viewBox="0 0 40 24"
          fill="none"
        >
          <path
            d="M 4 8 L 16 12 L 40 12"
            stroke="#5EEAD4"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.6"
          />
          <circle cx="4" cy="8" r="2" fill="#5EEAD4" opacity="0.9" />
        </svg>
        <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4]" />
        <span className="text-[#D7E2EA]/70">role:</span>
        <span className="font-medium text-[#5EEAD4]">full-stack dev · cto</span>
      </div>

      {/* 4. Callout 3: Lower Left / Collar (focus: llm apis · rag · vector search) */}
      <div className="absolute bottom-[16%] left-[-14px] sm:left-[-22px] md:left-[-34px] hidden md:flex items-center space-x-1.5 font-mono text-[8.5px] sm:text-[9.5px] md:text-[10.5px] tracking-wider text-[#5EEAD4] bg-[#0C0C0C]/85 backdrop-blur-md px-2 py-0.5 rounded border border-[#5EEAD4]/30 shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4]" />
        <span className="text-[#D7E2EA]/70">focus:</span>
        <span className="font-medium text-[#5EEAD4]">llm apis · rag · vector search</span>
        {/* Leader hairline line pointing inward to collar */}
        <svg
          className="absolute left-full top-1/2 -translate-y-1/2 w-6 sm:w-10 h-6 pointer-events-none"
          viewBox="0 0 40 24"
          fill="none"
        >
          <path
            d="M 0 12 L 22 12 L 36 6"
            stroke="#5EEAD4"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.6"
          />
          <circle cx="36" cy="6" r="2" fill="#5EEAD4" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
};
