import React, { useState } from 'react';
import { profile } from '../data/profile';
import { FadeIn } from '../components/ui/FadeIn';
import { ArrowUp, Mail, Copy, Check, FileText, Phone, Github, Linkedin, ExternalLink } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <footer
      id="contact"
      className="relative w-full min-h-[75vh] flex flex-col justify-between items-center bg-[#0C0C0C] px-5 sm:px-8 md:px-12 py-20 text-center select-none z-10 border-t border-[#1E2733]"
      aria-label="Footer and Contact"
    >
      {/* Top spacer */}
      <div />

      {/* Center call to action */}
      <div className="w-full max-w-4xl mx-auto my-auto flex flex-col items-center gap-8 py-10">
        <FadeIn delay={0} y={30} className="w-full">
          <span className="font-mono text-xs uppercase tracking-widest text-[#5EEAD4] block mb-3">
            06 // INITIATE TRANSMISSION
          </span>
          <h2
            className="hero-heading font-black uppercase leading-tight tracking-tight select-none"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
          >
            Have an interesting problem?
            <br />
            <span className="text-[#5EEAD4]">Let&apos;s build something.</span>
          </h2>
        </FadeIn>

        {/* Action Buttons: Send Email & Download Resume */}
        <FadeIn delay={0.15} y={20} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Email button */}
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center justify-center gap-2.5 font-medium uppercase tracking-widest text-white rounded-full transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] select-none px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm w-full sm:w-auto"
            style={{
              background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow: '0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset',
              outline: '2px solid rgba(255, 255, 255, 0.85)',
              outlineOffset: '-3px',
            }}
          >
            <Mail className="w-4 h-4" />
            <span>Send An Email</span>
          </a>

          {/* Copy Email Button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center gap-2 font-mono text-xs uppercase px-6 py-3.5 sm:py-4 rounded-full bg-[#11161D] border border-[#1E2733] hover:border-[#5EEAD4] text-[#D7E2EA] hover:text-[#5EEAD4] transition-all duration-200 active:scale-95 w-full sm:w-auto"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#5EEAD4]" />
                <span className="text-[#5EEAD4]">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{profile.email}</span>
              </>
            )}
          </button>

          {/* Resume Download */}
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            download="Satvik_Ganda_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 font-mono text-xs uppercase px-6 py-3.5 sm:py-4 rounded-full bg-[#161D28] border border-[#8AA2FF]/60 hover:bg-[#8AA2FF] hover:text-[#0C0C0C] text-[#8AA2FF] transition-all duration-200 active:scale-95 w-full sm:w-auto"
          >
            <FileText className="w-4 h-4" />
            <span>Resume (PDF)</span>
          </a>
        </FadeIn>

        {/* Direct Connect Grid: Phone, GitHub, LinkedIn, Agency */}
        <FadeIn delay={0.25} y={15} className="mt-4">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-mono text-xs sm:text-sm text-[#D7E2EA]/75">
            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-[#5EEAD4] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{profile.phone}</span>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#5EEAD4] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#8AA2FF] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            {profile.agencyUrl && (
              <a
                href={profile.agencyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#FB7185] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{profile.agencyRole}</span>
              </a>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Bottom bar with copyright motto and Back to Top */}
      <div className="w-full max-w-6xl mx-auto pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#1E2733]/60 font-mono text-xs text-[#D7E2EA]/60">
        <div className="text-center sm:text-left">
          <span>© 2026 {profile.fullName} · {profile.tagline}</span>
          <span className="block sm:inline sm:ml-2 text-white/40">Thapar Institute of Engineering & Technology</span>
        </div>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#11161D] border border-[#1E2733] hover:border-[#5EEAD4] hover:text-[#5EEAD4] transition-all duration-200 active:scale-95"
        >
          <span>back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
