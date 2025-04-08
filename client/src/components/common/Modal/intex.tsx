import clsx from 'clsx';
import React from 'react';

interface Props {
  modalRef?: React.RefObject<HTMLDivElement | null>;
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
}

function Modal({ modalRef, label, children, isOpen }: Props) {
  return (
    <div
      ref={modalRef}
      className={clsx(
        isOpen ? 'flex' : 'hidden',
        'w-full h-full fixed top-0 left-0 + flex + items-center justify-center bg-gray-800 backdrop-opacity-50 z-20'
      )}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className='w-fit px-10 py-8 flex flex-col justify-center items-center gap-5 bg-white text-black rounded-[10px]'>
        <div className='w-full text-xl'>{label}</div>
        <div className='w-full flex gap-3'>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
