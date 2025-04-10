import IconViolin from '@/components/icons/IconViolin';
// import IconDrum from '@/components/icons/IconDrum';
import IconTenorSaxophone from '@/components/icons/IconTenorSaxophone';
import IconTrumpet from '@/components/icons/IconTrumpet';
import clsx from 'clsx';

interface Props {
  setInstrument: (inst: string) => void;
  instrument: string;
}

function InstrumentList({ instrument, setInstrument }: Props) {
  return (
    <menu
      className={`flex flex-col gap-1 bg-white shadow-md rounded-full p-2 `}
    >
      <button
        className={clsx(
          'size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer',
          instrument === 'VIOLIN' ? 'opacity-50' : 'opacity-100'
        )}
        onClick={() => setInstrument('VIOLIN')}
        disabled={instrument === 'VIOLIN' ? true : false}
      >
        <IconViolin />
      </button>
      <button
        className={clsx(
          'size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer',
          instrument === 'TRUMPET' ? 'opacity-50' : 'opacity-100'
        )}
        onClick={() => setInstrument('TRUMPET')}
        disabled={instrument === 'TRUMPET' ? true : false}
      >
        <IconTrumpet />
      </button>
      {/* {instrumentId !== 2 && (
        <div
          className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
          onClick={() => console.log('드럼 선택')}
        >
          <IconDrum />
        </div>
      )} */}
      <button
        className={clsx(
          'size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer',
          instrument === 'TENOR_SAXOPHONE' ? 'opacity-50' : 'opacity-100'
        )}
        onClick={() => setInstrument('TENOR_SAXOPHONE')}
        disabled={instrument === 'TENOR_SAXOPHONE' ? true : false}
      >
        <IconTenorSaxophone />
      </button>
    </menu>
  );
}

export default InstrumentList;
