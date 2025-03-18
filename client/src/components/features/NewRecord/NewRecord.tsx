import Box from '@/components/common/Box';

interface Props {
  initial?: boolean;
  handleCreateInstrument: () => void;
}

function NewRecord({ initial = false, handleCreateInstrument }: Props) {
  return (
    <Box borderStyle='dotted' onClick={handleCreateInstrument}>
      <div className={`w-full py-${initial ? '2' : '4'}`}>
        + 새로운 소리 만들기
      </div>
    </Box>
  );
}

export default NewRecord;
