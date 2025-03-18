import { useEffect, useState } from 'react';

interface Props {
  start: boolean;
  initialCount: number;
}

function useCountDown({ start, initialCount = 0 }: Props) {
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    if (!start) {
      setCount(initialCount);
      return;
    }
    if (count > 4) return;

    const timer = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 480); // 기본 125bpm의 시간 480ms

    return () => clearTimeout(timer);
  }, [start, count, initialCount]);

  return count;
}

export default useCountDown;
