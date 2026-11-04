import React from 'react';
import { experiences } from '../data/experience';
import { FadeIn } from '../components/ui/FadeIn';
import { Briefcase, Milestone } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-28 md:pt-36 pb-20 px-5 sm:px-8 md:px-12 z-10"
      aria-label="Experience and Trajectory"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6 border-b border-[#1E2733] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#5EEAD4] mb-3">
              <Milestone className="w-3.5 h-3.5 text-[#5EEAD4]" />
              <span>03 // EXPERIENCE & TRAJECTORY</span>
            </div>
            <FadeIn delay={0} y={30}>
              <h2
                className="hero-heading font-black uppercase text-[#D7E2EA] leading-none tracking-tight select-none"
                style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
              >
                Experience
              </h2>
            </FadeIn>
          </div>

          <p className="font-mono text-xs sm:text-sm text-[#D7E2EA]/60 max-w-md leading-relaxed">
            Leading engineering architecture as an agency CTO, executing defense-aligned vision research, and winning university grant funding for spatial computing systems.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-[#1E2733] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-12 sm:space-y-16">
          {experiences.map((exp, index) => (
            <FadeIn
              key={`${exp.role}-${index}`}
              delay={index * 0.08}
              y={25}
              className="relative group"
            >
              {/* Timeline Node Indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#11161D] border-2 border-[#5EEAD4] group-hover:scale-125 group-hover:bg-[#5EEAD4] transition-all duration-300" />

              <div className="p-6 sm:p-8 rounded-3xl bg-[#11161D] border border-[#1E2733] group-hover:border-[#5EEAD4]/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {/* Meta Row: Period + Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="font-mono text-xs text-[#5EEAD4] font-medium tracking-wide">
                    {exp.period}
                  </span>
                  <span className="font-mono text-[10px] uppercase px-2.5 py-1 rounded-full bg-[#161D28] border border-[#1E2733] text-[#8AA2FF]">
                    {exp.badge}
                  </span>
                </div>

                {/* Role & Org */}
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#D7E2EA] tracking-tight">
                  {exp.role}
                </h3>
                <div className="font-mono text-xs sm:text-sm text-[#D7E2EA]/70 mt-1 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-[#5EEAD4]" />
                  <span>{exp.organization}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#D7E2EA]/80 font-light mt-4 leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlights Bullet List */}
                <ul className="mt-4 space-y-2 border-t border-[#1E2733]/60 pt-4">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="font-mono text-xs text-[#D7E2EA]/70 flex items-start gap-2 leading-relaxed">
                      <span className="text-[#5EEAD4] shrink-0 font-bold">↳</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-5 pt-3 border-t border-[#1E2733]/40">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-[#161D28] text-[#D7E2EA]/80 border border-[#1E2733]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
