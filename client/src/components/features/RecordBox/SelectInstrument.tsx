import IconBaseGuitar from '@/components/icons/IconBaseGuitar';
import IconDrum from '@/components/icons/IconDrum';
import IconElecGuitar from '@/components/icons/IconElecGuitar';
import IconPiano from '@/components/icons/IconPiano';
import { INSTRUMENT_TYPE } from '@/service/types/Workspace';

interface Props {
  handleNextLevel: () => void;
  setInstrument: (instType: INSTRUMENT_TYPE) => void;
}

function SelectInstrument({ handleNextLevel, setInstrument }: Props) {
  function handleNext(inst: INSTRUMENT_TYPE) {
    handleNextLevel();
    setInstrument(inst);
  }
  return (
    <div className='w-full flex justify-between items-center'>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={() => handleNext(INSTRUMENT_TYPE.GUITAR)}
      >
        {' '}
        <IconElecGuitar color='#000000' />
      </div>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={() => handleNext(INSTRUMENT_TYPE.KEYBOARD)}
      >
        <IconPiano color='#000000' />
      </div>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={() => handleNext(INSTRUMENT_TYPE.DRUM)}
      >
        <IconDrum color='#000000' />
      </div>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={() => handleNext(INSTRUMENT_TYPE.GUITAR)}
      >
        <IconBaseGuitar color='#000000' />
      </div>
    </div>
  );
}

export default SelectInstrument;
