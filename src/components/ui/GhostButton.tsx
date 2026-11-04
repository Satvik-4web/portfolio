import React from 'react';

interface GhostButtonProps {
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export const GhostButton: React.FC<GhostButtonProps> = ({
  href,
  onClick,
  icon,
  children,
  className = '',
  target = "_blank",
  rel = "noopener noreferrer",
}) => {
  const commonClasses = `inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-all duration-200 hover:bg-[#D7E2EA]/10 hover:border-white hover:text-white active:scale-[0.98] select-none ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={commonClasses}>
        {icon && <span className="inline-flex items-center text-current">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={commonClasses}>
      {icon && <span className="inline-flex items-center text-current">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
