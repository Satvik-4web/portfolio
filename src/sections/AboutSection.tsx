import React, { useRef, useState, useEffect } from 'react';
import { FadeIn } from '../components/ui/FadeIn';
import { AnimatedText } from '../components/ui/AnimatedText';
import { ContactButton } from '../components/ui/ContactButton';
import { AboutObjects } from '../components/three/AboutObjects';

const ABOUT_TEXT =
  "I'm a Computer Engineering student at Thapar and the co-founder and CTO of a dev agency. I build full-stack products, from a live student OS to role-based APIs and database-heavy systems, and I'm now going deeper into AI engineering: LLM APIs, RAG and vector search. Build, break, learn, rebuild.";

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Section-level safety net: force all text visible 1.5s after section enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setForceVisible(true);
          }, 1500);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden bg-[#0C0C0C] z-10"
      aria-label="About Satvik"
    >
      {/* 1. Background 3D Corner Geometries (strictly z-0, transparent canvas, pointer-events-none) */}
      <AboutObjects />

      {/* 2. Content Stack (strictly relative z-10) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <FadeIn delay={0} y={40} forceVisible={forceVisible} className="w-full">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Spacing: heading/text gap-10 sm:gap-14 md:gap-16 */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* AnimatedText paragraph */}
        <div className="w-full max-w-[560px] mx-auto px-4">
          <AnimatedText
            text={ABOUT_TEXT}
            forceVisible={forceVisible}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed"
          />

          {/* Status Row: Pulsing mint dot + learning + TIET class of 2028 */}
          <FadeIn delay={0.2} y={15} forceVisible={forceVisible} className="mt-8">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs text-[#D7E2EA]/70 bg-[#11161D]/80 border border-[#1E2733] px-4 py-2 rounded-full">
              <span className="flex items-center gap-2 text-[#5EEAD4]">
                <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
                <span>currently learning: LLM APIs · RAG · vector search</span>
              </span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span className="text-white/60">TIET · class of 2028</span>
            </div>
          </FadeIn>
        </div>

        {/* Spacing: text block/button gap-16 sm:gap-20 md:gap-24 */}
        <div className="h-16 sm:h-20 md:h-24" />

        {/* Contact Button */}
        <FadeIn delay={0.3} y={20} forceVisible={forceVisible}>
          <ContactButton label="Contact Me" />
        </FadeIn>
      </div>
    </section>
  );
};
