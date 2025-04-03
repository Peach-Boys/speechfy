interface Props {
  width?: number;
  height?: number;
  color?: string;
}

function IconClose({ width = 11, height = 11, color = '#000000' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 11 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.51392 9.8195L9.99992 1.3335M9.99992 9.8195L1.51392 1.3335'
        stroke={color}
      />
    </svg>
  );
}

export default IconClose;
