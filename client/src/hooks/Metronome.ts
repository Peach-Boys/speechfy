import { useEffect, useState } from 'react';

export function useMetronome(isRunning: boolean) {
  const [metro, setMetro] = useState<number>(-1);

  useEffect(() => {
    if (!isRunning) return;

    const timeoutId = setTimeout(() => {
      setMetro((prev) => (prev === 3 ? 0 : prev + 1));
    }, 480); // 기본 125bpm의 시간 480ms

    return () => clearTimeout(timeoutId);
  }, [metro, isRunning]);

  return metro;
}
