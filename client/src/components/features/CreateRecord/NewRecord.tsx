import Box from '@/components/common/Box';
import React, { SetStateAction } from 'react';

interface Props {
  initial: boolean;
  setIsCreate: React.Dispatch<SetStateAction<boolean>>;
}

function NewRecord({ initial, setIsCreate }: Props) {
  return (
    <Box borderStyle='dotted' onClick={() => setIsCreate(true)}>
      <div className={`w-full ${initial ? 'py-4' : 'py-2'}`}>
        + 새로운 소리 만들기
      </div>
    </Box>
  );
}

export default NewRecord;
