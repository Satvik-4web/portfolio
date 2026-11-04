import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue, useReducedMotion } from 'framer-motion';

export interface AnimatedTextProps {
  text: string;
  className?: string;
  forceVisible?: boolean;
}

interface CharSpanProps {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  isFullyVisible: boolean;
}

const CharSpan: React.FC<CharSpanProps> = ({ char, progress, start, end, isFullyVisible }) => {
  const dynamicOpacity = useTransform(progress, [start, end], [0.25, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible select-none">{char}</span>
      <motion.span
        className="absolute inset-0 select-text transition-opacity duration-700 ease-out"
        style={{ opacity: isFullyVisible ? 1 : dynamicOpacity }}
      >
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  forceVisible = false,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const prefersReduced = useReducedMotion();
  const [safetyVisible, setSafetyVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Safety net: if paragraph enters viewport, force full reveal after 1.5 seconds
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setSafetyVisible(true);
          }, 1500);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (prefersReduced) {
    return (
      <p ref={containerRef} className={className}>
        {text}
      </p>
    );
  }

  const isFullyVisible = forceVisible || safetyVisible;

  // Count total non-space characters for smooth progression mapping
  const words = text.split(' ');
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <p
      ref={containerRef}
      className={`leading-relaxed ${className}`}
    >
      {words.map((word, wordIdx) => {
        const wordChars = word.split('');
        const renderedWord = (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const start = charCounter / totalChars;
              const end = Math.min(1, (charCounter + 2) / totalChars);
              charCounter++;
              return (
                <CharSpan
                  key={charCounter}
                  char={char}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                  isFullyVisible={isFullyVisible}
                />
              );
            })}
          </span>
        );

        charCounter++; // Account for the space between words

        return (
          <React.Fragment key={wordIdx}>
            {renderedWord}
            {wordIdx < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </p>
  );
};
