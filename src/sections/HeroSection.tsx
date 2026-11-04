import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ScrambleText } from '../components/ui/ScrambleText';
import { ContactButton } from '../components/ui/ContactButton';
import { Magnet } from '../components/ui/Magnet';
import { HeroObject } from '../components/three/HeroObject';
import { AvatarControls } from '../components/avatar/AvatarControls';
import { defaultAvatarConfig, AvatarConfig } from '../data/avatar';
import { profile } from '../data/profile';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Build', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const HeroSection: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(defaultAvatarConfig);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none"
    >
      {/* 1. Top Section: Navigation + Elevated Heading (z-10, behind avatar) */}
      <div className="w-full flex flex-col z-10 pointer-events-none">
        {/* Navbar */}
        <motion.nav
          initial={reducedMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 pointer-events-auto"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded px-1"
            >
              <ScrambleText text={link.label} />
            </a>
          ))}
        </motion.nav>

        {/* Hero Heading: Elevated higher up near nav, layered strictly BEHIND the 3D avatar (z-10) */}
        <div className="w-full overflow-hidden px-4 sm:px-6 md:px-8 mt-2 sm:mt-3 md:mt-4 flex justify-center pointer-events-none">
          <motion.h1
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-center text-[12.5vw] sm:text-[13.5vw] md:text-[14.5vw] lg:text-[15.5vw] select-none text-[#E6EEF5]"
          >
            Hi, i&apos;m satvik
          </motion.h1>
        </div>
      </div>

      {/* 2. Interactive 3D Avatar (z-20, stands boldly IN FRONT OF the heading with deep 3D drop shadow) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 w-[320px] h-[400px] sm:w-[410px] sm:h-[490px] md:w-[490px] md:h-[560px] lg:w-[570px] lg:h-[630px] bottom-0 pointer-events-auto flex items-center justify-center overflow-visible">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full flex items-center justify-center overflow-visible drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
        >
          <Magnet
            padding={160}
            strength={3.5}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full h-full flex items-center justify-center overflow-visible"
          >
            <HeroObject config={avatarConfig} />
          </Magnet>
        </motion.div>
      </div>

      {/* 3. Bottom Bar (z-30) */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-30 pointer-events-auto">
        {/* Left column: Tagline */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-3"
        >
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[200px] sm:max-w-[280px] md:max-w-[340px]"
            style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1.25rem)' }}
          >
            {profile.headline}
          </p>

          <div className="font-mono text-[10px] sm:text-xs text-[#D7E2EA]/80 flex items-center gap-1.5">
            <span className="text-[#5EEAD4] animate-cursor-blink font-bold">▍</span>
            <span>{profile.tagline}</span>
          </div>
        </motion.div>

        {/* Right column: Contact Button */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ContactButton />
        </motion.div>
      </div>

      {/* Dev-Only Likeness Calibration Controls */}
      {import.meta.env.DEV && (
        <AvatarControls config={avatarConfig} onChange={setAvatarConfig} />
      )}
    </section>
  );
};
