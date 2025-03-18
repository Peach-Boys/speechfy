import clsx from 'clsx';
import React from 'react';

interface Props {
  children: React.ReactNode;
  borderStyle: 'dotted' | 'solid' | 'dashed';
  onClick?: () => void;
}

const borderClasses = {
  dotted: 'border-dotted',
  solid: 'border-solid',
  dashed: 'border-dashed',
};

function Box({ children, borderStyle, onClick }: Props) {
  return (
    <div
      className={clsx(
        'w-full p-[15px] border-2 rounded-md text-center',
        borderClasses[borderStyle],
        borderStyle === 'dotted' && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Box;
