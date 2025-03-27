'use client';

import { useCopyTrack } from '@/service/queries/useCopyTrack';
import { useDeleteTrack } from '@/service/queries/useDeleteTrack';
import { useWorkRoomStore } from '@/stores/workroomStore';
import { useParams } from 'next/navigation';
interface Props {
  trackId: number;
  order: number;
}
function TrackMenu({ trackId, order }: Props) {
  const { workroom_id } = useParams();
  const { tracks } = useWorkRoomStore();
  const { mutate: deleteTrack } = useDeleteTrack(trackId);
  const { mutate: copyTrack } = useCopyTrack(
    workroom_id as string,
    tracks,
    order
  );
  function handleCopy() {
    copyTrack();
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
