import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'p' | 'h1' | 'h2' | 'li' | 'ul' | 'article' | 'nav';
  forceVisible?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as = 'div',
  forceVisible = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '50px 0px 50px 0px' });
  const [safetyVisible, setSafetyVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Safety net: if the element enters the viewport, force it visible after 1.5s
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setSafetyVisible(true);
          }, 1500);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (prefersReduced) {
    return React.createElement(as, { className, ref }, children);
  }

  const MotionComponent = motion[as] as typeof motion.div;
  const isVisible = inView || safetyVisible || forceVisible;

  return (
    <MotionComponent
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        duration,
        delay: safetyVisible || forceVisible ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};
