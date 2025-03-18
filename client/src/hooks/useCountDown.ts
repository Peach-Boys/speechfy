import playBeep from '@/utils/playBeep';
import { useEffect, useState } from 'react';

interface Props {
  start: boolean;
  initialCount: number;
}

function useCountDown({ start, initialCount = 1 }: Props) {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    if (!start) {
      setCount(initialCount);
      return;
    }
    if (count > 4) return;

    playBeep(count === 1 ? 1000 : 800, 100);

    const timer = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 480); // 기본 125bpm의 시간 480ms

    return () => clearTimeout(timer);
  }, [start, count, initialCount]);

  return count;
}

export default useCountDown;
