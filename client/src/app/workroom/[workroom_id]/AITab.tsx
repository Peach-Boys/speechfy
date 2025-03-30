'use client';

import PreviewSongList from '@/components/features/PreviewSongList';
import TagField from '@/components/features/TagField';
import { DUMMY_ADD_SONG } from '@/service/mocks/dummies/AddSong';
import { usePostPreviewSong } from '@/service/queries/usePostPreviewSong';
import { useWorkRoomStore } from '@/stores/workroomStore';
import { ITrack } from '@/types/track';
import { useParams } from 'next/navigation';
import React from 'react';
import useMergeAudio from '@/hooks/useMergeAudio';

interface Props {
  selectTag: (number | null)[];
  setSelectTag: React.Dispatch<React.SetStateAction<(number | null)[]>>;
}

function AITab({ selectTag, setSelectTag }: Props) {
  const { workroom_id } = useParams();
  const { tracks } = useWorkRoomStore();
  const postMutation = usePostPreviewSong(
    workroom_id as string,
    DUMMY_ADD_SONG
  );
  const {
    mergeWavFiles,
    isLoading: isMerging,
    error: mergeError,
  } = useMergeAudio();
  async function handleCreateAISong() {
    const mergedAudio = await handleMerge();
    postMutation.mutate();
  }
  const handleMerge = async (): Promise<string> => {
    const fileUrls: string[] = tracks.map((track: ITrack) => track.trackUrl);
    try {
      const wavBuffer = await mergeWavFiles(fileUrls);
      const blob = new Blob([wavBuffer], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      return url;
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  };
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
