import React from 'react';

interface IMenu {
  label: string;
  onClick: () => void;
}

interface Props {
  items: IMenu[];
}

function Menu({ items }: Props) {
  return (
    <menu className='min-w-[120px] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden'>
      {items.map((item, idx) => (
        <button
          key={item.label}
          className={`
            w-full px-4 py-3 text-center text-sm text-gray-800 
            active:bg-gray-100 transition
            ${idx !== items.length - 1 ? 'border-b border-gray-200' : ''}
          `}
          onClick={() => item.onClick()}
        >
          {item.label}
        </button>
      ))}
    </menu>
  );
}

export default Menu;
