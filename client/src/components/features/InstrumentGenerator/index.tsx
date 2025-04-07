'use client';

import Skeleton from '@/components/common/Skeleton';
import { useMusicVaeGenerator } from '@/hooks/useMusicVaeGenerator';
import { useEffect } from 'react';

interface Props {
  selectedInst: string | null;
  setGenAudio: (audio: string | null) => void;
}

function InstrumentGenerator({ selectedInst, setGenAudio }: Props) {
  const { generateMelody, loading } = useMusicVaeGenerator(125, 16, 1.1);
  useEffect(() => {
    console.log(selectedInst);
    async function generate() {
      const genAudio = await generateMelody();
      if (genAudio) {
        setGenAudio(genAudio);
      }
    }
    generate();
  }, [selectedInst, generateMelody]);

  return <>{loading && <Skeleton className='w-full h-15' />}</>;
}

export default InstrumentGenerator;
