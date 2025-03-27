'use client';

import { useDeleteTrack } from '@/service/queries/useDeleteTrack';
interface Props {
  trackId: number;
}
function TrackMenu({ trackId }: Props) {
  const { mutate: deleteTrack } = useDeleteTrack(trackId);
  function handleCopy() {
    console.log('카피');
  }
  function handleDelete() {
    deleteTrack();
  }

  return (
    <menu className='w-[72px] flex flex-col gap-1 rounded-sm bg-gray-500'>
      <button
        className='w-fit px-5 py-2 hover:bg-gray-600 rounded-b-sm cursor-pointer'
        onClick={handleCopy}
      >
        복사
      </button>
      <button
        className='w-fit px-5 py-2 hover:bg-gray-600 rounded-b-sm cursor-pointer'
        onClick={handleDelete}
      >
        삭제
      </button>
    </menu>
  );
}

export default TrackMenu;
