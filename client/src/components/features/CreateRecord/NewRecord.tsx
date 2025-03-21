import Box from '@/components/common/Box';
import { useRecordStatusStore } from '@/stores/recordStatusStore';

interface Props {
  initial: boolean;
}

function NewRecord({ initial = false }: Props) {
  const { setRecordStatus } = useRecordStatusStore();
  return (
    <Box borderStyle='dotted' onClick={() => setRecordStatus(true)}>
      <div className={`w-full ${initial ? 'py-4' : 'py-2'}`}>
        + 새로운 소리 만들기
      </div>
    </Box>
  );
}

export default NewRecord;
