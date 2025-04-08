'use client';

import PreviewSongList from '@/components/features/PreviewSongList';
import TagField from '@/components/features/TagField';
import useMergeAudio from '@/hooks/useMergeAudio';
import { usePostPreviewSong } from '@/service/queries/usePostPreviewSong';
import { useWorkRoomStore } from '@/stores/workroomStore';
import { ITrack } from '@/types/track';
import { useParams } from 'next/navigation';
import React from 'react';

interface Props {
  selectTag: (string | null)[];
  setSelectTag: React.Dispatch<React.SetStateAction<(string | null)[]>>;
}

function AITab({ selectTag, setSelectTag }: Props) {
  const { workroom_id } = useParams();
  const { tracks } = useWorkRoomStore();
  const postMutation = usePostPreviewSong(workroom_id as string);
  const { mergeWavFiles } = useMergeAudio();

  async function handleCreateAISong() {
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
          className='w-full h-fit py-3 mb-5 rounded-[10px] bg-gray-600 cursor-pointer'
          onClick={handleCreateAISong}
        >
          AI 추천 받기 (임시 버튼)
        </button>
      </div>
      <PreviewSongList />
    </div>
  );
}

export default AITab;
