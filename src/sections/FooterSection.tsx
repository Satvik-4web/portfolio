import React from 'react';
import { profile } from '../data/profile';
import { ContactButton } from '../components/ui/ContactButton';
import { FadeIn } from '../components/ui/FadeIn';
import { ArrowUp } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative w-full min-h-[70vh] flex flex-col justify-between items-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-16 text-center select-none z-10"
      aria-label="Footer and Contact"
    >
      {/* Top spacer */}
      <div />

      {/* Center call to action */}
      <div className="w-full max-w-4xl mx-auto my-auto flex flex-col items-center gap-10 py-12">
        <FadeIn delay={0} y={30} className="w-full">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight select-none"
            style={{ fontSize: 'clamp(3.5rem, 13vw, 170px)' }}
          >
            Let&apos;s build
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={20}>
          <ContactButton label="Contact Me" />
        </FadeIn>

        {/* Dynamic Mono Links: Rendered ONLY if the value is non-empty */}
        <FadeIn delay={0.25} y={15} className="mt-4">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-mono text-xs sm:text-sm text-[#D7E2EA]/70">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#5EEAD4] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#5EEAD4] rounded"
              >
                [ github ]
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8AA2FF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8AA2FF] rounded"
              >
                [ linkedin ]
              </a>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-[#F5C26B] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F5C26B] rounded"
              >
                [ email ]
              </a>
            )}

            {profile.agencyUrl && (
              <a
                href={profile.agencyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FB7185] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FB7185] rounded"
              >
                [ {profile.agencyName || 'agency'} ]
              </a>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Bottom bar with copyright motto and Back to Top */}
      <div className="w-full max-w-6xl mx-auto pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#1E2733]/60 font-mono text-xs text-[#D7E2EA]/60">
        <div>
          <span>© 2026 {profile.name} · {profile.tagline}</span>
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
