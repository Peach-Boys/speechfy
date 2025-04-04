'use client';

import CompleteSong from '@/components/features/CompleteSong';
import GenerateImage from '@/components/features/GenerateImage';
import useMergeWavFiles from '@/hooks/useMergeAudio';
import { useSingleUpload } from '@/service/queries/useSingleUpload';
import { useSelectSongStore } from '@/stores/selectSongStore';
import { useWorkRoomStore } from '@/stores/workroomStore';
import { useState } from 'react';

interface Props {
  workroomId: string;
  selectTags: (string | null)[];
}

function CompleteTab({ workroomId, selectTags }: Props) {
  const [title, setTitle] = useState<string>('');
  const { selectSong } = useSelectSongStore();
  const { tracks } = useWorkRoomStore();
  const { mergeWavFiles } = useMergeWavFiles();

  const files = tracks.map((track) => {
    return track.trackUrl;
  });
  const instruments = tracks.map((track) => {
    return track.instrumentName;
  });

  const mutation = useSingleUpload();

  async function handleSave() {
    if (selectTags[0] === null || selectTags[1] === null) {
      alert('장르와 기분을 선택해주세요!');
      return;
    }
    if (title.length < 1) {
      alert('제목을 입력해주세요!');
      return;
    }

    const mergeFile = await mergeWavFiles(files);

    mutation.mutate({
      workroomId,
      selectSong: selectSong?.songPresignedUrl,
      mood: selectTags[1]!,
      genre: selectTags[0]!,
      title,
      instruments,
      mergeFile,
    });
  }

  return (
    <div className='w-full h-full p-5 flex flex-col justify-between items-center gap-5'>
      <div className='w-full h-full flex flex-col items-center gap-5'>
        <CompleteSong />
        <GenerateImage title={title} setTitle={setTitle} />
      </div>
      <button
        className='w-full py-3 bg-jihyegra rounded-[10px] cursor-pointer'
        onClick={handleSave}
      >
        완성하기
      </button>
    </div>
  );
}

export default CompleteTab;
