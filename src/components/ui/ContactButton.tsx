import React from 'react';
import { profile } from '../../data/profile';

interface ContactButtonProps {
  className?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  className = '',
  label = "Contact Me"
}) => {
  const targetUrl = profile.email
    ? `mailto:${profile.email}`
    : (profile.github || 'https://github.com/Satvik-4web');

  return (
    <a
      href={targetUrl}
      target={profile.email ? undefined : "_blank"}
      rel={profile.email ? undefined : "noopener noreferrer"}
      className={`inline-flex items-center justify-center font-medium uppercase tracking-widest text-white rounded-full transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] select-none px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid rgba(255, 255, 255, 0.85)',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </a>
  );
};
