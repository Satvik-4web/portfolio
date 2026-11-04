import React, { useRef, useState, useEffect } from 'react';
import { FadeIn } from '../components/ui/FadeIn';
import { AnimatedText } from '../components/ui/AnimatedText';
import { ContactButton } from '../components/ui/ContactButton';
import { AboutObjects } from '../components/three/AboutObjects';
import { profile } from '../data/profile';
import { Sparkles, Compass } from 'lucide-react';

const ABOUT_MAIN_PARAGRAPH =
  "I'm a Computer Engineering student at Thapar Institute of Engineering & Technology and co-founder & CTO of a development agency. I focus on engineering intelligent systems that bridge AI research and real-world applications—from autonomous browser agents and local-first RAG pipelines to high-throughput full-stack platforms and immersive 3D digital experiences. I believe in understanding systems deeply, experimenting relentlessly, and shipping technology that solves meaningful problems.";

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
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 overflow-hidden bg-[#0C0C0C] z-10"
      aria-label="About Satvik Ganda"
    >
      {/* 1. Background 3D Corner Geometries (strictly z-0, transparent canvas, pointer-events-none) */}
      <AboutObjects />

      {/* 2. Content Stack (strictly relative z-10) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Section Pill */}
        <FadeIn delay={0} y={20} forceVisible={forceVisible} className="mb-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#5EEAD4] bg-[#11161D] border border-[#1E2733] px-3.5 py-1.5 rounded-full">
            <Compass className="w-3.5 h-3.5" />
            <span>01 // BACKGROUND & PHILOSOPHY</span>
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.05} y={40} forceVisible={forceVisible} className="w-full">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Central Brand Motto */}
        <FadeIn delay={0.12} y={20} forceVisible={forceVisible} className="mt-4 mb-8 sm:mb-12">
          <p className="font-mono text-sm sm:text-base md:text-lg text-[#5EEAD4] tracking-wide max-w-2xl">
            &ldquo;{profile.centralMessage}&rdquo;
          </p>
        </FadeIn>

        {/* AnimatedText paragraph */}
        <div className="w-full max-w-[640px] mx-auto px-4">
          <AnimatedText
            text={ABOUT_MAIN_PARAGRAPH}
            forceVisible={forceVisible}
            className="text-[#D7E2EA] font-normal text-center text-base sm:text-lg md:text-xl leading-relaxed tracking-normal"
          />

          {/* Currently Exploring Grid */}
          <FadeIn delay={0.2} y={20} forceVisible={forceVisible} className="mt-10 sm:mt-12">
            <div className="w-full p-5 sm:p-6 rounded-2xl bg-[#11161D]/80 border border-[#1E2733] text-left">
              <div className="flex items-center gap-2 font-mono text-xs text-[#8AA2FF] uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#5EEAD4]" />
                <span>Currently Exploring</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.currentlyExploring.map((topic) => (
                  <span
                    key={topic}
                    className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#161D28] border border-[#1E2733] text-[#D7E2EA] hover:border-[#5EEAD4]/60 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4]" />
                    <span>{topic}</span>
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Status Row: Pulsing mint dot + TIET class of 2028 + Agency CTO */}
          <FadeIn delay={0.25} y={15} forceVisible={forceVisible} className="mt-6">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs text-[#D7E2EA]/70 bg-[#11161D]/80 border border-[#1E2733] px-4 py-2 rounded-full">
              <span className="flex items-center gap-2 text-[#5EEAD4]">
                <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
                <span>TIET · Computer Engineering (2028)</span>
              </span>
              <span className="text-white/30 hidden sm:inline">•</span>
              <span className="text-white/70">Co-founder & CTO</span>
            </div>
          </FadeIn>
        </div>

        {/* Spacing to Contact Button */}
        <div className="h-12 sm:h-16 md:h-20" />

        {/* Contact Button */}
        <FadeIn delay={0.3} y={20} forceVisible={forceVisible}>
          <ContactButton label="Let's Connect" />
        </FadeIn>
      </div>
    </section>
  );
};
