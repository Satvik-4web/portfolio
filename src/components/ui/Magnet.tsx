import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('translate3d(0px, 0px, 0px)');
  const [transition, setTransition] = useState<string>(inactiveTransition);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    // Check touch devices or prefers-reduced-motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reducedMotion) {
      setIsDisabled(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      const triggerRadius = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < triggerRadius) {
        setTransition(activeTransition);
        const moveX = distX / strength;
        const moveY = distY / strength;
        setTransform(`translate3d(${moveX}px, ${moveY}px, 0px)`);
      } else {
        setTransition(inactiveTransition);
        setTransform('translate3d(0px, 0px, 0px)');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  if (isDisabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform,
        transition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
