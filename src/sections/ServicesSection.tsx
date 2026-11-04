import React from 'react';
import { services } from '../data/services';
import { FadeIn } from '../components/ui/FadeIn';
import { ArrowUpRight, Cpu } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const handleScrollToProject = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const elem = document.getElementById(`project-${slug}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#F4F6F8] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-20 sm:py-28 md:py-36 z-10"
      aria-label="What I Build"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 md:mb-24 gap-6 border-b border-[#0C0C0C]/15 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#0C0C0C]/70 mb-3">
              <Cpu className="w-3.5 h-3.5 text-[#0C0C0C]" />
              <span>02 // CORE CAPABILITIES</span>
            </div>
            <FadeIn delay={0} y={30}>
              <h2
                className="font-black uppercase text-[#0C0C0C] leading-none tracking-tight select-none"
                style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
              >
                What I Build
              </h2>
            </FadeIn>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#0C0C0C]/70 max-w-md font-normal leading-relaxed">
            Engineering robust systems across the stack. From local-first agentic intelligence and computer vision to resilient database schemas and 3D web runtimes.
          </p>
        </div>

        {/* 5 Vertical Service Items */}
        <div className="w-full divide-y divide-[#0C0C0C]/15 border-b border-[#0C0C0C]/15">
          {services.map((item, index) => (
            <FadeIn
              key={item.number}
              delay={index * 0.08}
              y={25}
              className="py-10 sm:py-12 md:py-14 flex flex-col md:flex-row items-start justify-between gap-6 md:gap-12 group hover:bg-black/[0.02] -mx-4 px-4 rounded-2xl transition-colors duration-200"
            >
              {/* Left: Giant Number */}
              <div
                className="font-black text-[#0C0C0C]/25 group-hover:text-[#0C0C0C] leading-none select-none shrink-0 transition-colors duration-300 w-24 sm:w-32"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 120px)' }}
              >
                {item.number}
              </div>

              {/* Center / Right: Category + Title + Description + Stack Pills */}
              <div className="flex-1 space-y-3">
                <span className="font-mono text-xs text-[#0C0C0C]/60 uppercase tracking-widest block font-semibold">
                  {item.category}
                </span>

                <h3
                  className="font-black uppercase text-[#0C0C0C] tracking-tight leading-snug"
                  style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2.3rem)' }}
                >
                  {item.title}
                </h3>

                <p
                  className="font-normal text-[#0C0C0C]/75 leading-relaxed max-w-3xl text-sm sm:text-base md:text-lg"
                >
                  {item.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] sm:text-xs px-2.5 py-1 rounded-md bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 text-[#0C0C0C]/80 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Proof Link */}
                <div className="pt-3">
                  <a
                    href={`#project-${item.proofSlug}`}
                    onClick={(e) => handleScrollToProject(e, item.proofSlug)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-[#0C0C0C] font-semibold tracking-wide hover:underline decoration-2 underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <span>↳ see implementation: {item.proofLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
