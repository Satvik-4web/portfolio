export interface AvatarGlasses {
  enabled: boolean;
  style: 'round' | 'square' | 'none';
  frameColor: string;
}

export interface AvatarBeard {
  style: 'none' | 'stubble' | 'short' | 'full';
  color: string;
}

export interface AvatarConfig {
  skinTone: string;
  faceShape: 'round' | 'oval' | 'square';
  jawWidth: number;
  cheekFullness: number;
  hairStyle: 'buzz' | 'short' | 'quiff' | 'curly' | 'long' | 'bald';
  hairColor: string;
  hairlineHeight: number;
  eyeColor: string;
  eyeSize: number;
  eyeSpacing: number;
  eyebrowThickness: number;
  eyebrowColor: string;
  noseSize: number;
  earSize: number;
  mouthWidth: number;
  smileAmount: number;
  glasses: AvatarGlasses;
  beard: AvatarBeard;
  shirtColor: string;
  accessories?: 'headphones' | 'cap' | 'none';
}

export const defaultAvatarConfig: AvatarConfig = {
  skinTone: '#DE9B72',
  faceShape: 'oval',
  jawWidth: 1.0,
  cheekFullness: 1.0,
  hairStyle: 'quiff',
  hairColor: '#181518',
  hairlineHeight: 1.0,
  eyeColor: '#2C1D18',
  eyeSize: 1.0,
  eyeSpacing: 1.0,
  eyebrowThickness: 1.1,
  eyebrowColor: '#151214',
  noseSize: 1.0,
  earSize: 1.0,
  mouthWidth: 1.0,
  smileAmount: 0.7,
  glasses: {
    enabled: false,
    style: 'square',
    frameColor: '#1E2733',
  },
  beard: {
    style: 'stubble',
    color: '#1B181A',
  },
  shirtColor: '#141A22',
  accessories: 'none',
};
