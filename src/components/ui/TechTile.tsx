import React from 'react';
import { TechItem } from '../../data/stack';

export const TechTile: React.FC<{ tech: TechItem }> = ({ tech }) => {
  const renderGlyph = () => {
    switch (tech.id) {
      case 'nextjs':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="86" stroke="#D7E2EA" strokeWidth="6" />
            <path d="M149 148L74 46H52V134H70V72L135 156C140 154 145 151 149 148Z" fill="#D7E2EA" />
            <rect x="110" y="46" width="18" height="64" fill="#D7E2EA" />
          </svg>
        );
      case 'react':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none" stroke="#D7E2EA">
            <ellipse cx="50" cy="50" rx="42" ry="16" strokeWidth="3" transform="rotate(0 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="16" strokeWidth="3" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="42" ry="16" strokeWidth="3" transform="rotate(120 50 50)" />
            <circle cx="50" cy="50" r="6" fill="#5EEAD4" />
          </svg>
        );
      case 'typescript':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" rx="16" fill="#161D28" stroke="#D7E2EA" strokeWidth="4" />
            <path d="M26 36H54M40 36V74" stroke="#D7E2EA" strokeWidth="6" strokeLinecap="round" />
            <path d="M58 64C62 70 70 72 76 68C82 64 80 54 72 52C64 50 60 44 64 38C68 32 76 34 80 38" stroke="#8AA2FF" strokeWidth="6" strokeLinecap="round" />
          </svg>
        );
      case 'tailwind':
        return (
          <svg className="w-[80px] h-[80px]" viewBox="0 0 24 24" fill="none">
            <path
              d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 0.913 0.228 1.565 0.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-0.913-0.228-1.565-0.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8z"
              fill="#5EEAD4"
            />
            <path
              d="M6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 0.913 0.228 1.565 0.89 2.288 1.624c1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-0.913-0.228-1.565-0.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
              fill="#D7E2EA"
            />
          </svg>
        );
      case 'framer':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <path d="M20 15H80V50H50L80 85H20V50H50L20 15Z" fill="#D7E2EA" />
            <path d="M50 50L20 85V50H50Z" fill="#FB7185" />
          </svg>
        );
      case 'zustand':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none" stroke="#D7E2EA" strokeWidth="4">
            <circle cx="50" cy="56" r="32" stroke="#D7E2EA" />
            <circle cx="30" cy="28" r="14" stroke="#F5C26B" fill="#F5C26B" fillOpacity="0.2" />
            <circle cx="70" cy="28" r="14" stroke="#F5C26B" fill="#F5C26B" fillOpacity="0.2" />
            <ellipse cx="50" cy="62" rx="14" ry="10" stroke="#5EEAD4" />
            <circle cx="40" cy="50" r="3" fill="#D7E2EA" />
            <circle cx="60" cy="50" r="3" fill="#D7E2EA" />
          </svg>
        );
      case 'supabase':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <path d="M55 12L20 54H50L45 88L80 46H50L55 12Z" fill="#5EEAD4" />
          </svg>
        );
      case 'redis':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <path d="M50 15L85 32V68L50 85L15 68V32L50 15Z" stroke="#D7E2EA" strokeWidth="4" />
            <path d="M50 15V85M15 32L85 68M85 32L15 68" stroke="#FB7185" strokeWidth="2.5" />
          </svg>
        );
      case 'vercel':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <polygon points="50,15 90,85 10,85" fill="#D7E2EA" />
          </svg>
        );
      case 'nodejs':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <path d="M50 12L85 32V72L50 92L15 72V32L50 12Z" stroke="#5EEAD4" strokeWidth="4" />
            <path d="M38 68V36L62 68V36" stroke="#D7E2EA" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );
      case 'express':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="#8AA2FF" strokeWidth="3" />
            <path d="M32 38H68M32 50H58M32 62H68" stroke="#D7E2EA" strokeWidth="4" strokeLinecap="round" />
            <path d="M64 46L74 50L64 54" stroke="#8AA2FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'laravel':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <path d="M50 15L85 30V70L50 85L15 70V30L50 15Z" stroke="#FB7185" strokeWidth="4" />
            <path d="M50 38L70 48V68L50 78L30 68V48L50 38Z" fill="#FB7185" fillOpacity="0.25" stroke="#D7E2EA" strokeWidth="2.5" />
          </svg>
        );
      case 'php':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="50" rx="44" ry="26" stroke="#8AA2FF" strokeWidth="4" />
            <text x="50" y="58" textAnchor="middle" fill="#D7E2EA" fontSize="24" fontFamily="monospace" fontWeight="bold">
              PHP
            </text>
          </svg>
        );
      case 'oracle':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="28" rx="35" ry="12" stroke="#FB7185" strokeWidth="4" />
            <path d="M15 28V72C15 79 31 84 50 84C69 84 85 79 85 72V28" stroke="#FB7185" strokeWidth="4" />
            <path d="M15 50C15 57 31 62 50 62C69 62 85 57 85 50" stroke="#D7E2EA" strokeWidth="3" />
          </svg>
        );
      case 'plsql':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <rect x="15" y="20" width="70" height="60" rx="8" stroke="#F5C26B" strokeWidth="4" />
            <path d="M28 40L38 50L28 60M46 60H65" stroke="#D7E2EA" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );
      case 'sqlite':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="30" rx="36" ry="12" stroke="#5EEAD4" strokeWidth="4" />
            <path d="M14 30V68C14 75 30 80 50 80C70 80 86 75 86 68V30" stroke="#5EEAD4" strokeWidth="4" />
            <path d="M34 50L66 50" stroke="#D7E2EA" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );
      case 'python':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <path d="M48 15C32 15 33 22 33 22V29H49V31H26C26 31 16 30 16 45C16 60 23 58 23 58H28V51C28 51 28 42 37 42H53C53 42 61 42 61 35V22C61 22 62 15 48 15Z" fill="#F5C26B" />
            <path d="M52 85C68 85 67 78 67 78V71H51V69H74C74 69 84 70 84 55C84 40 77 42 77 42H72V49C72 49 72 58 63 58H47C47 58 39 58 39 65V78C39 78 38 85 52 85Z" fill="#8AA2FF" />
            <circle cx="39" cy="22" r="3" fill="#0C0C0C" />
            <circle cx="61" cy="78" r="3" fill="#0C0C0C" />
          </svg>
        );
      case 'scikit':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="38" stroke="#F5C26B" strokeWidth="3" />
            <circle cx="35" cy="45" r="14" fill="#F5C26B" fillOpacity="0.4" stroke="#D7E2EA" strokeWidth="2.5" />
            <circle cx="62" cy="56" r="18" fill="#8AA2FF" fillOpacity="0.4" stroke="#8AA2FF" strokeWidth="2.5" />
          </svg>
        );
      case 'numpy':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <rect x="20" y="20" width="60" height="60" rx="8" stroke="#8AA2FF" strokeWidth="3" />
            <path d="M20 40H80M20 60H80M40 20V80M60 20V80" stroke="#D7E2EA" strokeWidth="2" strokeOpacity="0.6" />
            <text x="50" y="58" textAnchor="middle" fill="#8AA2FF" fontSize="22" fontFamily="monospace" fontWeight="bold">
              NP
            </text>
          </svg>
        );
      case 'pandas':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <rect x="18" y="22" width="64" height="56" rx="6" stroke="#FB7185" strokeWidth="3" />
            <rect x="26" y="32" width="10" height="36" fill="#FB7185" />
            <rect x="42" y="44" width="10" height="24" fill="#5EEAD4" />
            <rect x="58" y="36" width="10" height="32" fill="#D7E2EA" />
          </svg>
        );
      case 'threejs':
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <path d="M50 14L86 76H14L50 14Z" stroke="#5EEAD4" strokeWidth="4" />
            <path d="M50 14V76M14 76L68 45M86 76L32 45" stroke="#D7E2EA" strokeWidth="2.5" />
          </svg>
        );
      default:
        return (
          <svg className="w-[100px] h-[100px]" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="36" stroke="#D7E2EA" strokeWidth="4" />
          </svg>
        );
    }
  };

  return (
    <div
      className="w-[420px] h-[270px] shrink-0 rounded-2xl p-7 flex flex-col justify-between select-none relative overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: '#11161D',
        border: '1px solid #1E2733',
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(30, 39, 51, 0.45) 0%, transparent 75%)',
      }}
    >
      {/* Top row: Status indicator + Tech Name */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight text-[#D7E2EA] font-sans">
          {tech.name}
        </span>
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: tech.accent }}
        />
      </div>

      {/* Center Tech Glyph: Uniform 100x100 centered container */}
      <div className="flex items-center justify-center my-auto">
        <div className="w-[100px] h-[100px] flex items-center justify-center shrink-0">
          {renderGlyph()}
        </div>
      </div>

      {/* Bottom Mono Caption */}
      <div className="flex items-center justify-between font-mono text-xs text-[#D7E2EA]/60 border-t border-[#1E2733]/60 pt-3">
        <span>{tech.caption}</span>
        <span className="text-[10px] text-white/30">#STACK</span>
      </div>
    </div>
  );
};
