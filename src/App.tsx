import { useEffect } from 'react';
import Lenis from 'lenis';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { TechStackSection } from './sections/TechStackSection';
import { FooterSection } from './sections/FooterSection';

export default function App() {
  useEffect(() => {
    // Disable Lenis smooth scrolling if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. What I Build (Services Section) */}
      <ServicesSection />

      {/* 5. Experience / Chronology Section */}
      <ExperienceSection />

      {/* 6. Projects Section (Featured + Additional + GitHub) */}
      <ProjectsSection />

      {/* 7. Tech Stack Section */}
      <TechStackSection />

      {/* 8. Footer & Contact Section */}
      <FooterSection />
    </div>
  );
}
