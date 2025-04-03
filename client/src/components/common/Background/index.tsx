'use client';

import CanvasImage from '@/lib/CanvasImage';
import ColorThief from '@/lib/ColorThief';
import React, { useEffect, useState } from 'react';

interface IColor {
  r: number;
  g: number;
  b: number;
}

interface Props {
  imgSrc: string;
  children: React.ReactNode;
}

/**
 *
 * @param {IColor} color - RBG 색상 객체
 * @returns {number} 밝기 값 (0 ~ 255)
 */
function getBrightness(color: IColor): number {
  return 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
}

/**
 * @param {string} imgSrc - 배경 이미지
 * @returns 배경 wrapper
 */
function Background({ imgSrc, children }: Props) {
  const [colors, setColors] = useState<IColor[]>([]);
  const [textColorClass, setTextColorClass] = useState('text-white');

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imgSrc || '/images/defaultImage.png';
    image.onload = () => {
      try {
        const palette = ColorThief.getPalette(new CanvasImage(image), 2);
        const [c1, c2] = palette;

        const sorted = [c1, c2].sort(
          (a, b) => getBrightness(b) - getBrightness(a)
        );
        setColors(sorted);

        const brightness = getBrightness(sorted[0]);
        setTextColorClass(brightness > 180 ? 'text-black' : 'text-white');
      } catch (e) {
        console.error(e);
      }
    };
  }, [imgSrc]);

  const backgroundGradient =
    colors.length > 0
      ? `radial-gradient(circle at center, 
          rgba(${colors[0].r}, ${colors[0].g}, ${colors[0].b}, 0.75) 0%, 
          rgba(${colors[1].r}, ${colors[1].g}, ${colors[1].b}, 0.4) 100%)`
      : `radial-gradient(circle at center, rgba(20,20,20,0.6), rgba(0,0,0,0.3))`;

  return (
    <div
      className='w-full h-full relative overflow-hidden'
      style={{
        background: backgroundGradient,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'background 0.4s ease-in-out',
      }}
    >
      <div className={`relative z-10 ${textColorClass}`}>{children}</div>
    </div>
  );
}

export default Background;
