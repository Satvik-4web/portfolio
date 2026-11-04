import React, { useEffect } from 'react';
import { useControls, button, folder, Leva } from 'leva';
import { AvatarConfig } from '../../data/avatar';

interface AvatarControlsProps {
  config: AvatarConfig;
  onChange: (config: AvatarConfig) => void;
}

export const AvatarControls: React.FC<AvatarControlsProps> = ({ config, onChange }) => {
  const [values] = useControls(
    'Satvik Avatar Config',
    () => ({
      Head: folder(
        {
          skinTone: { value: config.skinTone },
          faceShape: { value: config.faceShape, options: ['oval', 'round', 'square'] },
          jawWidth: { value: config.jawWidth, min: 0.7, max: 1.4, step: 0.05 },
          cheekFullness: { value: config.cheekFullness, min: 0.7, max: 1.4, step: 0.05 },
        },
        { collapsed: true }
      ),
      Hair: folder(
        {
          hairStyle: {
            value: config.hairStyle,
            options: ['quiff', 'short', 'buzz', 'curly', 'long', 'bald'],
          },
          hairColor: { value: config.hairColor },
          hairlineHeight: { value: config.hairlineHeight, min: 0.8, max: 1.3, step: 0.05 },
        },
        { collapsed: true }
      ),
      Eyes: folder(
        {
          eyeColor: { value: config.eyeColor },
          eyeSize: { value: config.eyeSize, min: 0.7, max: 1.4, step: 0.05 },
          eyeSpacing: { value: config.eyeSpacing, min: 0.7, max: 1.4, step: 0.05 },
          eyebrowThickness: { value: config.eyebrowThickness, min: 0.6, max: 1.8, step: 0.05 },
          eyebrowColor: { value: config.eyebrowColor },
        },
        { collapsed: true }
      ),
      Features: folder(
        {
          noseSize: { value: config.noseSize, min: 0.7, max: 1.4, step: 0.05 },
          earSize: { value: config.earSize, min: 0.7, max: 1.4, step: 0.05 },
          mouthWidth: { value: config.mouthWidth, min: 0.7, max: 1.4, step: 0.05 },
          smileAmount: { value: config.smileAmount, min: 0.0, max: 1.0, step: 0.05 },
        },
        { collapsed: true }
      ),
      FacialHair: folder(
        {
          beardStyle: {
            value: config.beard.style,
            options: ['stubble', 'short', 'full', 'none'],
          },
          beardColor: { value: config.beard.color },
        },
        { collapsed: true }
      ),
      Glasses: folder(
        {
          glassesEnabled: { value: config.glasses.enabled },
          glassesStyle: {
            value: config.glasses.style,
            options: ['square', 'round', 'none'],
          },
          glassesColor: { value: config.glasses.frameColor },
        },
        { collapsed: true }
      ),
      Attire: folder(
        {
          shirtColor: { value: config.shirtColor },
          accessories: {
            value: (config.accessories || 'none') as 'none' | 'headphones',
            options: ['none', 'headphones'],
          },
        },
        { collapsed: true }
      ),
      Actions: folder({
        'Copy Config TS': button((get: any) => {
          const exportConfig: AvatarConfig = {
            skinTone: get('Head.skinTone'),
            faceShape: get('Head.faceShape'),
            jawWidth: get('Head.jawWidth'),
            cheekFullness: get('Head.cheekFullness'),
            hairStyle: get('Hair.hairStyle'),
            hairColor: get('Hair.hairColor'),
            hairlineHeight: get('Hair.hairlineHeight'),
            eyeColor: get('Eyes.eyeColor'),
            eyeSize: get('Eyes.eyeSize'),
            eyeSpacing: get('Eyes.eyeSpacing'),
            eyebrowThickness: get('Eyes.eyebrowThickness'),
            eyebrowColor: get('Eyes.eyebrowColor'),
            noseSize: get('Features.noseSize'),
            earSize: get('Features.earSize'),
            mouthWidth: get('Features.mouthWidth'),
            smileAmount: get('Features.smileAmount'),
            glasses: {
              enabled: get('Glasses.glassesEnabled'),
              style: get('Glasses.glassesStyle'),
              frameColor: get('Glasses.glassesColor'),
            },
            beard: {
              style: get('FacialHair.beardStyle'),
              color: get('FacialHair.beardColor'),
            },
            shirtColor: get('Attire.shirtColor'),
            accessories: get('Attire.accessories'),
          };

          const formattedTs = `export const defaultAvatarConfig: AvatarConfig = ${JSON.stringify(
            exportConfig,
            null,
            2
          )};\n`;

          navigator.clipboard.writeText(formattedTs).then(() => {
            alert('Avatar config copied to clipboard! You can paste it into src/data/avatar.ts');
          });
        }),
      }),
    }),
    { collapsed: true }
  );

  useEffect(() => {
    onChange({
      skinTone: values.skinTone,
      faceShape: values.faceShape as AvatarConfig['faceShape'],
      jawWidth: values.jawWidth,
      cheekFullness: values.cheekFullness,
      hairStyle: values.hairStyle as AvatarConfig['hairStyle'],
      hairColor: values.hairColor,
      hairlineHeight: values.hairlineHeight,
      eyeColor: values.eyeColor,
      eyeSize: values.eyeSize,
      eyeSpacing: values.eyeSpacing,
      eyebrowThickness: values.eyebrowThickness,
      eyebrowColor: values.eyebrowColor,
      noseSize: values.noseSize,
      earSize: values.earSize,
      mouthWidth: values.mouthWidth,
      smileAmount: values.smileAmount,
      glasses: {
        enabled: values.glassesEnabled,
        style: values.glassesStyle as AvatarConfig['glasses']['style'],
        frameColor: values.glassesColor,
      },
      beard: {
        style: values.beardStyle as AvatarConfig['beard']['style'],
        color: values.beardColor,
      },
      shirtColor: values.shirtColor,
      accessories: values.accessories as AvatarConfig['accessories'],
    });
  }, [values, onChange]);

  return <Leva collapsed={true} />;
};
