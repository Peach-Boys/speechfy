interface Props {
  width?: number;
  height?: number;
  bgColor?: string;
  playColor?: string;
}

function IconPlay({
  width = 12,
  height = 14,
  bgColor = '#000000',
  playColor = '#ffffff',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21Z'
        fill={bgColor}
        stroke={bgColor}
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path
        d='M9 11V7.53601L12 9.26801L15 11L12 12.732L9 14.464V11Z'
        fill={playColor}
        stroke={playColor}
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default IconPlay;
