import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, FileText, ArrowDown } from 'lucide-react';
import { ScrambleText } from '../components/ui/ScrambleText';
import { Magnet } from '../components/ui/Magnet';
import { HeroObject } from '../components/three/HeroObject';
import { AvatarControls } from '../components/avatar/AvatarControls';
import { defaultAvatarConfig, AvatarConfig } from '../data/avatar';
import { profile } from '../data/profile';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Build', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
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

  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none"
    >
      {/* 1. Top Section: Navigation + Elevated Heading (z-10, behind avatar) */}
      <div className="w-full flex flex-col z-10 pointer-events-none">
        {/* Navbar */}
        <motion.nav
          initial={reducedMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full flex items-center justify-between px-4 sm:px-6 md:px-10 pt-5 md:pt-7 pointer-events-auto"
          aria-label="Main Navigation"
        >
          {/* Nav Links */}
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8 flex-wrap">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.15rem] transition-opacity duration-200 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] rounded px-1"
              >
                <ScrambleText text={link.label} />
              </a>
            ))}
          </div>

          {/* Social Quick-Links & Resume Pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-full bg-[#11161D] border border-[#1E2733] text-[#D7E2EA]/80 hover:text-[#5EEAD4] hover:border-[#5EEAD4]/60 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-full bg-[#11161D] border border-[#1E2733] text-[#D7E2EA]/80 hover:text-[#8AA2FF] hover:border-[#8AA2FF]/60 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              download="Satvik_Ganda_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs uppercase px-3.5 py-1.5 rounded-full bg-[#161D28] border border-[#5EEAD4]/50 text-[#5EEAD4] hover:bg-[#5EEAD4] hover:text-[#0C0C0C] transition-all duration-200"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>
        </motion.nav>

        {/* Hero Heading: Layered strictly BEHIND the 3D avatar (z-10) */}
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
      <div className="absolute left-1/2 -translate-x-1/2 z-20 w-[270px] h-[340px] sm:w-[410px] sm:h-[480px] md:w-[490px] md:h-[550px] lg:w-[570px] lg:h-[620px] bottom-16 sm:bottom-0 pointer-events-auto flex items-center justify-center overflow-visible opacity-90 sm:opacity-100">
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
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 pb-6 sm:pb-8 md:pb-10 px-5 sm:px-8 md:px-10 z-30 pointer-events-auto bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/90 to-transparent pt-8 sm:pt-0">
        {/* Left column: Refined Headline & Positioning */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-1.5 sm:space-y-2 max-w-[320px] sm:max-w-[360px] md:max-w-[420px]"
        >
          <div className="font-mono text-[9px] sm:text-xs text-[#5EEAD4] flex items-center gap-1.5 uppercase tracking-wider font-semibold">
            <span className="animate-cursor-blink font-bold">▍</span>
            <span>{profile.role}</span>
          </div>

          <p
            className="text-[#D7E2EA] font-semibold leading-snug tracking-tight text-sm sm:text-base md:text-lg"
          >
            {profile.headline}
          </p>

          <p className="text-[11px] sm:text-xs md:text-sm text-[#D7E2EA]/60 font-light leading-relaxed hidden sm:block">
            {profile.secondaryHeadline}
          </p>
        </motion.div>

        {/* Right column: Dual Primary Actions (Explore My Work & Download Resume) */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-row items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto"
        >
          {/* Action 1: Explore My Work */}
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, '#projects')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 font-medium uppercase tracking-wider text-white rounded-full transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] select-none px-5 py-2.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm whitespace-nowrap"
            style={{
              background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow: '0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset',
              outline: '2px solid rgba(255, 255, 255, 0.85)',
              outlineOffset: '-3px',
            }}
          >
            <span>Explore Work</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          {/* Action 2: Download Resume */}
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            download="Satvik_Ganda_Resume.pdf"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 font-mono uppercase tracking-wider text-xs sm:text-sm px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-[#11161D] border border-[#1E2733] hover:border-[#5EEAD4] text-[#D7E2EA] hover:text-[#5EEAD4] transition-all duration-200 active:scale-95 whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-[#5EEAD4]" />
            <span>Resume</span>
          </a>
        </motion.div>
      </div>

      {/* Dev-Only Likeness Calibration Controls */}
      {import.meta.env.DEV && (
        <AvatarControls config={avatarConfig} onChange={setAvatarConfig} />
      )}
    </section>
  );
};
