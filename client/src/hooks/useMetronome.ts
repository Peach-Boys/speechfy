import playBeep from '@/utils/playBeep';
import { useEffect, useState } from 'react';

export function useMetronome(isRunning: boolean) {
  const [metro, setMetro] = useState<number>(0);

  useEffect(() => {
    if (!isRunning) return;

    playBeep(metro === 0 ? 1000 : 800, 100);

    const timeoutId = setTimeout(() => {
      setMetro((prev) => (prev === 3 ? 0 : prev + 1));
    }, 480); // 기본 125bpm의 시간 480ms

    return () => clearTimeout(timeoutId);
  }, [metro, isRunning]);

  return metro;
}
