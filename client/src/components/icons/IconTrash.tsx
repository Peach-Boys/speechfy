interface Props {
  width?: number;
  height?: number;
  color?: string;
}

function IconTrash({ width = 16, height = 20, color = '#000000' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14 7L13.16 15.398C13.033 16.671 12.97 17.307 12.68 17.788C12.4257 18.2114 12.0516 18.55 11.605 18.761C11.098 19 10.46 19 9.18 19H6.82C5.541 19 4.902 19 4.395 18.76C3.94805 18.5491 3.57361 18.2106 3.319 17.787C3.031 17.307 2.967 16.671 2.839 15.398L2 7M9.5 13.5V8.5M6.5 13.5V8.5M0.5 4.5H5.115M5.115 4.5L5.501 1.828C5.613 1.342 6.017 1 6.481 1H9.519C9.983 1 10.386 1.342 10.499 1.828L10.885 4.5M5.115 4.5H10.885M10.885 4.5H15.5'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default IconTrash;
