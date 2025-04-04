import IconBaseGuitar from '@/components/icons/IconBaseGuitar';
import IconDrum from '@/components/icons/IconDrum';
import IconElecGuitar from '@/components/icons/IconElecGuitar';
import IconPiano from '@/components/icons/IconPiano';

interface Props {
  handleNextLevel: () => void;
  setInstrument: (instType: string) => void;
}

function SelectInstrument({ handleNextLevel, setInstrument }: Props) {
  function handleNext(inst: string) {
    handleNextLevel();
    setInstrument(inst);
  }
  return (
    <div className='w-full flex justify-between items-center'>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={() => handleNext('VIOLIN')}
      >
        {' '}
        <IconElecGuitar color='#000000' />
      </div>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={() => handleNext('TRUMPET')}
      >
        <IconPiano color='#000000' />
      </div>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={() => handleNext('DRUM')}
      >
        <IconDrum color='#000000' />
      </div>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={() => handleNext('TENOR_SAXOPHONE')}
      >
        <IconBaseGuitar color='#000000' />
      </div>
    </div>
  );
}

export default SelectInstrument;
