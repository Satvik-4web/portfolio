import React, { useState, useRef, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleDuration?: number; // default 300ms
}

const GLYPHS = 'ABCDEF0123456789!<>-_\\/[]{}—=+*^?#________';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  scrambleDuration = 300,
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const intervalRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);

    const startTime = Date.now();
    const len = text.length;

    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / scrambleDuration);
      const settledCount = Math.floor(progress * len);

      let scrambled = '';
      for (let i = 0; i < len; i++) {
        if (i < settledCount) {
          scrambled += text[i];
        } else {
          scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(scrambled);

      if (progress >= 1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(text);
      }
    }, 30);
  }, [text, scrambleDuration]);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setDisplayText(text);
  }, [text]);

  return (
    <span
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
      className={`inline-block font-mono tracking-wider transition-opacity duration-200 hover:opacity-70 ${className}`}
    >
      {displayText}
    </span>
  );
};
