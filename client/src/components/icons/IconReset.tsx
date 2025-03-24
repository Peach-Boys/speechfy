interface Props {
  width?: number;
  height?: number;
  color?: string;
}

function IconReset({ width = 15, height = 15, color = '#d9d9d9' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.55577 4.63354C3.25057 3.43441 4.35748 2.52864 5.6704 2.0849C6.98332 1.64115 8.41276 1.68967 9.69257 2.22142C10.9724 2.75317 12.0153 3.73191 12.6272 4.9754C13.2391 6.21888 13.3782 7.64237 13.0187 8.9808C12.6592 10.3192 11.8255 11.4814 10.6728 12.2509C9.52019 13.0204 8.1272 13.3447 6.7532 13.1636C5.37921 12.9825 4.11787 12.3082 3.20403 11.2663C2.2902 10.2244 1.78616 8.88585 1.78577 7.49997'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.35714 4.64279H2.5V1.78564'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default IconReset;
