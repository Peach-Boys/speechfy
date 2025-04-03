import IconBaseGuitar from '@/components/icons/IconBaseGuitar';
import IconClose from '@/components/icons/IconClose';
import IconDrum from '@/components/icons/IconDrum';
import IconElecGuitar from '@/components/icons/IconElecGuitar';
import IconPiano from '@/components/icons/IconPiano';

interface Props {
  instrumentId: number;
}

function InstrumentList({ instrumentId }: Props) {
  return (
    <menu
      className={`flex flex-col gap-1 bg-white shadow-md rounded-full p-2 `}
    >
      {instrumentId !== 0 && (
        <div
          className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
          onClick={() => console.log('Piano 선택')}
        >
          <IconPiano />
        </div>
      )}
      {instrumentId !== 1 && (
        <div
          className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
          onClick={() => console.log('베이스 기타 선택')}
        >
          <IconBaseGuitar />
        </div>
      )}
      {instrumentId !== 2 && (
        <div
          className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
          onClick={() => console.log('드럼 선택')}
        >
          <IconDrum />
        </div>
      )}
      {instrumentId !== 3 && (
        <div
          className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
          onClick={() => console.log('일렉 기타 선택')}
        >
          <IconElecGuitar />
        </div>
      )}
      <div className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'>
        <IconClose />
      </div>
    </menu>
  );
}

export default InstrumentList;
