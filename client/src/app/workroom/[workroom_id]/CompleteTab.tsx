'use client';

import CompleteSong from '@/components/features/CompleteSong';
import GenerateImage from '@/components/features/GenerateImage';
import useMergeWavFiles from '@/hooks/useMergeAudio';
import { useSingleUpload } from '@/service/queries/useSingleUpload';
import { useSelectSongStore } from '@/stores/selectSongStore';
import { useWorkRoomStore } from '@/stores/workroomStore';
import { useMemo, useState } from 'react';

interface Props {
  workroomId: string;
  selectTags: (string | null)[];
}

function CompleteTab({ workroomId, selectTags }: Props) {
  const [title, setTitle] = useState<string>('');
  const [imgSrc, setImgSrc] = useState<string>('');

  const { selectSong } = useSelectSongStore();
  const { tracks } = useWorkRoomStore();
  const { mergeWavFiles } = useMergeWavFiles();

  const files = useMemo(
    () =>
      tracks.map((track) => {
        return track.trackUrl;
      }),
    [tracks]
  );
  const instruments = useMemo(
    () =>
      tracks.map((track) => {
        return track.instrumentName;
      }),
    [tracks]
  );

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

    console.log('instruwes:', instruments);
    console.log('fileS:', files);

    mutation.mutate({
      workroomId,
      selectSong: selectSong?.signedUrl,
      mood: selectTags[1]!,
      genre: selectTags[0]!,
      title,
      instruments,
      mergeFile,
      imageFilePath: imgSrc,
    });
  }

  return (
    <div className='w-full h-full p-5 flex flex-col justify-between items-center gap-5'>
      <div className='w-full h-full flex flex-col items-center gap-5'>
        <CompleteSong />
        <GenerateImage
          title={title}
          setTitle={setTitle}
          selectTags={selectTags}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
        />
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
