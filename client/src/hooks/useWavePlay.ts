import { useEffect, useRef, useState } from 'react';

function useWavePlay(isPlay: boolean) {
  const [longIdx, setLongIdx] = useState<number>(-1);
  const [direction, setDirection] = useState<number>(1); // 1이면 오른쪽, -1이면 왼쪽
  const aniRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    if (!isPlay) {
      setLongIdx(-1);
      return;
    }

    const animate = (time: number) => {
      if (time - lastTimeRef.current >= 100) {
        setLongIdx((prev) => {
          if (prev === 19) {
            setDirection(-1);
            return 18;
          } else if (prev === 0) {
            setDirection(1);
            return 1;
          }
          return prev + direction;
        });

        lastTimeRef.current = time;
      }

      aniRef.current = requestAnimationFrame(animate);
    };

    aniRef.current = requestAnimationFrame(animate);

    return () => {
      if (aniRef.current) {
        cancelAnimationFrame(aniRef.current);
      }
    };
  }, [isPlay, direction]);

  return longIdx;
}

export default useWavePlay;
