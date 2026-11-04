import React from 'react';
import { techCategories } from '../data/stack';
import { FadeIn } from '../components/ui/FadeIn';
import { Layers, Terminal } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  return (
    <section
      id="stack"
      className="relative w-full bg-[#0C0C0C] py-24 sm:py-32 px-5 sm:px-8 md:px-12 z-10"
      aria-label="Technical Skills and Stack Architecture"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6 border-b border-[#1E2733] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#5EEAD4] mb-3">
              <Terminal className="w-3.5 h-3.5 text-[#5EEAD4]" />
              <span>05 // TECHNICAL CAPABILITIES</span>
            </div>
            <FadeIn delay={0} y={30}>
              <h2
                className="hero-heading font-black uppercase text-[#D7E2EA] leading-none tracking-tight select-none"
                style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
              >
                Tech Stack
              </h2>
            </FadeIn>
          </div>

          <p className="font-mono text-xs sm:text-sm text-[#D7E2EA]/60 max-w-md leading-relaxed">
            Categorized tools, runtime frameworks, and system layers. Each technology is tied to verified production implementations and research projects.
          </p>
        </div>

        {/* 4 Categorized Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {techCategories.map((cat, idx) => (
            <FadeIn
              key={cat.code}
              delay={idx * 0.08}
              y={25}
              className="p-6 sm:p-8 rounded-3xl bg-[#11161D] border border-[#1E2733] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#5EEAD4] border-b border-[#1E2733] pb-3 mb-4">
                  <span>{cat.code}</span>
                  <Layers className="w-3.5 h-3.5 text-white/40" />
                </div>

                <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#D7E2EA] tracking-tight">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/60 font-light mt-2 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skill List */}
                <div className="mt-6 space-y-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-[#161D28]/80 border border-[#1E2733] flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-mono font-bold text-[#D7E2EA] block">
                          {skill.name}
                        </span>
                        <span className="font-mono text-[11px] text-white/50 block">
                          {skill.level}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#11161D] border border-[#1E2733] text-[#5EEAD4] shrink-0">
                        {skill.usedIn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1E2733]/60 font-mono text-[10px] text-white/40 flex items-center justify-between">
                <span>BENCHMARKED & VERIFIED</span>
                <span className="text-[#5EEAD4]">PRODUCTION READY</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
