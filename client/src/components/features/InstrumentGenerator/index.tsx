import Skeleton from '@/components/common/Skeleton';

interface Props {
  selectedInst: string | null;
}

function InstrumentGenerator({ selectedInst }: Props) {
  console.log(selectedInst);
  return <Skeleton className='w-full h-15' />;
}

export default InstrumentGenerator;
