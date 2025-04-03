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

function Background({ imgSrc, children }: Props) {
  const [colors, setColors] = useState<IColor[]>([]);

  useEffect(() => {
    if (imgSrc) {
      const image = new Image();
      image.crossOrigin = 'anonymouse';
      image.src = imgSrc;
      image.onload = () => {
        setColors(ColorThief.getPalette(new CanvasImage(image), 2));
      };
    }
  }, []);

  return (
    <div
      className='w-full h-full'
      style={{
        background:
          colors.length > 0
            ? `linear-gradient(135deg, rgb(${colors[0].r / 2},${colors[0].g / 2},${colors[0].b / 2}) 0%,rgb(${colors[1].r / 2},${colors[1].g / 2},${colors[1].b / 2}) 100%)`
            : 'linear-gradient(330deg,rgb(255,255,255,0.5),rgb(255,255,255,0)',
      }}
    >
      {children}
    </div>
  );
}

export default Background;
