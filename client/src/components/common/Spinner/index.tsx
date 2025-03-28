import clsx from 'clsx';

interface Props {
  size?: number;
}

function Spinner({ size = 10 }: Props) {
  return (
    <div className='flex justify-center items-center'>
      <div
        className={clsx(
          `w-${size} h-${size}`,
          'border-5 border-y-0 border-y-gray-800 rounded-full animate-spin'
        )}
        style={{ animationDuration: '1.5s' }}
      ></div>
    </div>
  );
}

export default Spinner;
