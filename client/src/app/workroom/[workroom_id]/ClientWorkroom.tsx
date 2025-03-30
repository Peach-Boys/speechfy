'use client';

import { useEffect, useState } from 'react';
import AITab from '@/app/workroom/[workroom_id]/AITab';
import CompleteTab from '@/app/workroom/[workroom_id]/CompleteTab';
import TrackTab from '@/app/workroom/[workroom_id]/TrackTab';
import WorkroomTabs from '@/app/workroom/[workroom_id]/WorkroomTabs';
import { useGetTracks } from '@/service/queries/useGetTracks';
import { TrackListItem } from '@/service/types/Workspace';
import { useWorkRoomStore } from '@/stores/workroomStore';
import useMergeAudio from '@/hooks/useMergeAudio';

interface Props {
  id: string;
}

function ClientWorkroom({ id }: Props) {
  const [tab, setTab] = useState<string>('work');
  const [selectTag, setSelectTag] = useState<(number | null)[]>([null, null]);
  const [selectSong, setSelectSong] = useState<number>(-1);
  // const [tracks, setTracks] = useState<ITrack[]>([]);
  const { setTracks } = useWorkRoomStore();
  const { data, isLoading, isError } = useGetTracks(id);

  const {
    mergeWavFiles,
    isLoading: isMerging,
    error: mergeError,
  } = useMergeAudio();

  useEffect(() => {
    if (isError) {
      alert('에러가 발생했습니다.');
    }
  }, [isError]);

  useEffect(() => {
    if (data && !isLoading) {
      console.log(data);
      setTracks(
        data.trackList.map((trackData: TrackListItem) => ({
          trackId: trackData.track.trackId,
          instrumentName: trackData.track.instrumentName,
          trackUrl: trackData.track.trackUrl,
          trackName: trackData.track.trackName,
          isPlaying: false,
          order: trackData.order,
        }))
      );
    }
  }, [data, isLoading, setTracks]);

  // 병합 이벤트 핸들러: 트랙 URL들을 추출하여 mergeWavFiles 훅을 호출
  const handleMerge = async (): Promise<void> => {
    if (!data) return;

    // 트랙 URL들을 추출 (모든 트랙의 길이가 동일해야 함)
    const fileUrls: string[] = data.trackList.map(
      (trackData: TrackListItem) => trackData.track.trackUrl
    );

    try {
      const wavBuffer = await mergeWavFiles(fileUrls);
      const blob = new Blob([wavBuffer], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.wav';
      a.click();
    } catch (error) {
      console.error('병합 실패:', error);
    }
  };

  return (
    <div className='w-full h-full flex flex-col'>
      <WorkroomTabs tab={tab} setTab={setTab} />
      <div className='w-full flex justify-center text-2xl h-fit'>
        당근할아버지 프로젝트 {id}
      </div>
      <div className='relative w-full h-full'>
        <div className={tab === 'work' ? 'block' : 'hidden'}>
          <TrackTab />
        </div>
        <div className={tab === 'gerne' ? 'block' : 'hidden'}>
          <AITab selectTag={selectTag} setSelectTag={setSelectTag} />
        </div>
        <div className={tab === 'complete' ? 'block' : 'hidden'}>
          <CompleteTab />
        </div>
      </div>
      <button onClick={handleMerge} disabled={isMerging}>
        {isMerging ? '병합 중...' : '병합'}
      </button>
      {mergeError && (
        <p style={{ color: 'red' }}>병합 에러: {mergeError.message}</p>
      )}
    </div>
  );
}

export default ClientWorkroom;
