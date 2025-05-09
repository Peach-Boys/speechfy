import clsx from 'clsx';

interface Props {
  label: string;
  isSelect: boolean;
  onClick?: () => void;
}

function Tag({ label, isSelect, onClick }: Props) {
  return (
    <div
      className={clsx(
        'w-fit py-1 px-4 text-center rounded-full text-sm',
        isSelect ? 'bg-jihyegra text-white' : 'bg-gray-400 text-black',
        onClick && 'cursor-pointer hover:bg-jihyegra/50 transition'
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export default Tag;
