'use client';

import SocketContext from '@/components/common/SocketListener';
import PreviewSongList from '@/components/features/PreviewSongList';
import TagField from '@/components/features/TagField';
import useMergeAudio from '@/hooks/useMergeAudio';
import useWebSocket from '@/hooks/useWebSocket';
import { usePostPreviewSong } from '@/service/queries/usePostPreviewSong';
import { useWorkRoomStore } from '@/stores/workroomStore';
import { AISong } from '@/types/song';
import { ITrack } from '@/types/track';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type WebSocketEventMap = {
  AI_COMPOSE_SUCCESS: { result: AISong };
};

interface Props {
  selectTag: (string | null)[];
  setSelectTag: React.Dispatch<React.SetStateAction<(string | null)[]>>;
}

function AITab({ selectTag, setSelectTag }: Props) {
  const { workroom_id } = useParams();

  const [isActive, setIsActive] = useState<boolean>(false);

  const { ws, wsConnection, on } = useWebSocket<WebSocketEventMap>();
  const { tracks } = useWorkRoomStore();
  const postMutation = usePostPreviewSong(workroom_id as string);
  const { mergeWavFiles } = useMergeAudio();

  async function handleCreateAISong() {
    if (!isActive) return;
    if (ws.current) {
      alert('먼저 만들고 있는 노래가 있어요.\n 잠시만 기다려주세요!');
      return;
    }

    wsConnection();
    const fileUrls: string[] = tracks.map((track: ITrack) => track.trackUrl);
    const instruments: string[] = tracks.map(
      (tracks: ITrack) => tracks.instrumentName
    );

    const mergedAudio = await mergeWavFiles(fileUrls);
    postMutation.mutate({
      mergedAudio,
      genre: selectTag[0]!,
      mood: selectTag[1]!,
      instruments,
    });
  }

  useEffect(() => {
    const isFilled = selectTag.every((tag) => typeof tag === 'string');
    setIsActive(isFilled);
  }, [selectTag]);

  return (
    <div className='w-full h-full min-h-4/5 max-h-5/6 p-5 flex flex-col items-center gap-3'>
      <div className='text-sm h-fit'>
        당신이 작업한 노래의{' '}
        <span className='bg-jihyegra rounded-full py-1 px-2'>장르</span>{' '}
        <span className='bg-jihyegra rounded-full py-1 px-2'>분위기</span>를
        선택해주세요.
      </div>
      <TagField select={selectTag} setSelect={setSelectTag} />
      <div className='w-full h-fit'>
        <button
          className={clsx(
            'w-full h-fit py-3 mb-5 rounded-[10px]',
            isActive
              ? 'bg-jihyegra  cursor-pointer'
              : 'bg-gray-500 cursor-not-allowed'
          )}
          onClick={handleCreateAISong}
        >
          AI로 노래 완성하기
        </button>
      </div>
      <PreviewSongList />
      <SocketContext on={on} ws={ws} />
    </div>
  );
}

export default AITab;
