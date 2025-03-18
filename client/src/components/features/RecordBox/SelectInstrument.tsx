import IconBaseGuitar from '@/components/icons/IconBaseGuitar';
import IconDrum from '@/components/icons/IconDrum';
import IconElecGuitar from '@/components/icons/IconElecGuitar';
import IconPiano from '@/components/icons/IconPiano';

interface Props {
  handleNextLevel: () => void;
}

function SelectIndstrument({ handleNextLevel }: Props) {
  return (
    <div className='w-full flex justify-between items-center'>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={handleNextLevel}
      >
        <IconBaseGuitar color='#000000' />
      </div>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={handleNextLevel}
      >
        <IconPiano color='#000000' />
      </div>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={handleNextLevel}
      >
        <IconDrum color='#000000' />
      </div>
      <div
        className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
        onClick={handleNextLevel}
      >
        <IconElecGuitar color='#000000' />
      </div>
    </div>
  );
}

export default SelectIndstrument;
