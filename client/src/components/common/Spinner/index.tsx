import clsx from 'clsx';

interface Props {
  size?: number;
}

function Spinner({ size = 10 }: Props) {
  const pixelSize = `${size * 4}px`;
  return (
    <div className='flex justify-center items-center'>
      <div
        className={clsx(
          'border-5 border-y-0 border-y-gray-800 rounded-full animate-spin'
        )}
        style={{
          width: pixelSize,
          height: pixelSize,
          animationDuration: '1.5s',
        }}
      ></div>
    </div>
  );
}

export default Spinner;
