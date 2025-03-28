import React, { useEffect } from 'react';

function useOutSideClick(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutSide(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setTimeout(() => callback(), 0);
      }
    }

    document.addEventListener('mouseup', handleClickOutSide);

    return () => {
      document.removeEventListener('mouseup', handleClickOutSide);
    };
  }, [ref, callback]);
}

export default useOutSideClick;
