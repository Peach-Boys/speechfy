import IconBaseGuitar from '@/components/icons/IconBaseGuitar';
import IconClose from '@/components/icons/IconClose';
import IconDrum from '@/components/icons/IconDrum';
import IconElecGuitar from '@/components/icons/IconElecGuitar';
import IconPiano from '@/components/icons/IconPiano';

interface Props {
  instrumentId: number;
}

function InstrumentList({ instrumentId }: Props) {
  // 선택 테스트용 함수
  function handleChangeInstrument(id: number) {
    console.log('id:', id);
  }

  return (
    <menu className='flex flex-col gap-1'>
      {instrumentId !== 0 && (
        <div
          className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
          onClick={() => handleChangeInstrument(0)}
        >
          <IconPiano />
        </div>
      )}
      {instrumentId !== 1 && (
        <div
          className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
          onClick={() => handleChangeInstrument(1)}
        >
          <IconBaseGuitar />
        </div>
      )}
      {instrumentId !== 2 && (
        <div
          className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
          onClick={() => handleChangeInstrument(2)}
        >
          <IconDrum />
        </div>
      )}
      {instrumentId !== 3 && (
        <div
          className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
          onClick={() => handleChangeInstrument(3)}
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
