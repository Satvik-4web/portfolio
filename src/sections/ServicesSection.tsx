import React from 'react';
import { services } from '../data/services';
import { FadeIn } from '../components/ui/FadeIn';

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
      className="relative w-full bg-[#F4F6F8] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-10"
      aria-label="What I Build"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            className="font-black uppercase text-[#0C0C0C] leading-none tracking-tight select-none mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Build
          </h2>
        </FadeIn>

        {/* 5 Vertical Service Items */}
        <div className="w-full divide-y divide-[#0C0C0C]/15 border-y border-[#0C0C0C]/15">
          {services.map((item, index) => (
            <FadeIn
              key={item.number}
              delay={index * 0.1}
              y={25}
              className="py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 group transition-colors duration-200"
            >
              {/* Left: Giant Number */}
              <div
                className="font-black text-[#0C0C0C] leading-none select-none shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {item.number}
              </div>

              {/* Right: Title + Description + Proof Link */}
              <div className="flex-1 space-y-3">
                <h3
                  className="font-medium uppercase text-[#0C0C0C] tracking-tight leading-snug"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {item.title}
                </h3>

                <p
                  className="font-light text-[#0C0C0C] leading-relaxed max-w-2xl opacity-60"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {item.description}
                </p>

                {/* Proof Link */}
                <div className="pt-1">
                  <a
                    href={`#project-${item.proofSlug}`}
                    onClick={(e) => handleScrollToProject(e, item.proofSlug)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-[#0C0C0C] font-medium tracking-wide hover:underline decoration-2 underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <span>↳ see: {item.proofLabel}</span>
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
