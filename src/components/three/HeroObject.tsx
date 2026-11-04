import React, { useState, useEffect } from 'react';
import { defaultAvatarConfig, AvatarConfig } from '../../data/avatar';
import { AvatarCanvas } from '../avatar/AvatarCanvas';
import { AvatarControls } from '../avatar/AvatarControls';

interface HeroObjectProps {
  config?: AvatarConfig;
}

export const HeroObject: React.FC<HeroObjectProps> = ({ config }) => {
  const [hasPortraitPng, setHasPortraitPng] = useState<boolean | null>(null);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(config || defaultAvatarConfig);

  useEffect(() => {
    // Check if user has dropped an explicit portrait.png cutout
    const img = new Image();
    img.src = '/portrait.png';
    img.onload = () => setHasPortraitPng(true);
    img.onerror = () => setHasPortraitPng(false);
  }, []);

  if (hasPortraitPng === true) {
    return (
      <img
        src="/portrait.png"
        alt="Satvik - Full-Stack Developer & CTO"
        className="w-full h-full object-contain object-bottom pointer-events-none select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        loading="eager"
      />
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      {/* 3D Toon Avatar Canvas */}
      <AvatarCanvas config={avatarConfig} className="w-full h-full" />

      {/* DEV-Only Leva Control Panel */}
      {import.meta.env.DEV && (
        <AvatarControls config={avatarConfig} onChange={setAvatarConfig} />
      )}
    </div>
  );
};
