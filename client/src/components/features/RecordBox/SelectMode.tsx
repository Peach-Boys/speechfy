import IconMagic from '@/components/icons/IconMagic';
import IconMic from '@/components/icons/IconMic';

interface Props {
  handleNextLevel: () => void;
}

function SelectMode({ handleNextLevel }: Props) {
  return (
    <div className='w-full flex justify-around items-center'>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={handleNextLevel}
      >
        <IconMic width={20} height={20} color='#000000' />
      </div>
      <div className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'>
        <IconMagic />
      </div>
    </div>
  );
}

export default SelectMode;
