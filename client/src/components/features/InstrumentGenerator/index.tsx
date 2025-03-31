import Skeleton from '@/components/common/Skeleton';
import { INSTRUMENT_TYPE } from '@/service/types/Workspace';

interface Props {
  selectedInst: INSTRUMENT_TYPE | null;
}

function InstrumentGenerator({ selectedInst }: Props) {
  console.log(selectedInst);
  return <Skeleton className='w-full h-15' />;
}

export default InstrumentGenerator;
