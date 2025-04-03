interface Props {
  width?: number;
  height?: number;
  color?: string;
}

function IconPlay({ width = 12, height = 14, color = '#000000' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 12 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1 1L11 7L1 13V1Z' stroke={color} />
    </svg>
  );
}

export default IconPlay;
