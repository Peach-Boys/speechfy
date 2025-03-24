import playBeep from '@/utils/playBeep';
import { useEffect, useState } from 'react';

export function useMetronome(
  isRunning: boolean,
  bpm: number = 125,
  onFinish: () => void
) {
  const [metro, setMetro] = useState<number>(0);
  const [beatCount, setBeatCount] = useState<number>(0);

  useEffect(() => {
    if (!isRunning) return;

    if (beatCount >= 32) {
      onFinish();
      return;
    }

    playBeep(metro === 0 ? 1000 : 800, 100);
    const time = 60000 / bpm;
    const timeoutId = setTimeout(() => {
      setMetro((prev) => (prev === 3 ? 0 : prev + 1));
      setBeatCount((prev) => prev + 1);
    }, time); // 기본 125bpm의 시간 480ms

    return () => clearTimeout(timeoutId);
  }, [metro, isRunning]);

  return metro;
}
