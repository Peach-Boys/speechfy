import IconMagic from '@/components/icons/IconMagic';
import IconMic from '@/components/icons/IconMic';
import clsx from 'clsx';

interface Props {
  instrument: string | null;
  handleNextLevel: () => void;
  setAutoComplete: (isAutoComplete: boolean) => void;
}

function SelectMode({ instrument, handleNextLevel, setAutoComplete }: Props) {
  function handleNext(isAutoComplete: boolean) {
    handleNextLevel();
    setAutoComplete(isAutoComplete);
  }
  return (
    <div className='w-full flex justify-around items-center'>
      <div
        className={clsx(
          'size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer',
          instrument === 'DRUM' ? 'hidden' : 'block'
        )}
        onClick={() => handleNext(false)}
      >
        <IconMic width={20} height={20} color='#000000' />
      </div>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={() => handleNext(true)}
      >
        <IconMagic />
      </div>
    </div>
  );
}

export default SelectMode;
