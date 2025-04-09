import IconDrum from '@/components/icons/IconDrum';
import IconTenorSaxophone from '@/components/icons/IconTenorSaxophone';
import IconTrumpet from '@/components/icons/IconTrumpet';
import IconViolin from '@/components/icons/IconViolin';

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
        <IconViolin color='#000000' />
      </div>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={() => handleNext('TRUMPET')}
      >
        <IconTrumpet color='#000000' />
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
        <IconTenorSaxophone color='#000000' />
      </div>
    </div>
  );
}

export default SelectInstrument;
