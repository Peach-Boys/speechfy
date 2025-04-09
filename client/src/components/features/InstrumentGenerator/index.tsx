'use client';

import Skeleton from '@/components/common/Skeleton';
import { useDrumGenerator } from '@/hooks/useDrumGenerator';
import { useMusicVaeGenerator } from '@/hooks/useMusicVaeGenerator';
import { useEffect } from 'react';
const SEED_PATTERN_8BEAT: number[][] = [
  [0, 2],
  [],
  [2],
  [],
  [1, 2],
  [],
  [2],
  [],
  [0, 2],
  [],
  [2],
  [],
  [1, 2],
  [],
  [2],
  [3],
];
interface Props {
  selectedInst: string | null;
  setGenAudio: (audio: string | null) => void;
}

function InstrumentGenerator({ selectedInst, setGenAudio }: Props) {
  const { generateMelody, loading: melodyLoading } = useMusicVaeGenerator(
    125,
    16,
    1.1
  );
  const { loading: drumLoading, generateDrumBeat } = useDrumGenerator(
    SEED_PATTERN_8BEAT,
    125,
    8
  );
  useEffect(() => {
    console.log(selectedInst);
    async function generate() {
      if (selectedInst === 'DRUM') {
        const genAudio = await generateDrumBeat();
        if (genAudio) {
          setGenAudio(genAudio);
        }
        return;
      }
      const genAudio = await generateMelody();
      if (genAudio) {
        setGenAudio(genAudio);
      }
    }
    generate();
  }, [selectedInst, generateMelody]);

  return (
    <>
      {(melodyLoading || drumLoading) && <Skeleton className='w-full h-15' />}
    </>
  );
}

export default InstrumentGenerator;
