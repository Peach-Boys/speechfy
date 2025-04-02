interface Props {
  width?: number;
  height?: number;
  color?: string;
}

function IconDrum({ width = 22, height = 23, color = '#000000' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 22 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1 1.3335L9 9.3335M21 1.3335L13 9.3335' stroke={`${color}`} />
      <path
        d='M11 13.3335C16.5228 13.3335 21 11.0949 21 8.3335C21 5.57207 16.5228 3.3335 11 3.3335C5.47715 3.3335 1 5.57207 1 8.3335C1 11.0949 5.47715 13.3335 11 13.3335Z'
        stroke={`${color}`}
      />
      <path
        d='M6 12.7335V20.6335M11 13.3335V21.3335M11 21.3335C8.34784 21.3335 5.8043 20.8067 3.92893 19.869C2.05357 18.9313 1 17.6596 1 16.3335V8.3335M11 21.3335C13.6522 21.3335 16.1957 20.8067 18.0711 19.869C19.9464 18.9313 21 17.6596 21 16.3335V8.3335M16 12.7335V20.6335'
        stroke={`${color}`}
      />
    </svg>
  );
}

export default IconDrum;
