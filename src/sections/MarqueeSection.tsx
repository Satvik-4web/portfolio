import React, { useRef, useEffect, useState } from 'react';
import { row1Techs, row2Techs } from '../data/stack';
import { TechTile } from '../components/ui/TechTile';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(isReduced);
    if (isReduced) return;

    let rafId: number | null = null;
    let isIntersecting = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const updateScroll = () => {
      if (!isIntersecting || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${scrollOffset - 200}px, 0px, 0px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${-(scrollOffset - 200)}px, 0px, 0px)`;
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateScroll();
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Triple each row for seamless looping
  const tripledRow1 = [...row1Techs, ...row1Techs, ...row1Techs];
  const tripledRow2 = [...row2Techs, ...row2Techs, ...row2Techs];

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none space-y-3"
      aria-label="Technologies and Tooling"
    >
      {/* Row 1: Moves RIGHT on scroll */}
      <div
        ref={row1Ref}
        className="flex gap-3 will-change-transform"
        style={{
          transform: reducedMotion ? 'none' : 'translate3d(-200px, 0px, 0px)',
        }}
      >
        {tripledRow1.map((tech, idx) => (
          <TechTile key={`r1-${tech.id}-${idx}`} tech={tech} />
        ))}
      </div>

      {/* Row 2: Moves LEFT on scroll */}
      <div
        ref={row2Ref}
        className="flex gap-3 will-change-transform"
        style={{
          transform: reducedMotion ? 'none' : 'translate3d(200px, 0px, 0px)',
        }}
      >
        {tripledRow2.map((tech, idx) => (
          <TechTile key={`r2-${tech.id}-${idx}`} tech={tech} />
        ))}
      </div>
    </section>
  );
};
