'use client';

import { useMetronome } from '@/hooks/useMetronome';

interface Props {
  isRunning: boolean;
  bpm: number;
  onFinish: () => void;
}

function Metronome({ isRunning, bpm, onFinish }: Props) {
  const metro = useMetronome(isRunning, bpm, onFinish);

  return (
    <ul className='w-full flex justify-around'>
      {[0, 1, 2, 3].map((index) => (
        <li
          key={index}
          className={`size-8 rounded-full ${
            metro === index ? 'bg-green-300' : 'bg-gray-400'
          }`}
        ></li>
      ))}
    </ul>
  );
}

export default Metronome;
