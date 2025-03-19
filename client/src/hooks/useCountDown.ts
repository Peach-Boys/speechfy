import playBeep from '@/utils/playBeep';
import { useEffect, useState } from 'react';

function useCountDown(
  start: boolean,
  initialCount: number = 1,
  bpm: number = 125
) {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    if (!start) {
      setCount(initialCount);
      return;
    }
    if (count > 4) return;

    playBeep(count === 1 ? 1000 : 800, 100);

    const time = 60000 / bpm;
    const timer = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, time); // 기본 125bpm의 시간 480ms

    return () => clearTimeout(timer);
  }, [start, count, initialCount]);

  return count;
}

export default useCountDown;
