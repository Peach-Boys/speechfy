interface Props {
  width?: number;
  height?: number;
  color?: string;
}

function IconDoubleCircle({
  width = 16,
  height = 16,
  color = '#000000',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.00004 14.6668C11.6819 14.6668 14.6667 11.6821 14.6667 8.00016C14.6667 4.31826 11.6819 1.3335 8.00004 1.3335C4.31814 1.3335 1.33337 4.31826 1.33337 8.00016C1.33337 11.6821 4.31814 14.6668 8.00004 14.6668Z'
        stroke={color}
      />
      <path
        d='M7.99996 9.33317C8.73634 9.33317 9.33329 8.73622 9.33329 7.99984C9.33329 7.26346 8.73634 6.6665 7.99996 6.6665C7.26358 6.6665 6.66663 7.26346 6.66663 7.99984C6.66663 8.73622 7.26358 9.33317 7.99996 9.33317Z'
        stroke={color}
      />
    </svg>
  );
}

export default IconDoubleCircle;
