interface Props {
  width?: number;
  height?: number;
  color?: string;
}

function IconStop({ width = 14, height = 16, color = '#000000' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 14 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 1.3335H2C1.44772 1.3335 1 1.78121 1 2.3335V14.3335C1 14.8858 1.44772 15.3335 2 15.3335H4C4.55228 15.3335 5 14.8858 5 14.3335V2.3335C5 1.78121 4.55228 1.3335 4 1.3335Z'
        stroke={color}
      />
      <path
        d='M12 1.3335H10C9.44772 1.3335 9 1.78121 9 2.3335V14.3335C9 14.8858 9.44772 15.3335 10 15.3335H12C12.5523 15.3335 13 14.8858 13 14.3335V2.3335C13 1.78121 12.5523 1.3335 12 1.3335Z'
        stroke={color}
      />
    </svg>
  );
}

export default IconStop;
