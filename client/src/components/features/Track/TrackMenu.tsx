'use client';

import Menu from '@/components/common/Menu';
import { useCopyTrack } from '@/service/queries/useCopyTrack';
import { useWorkRoomStore } from '@/stores/workroomStore';
import { useParams } from 'next/navigation';
import React, { SetStateAction } from 'react';
interface Props {
  order: number;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}
function TrackMenu({ order, setIsModalOpen }: Props) {
  const { workroom_id } = useParams();
  const { tracks } = useWorkRoomStore();
  const { mutate: copyTrack } = useCopyTrack(
    workroom_id as string,
    tracks,
    order
  );
  function handleCopy() {
    copyTrack();
  }

  return (
    <Menu
      items={[
        { label: '복사', onClick: () => handleCopy() },
        {
          label: '삭제',
          onClick: () => {
            setIsModalOpen(true);
          },
        },
      ]}
    />
  );
}

export default TrackMenu;
