import { ROUTE_TABS } from '@/constants/tab';
import { useWorkRoomStore } from '@/stores/workroomStore';
import clsx from 'clsx';
import React from 'react';

interface Props {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

function WorkroomTabs({ tab, setTab }: Props) {
  const { tracks } = useWorkRoomStore();
  function handleClickTab(tabSrc: string) {
    if (tracks.length === 0) {
      alert('트랙을 먼저 추가해주세요!');
      return;
    }
    setTab(tabSrc);
  }
  return (
    <ul className='sticky top-0 w-full  h-fit flex mb-10 bg-black z-10'>
      {ROUTE_TABS.map((t) => (
        <li
          key={t.tabSrc}
          onClick={() => handleClickTab(t.tabSrc)}
          className={clsx(
            'relative w-full py-2 flex justify-center cursor-pointer text-sm font-medium text-gray-400 transition-colors duration-300 ease-in-out',
            t.tabSrc === tab && 'text-white'
          )}
        >
          {t.tabName}
          <span
            className={clsx(
              'absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-20 rounded-full transition-transform duration-200 ease-in-out',
              t.tabSrc === tab
                ? 'scale-x-100 opacity-100 bg-pink-400'
                : 'scale-x-30 opacity-50 bg-gray-400'
            )}
          />
        </li>
      ))}
    </ul>
  );
}

export default WorkroomTabs;
