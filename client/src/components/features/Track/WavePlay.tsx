'use client';

import useWavePlay from '@/hooks/useWavePlay';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Props {
  isPlay: boolean;
}

function WavePlay({ isPlay }: Props) {
  const longIdx = useWavePlay(isPlay);
  const [randomDurations, setRandomDurations] = useState<number[]>(
    Array(20).fill(200)
  );

  useEffect(() => {
    setRandomDurations(
      Array.from({ length: 20 }, () => Math.random() * 100 + 150)
    );
  }, []);

  return (
    <div className='h-12 flex justify-around items-center'>
      {Array.from({ length: 20 }).map((_, idx) => {
        const distance = Math.abs(longIdx - idx);
        const baseScale = 0.5;
        const maxScale = 3;
        const waveEffect = Math.max(baseScale, maxScale - distance * 0.3);

        return (
          <div
            key={idx}
            className={clsx(
              'bg-[#bcbcbc] w-1 h-2 rounded-full transition-transform ease-in-out'
            )}
            style={{
              transform: `scaleY(${waveEffect})`,
              willChange: 'transform',
              transitionDuration: `${randomDurations[idx]}ms`, // 클라이언트에서만 값 설정
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default WavePlay;
