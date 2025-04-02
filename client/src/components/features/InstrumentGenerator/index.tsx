'use client';

import Skeleton from '@/components/common/Skeleton';
import { useMusicVaeGenerator } from '@/hooks/useMusicVaeGenerator';

interface Props {
  selectedInst: string | null;
}

function InstrumentGenerator({ selectedInst }: Props) {
  const { audioURL } = useMusicVaeGenerator(125, 16, 1.1);
  console.log(selectedInst, audioURL);
  return <Skeleton className='w-full h-15' />;
}

export default InstrumentGenerator;
