'use client';

import { useEffect, useState } from 'react';

interface Props {
  isRunning: boolean;
  beat: number;
}

function Metronome({ isRunning, beat }: Props) {
  const [metro, setMetro] = useState<number>(-1);
  useEffect(() => {
    if (beat == 32) return;
    if (!isRunning) return;

    const timeoutId = setTimeout(() => {
      setMetro((prevMetro) => (prevMetro === 3 ? 0 : prevMetro + 1));
      beat++;
    }, 450);

    return () => clearTimeout(timeoutId);
  }, [metro, isRunning]);

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
