import React from 'react';

interface Props {
  children: React.ReactNode;
  borderStyle: string;
  onClick?: () => void;
}

function Box({ children, borderStyle, onClick }: Props) {
  const isNew = borderStyle === 'dotted';
  return (
    <div
      className={`w-full p-[15px] border-2 rounded-md border-${borderStyle} text-center ${isNew ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Box;
