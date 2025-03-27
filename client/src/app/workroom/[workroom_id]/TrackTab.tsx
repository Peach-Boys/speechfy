'use client';

import CreateRecord from '@/components/features/CreateRecord';
import Track from '@/components/features/Track';
import IconAllPlay from '@/components/icons/IconAllPlay';
import IconReset from '@/components/icons/IconReset';
import { ITrack } from '@/types/track';
import { useState } from 'react';

interface Props {
  tracks: ITrack[];
  setTracks: React.Dispatch<React.SetStateAction<ITrack[]>>;
}

function TrackTab({ tracks, setTracks }: Props) {
  const [isAllPlay, setIsAllPlay] = useState<boolean>(false);
  function handlePlayAll() {
    setIsAllPlay(true);
  }
  function handleAllStop() {
    setIsAllPlay(false);
  }
  return (
    <div className='w-full h-full min-h-4/5 max-h-5/6 p-5 flex flex-col items-center gap-3'>
      <div className='w-full h-fit flex justify-between'>
        <button className='flex items-center gap-1'>
          <IconReset />
          <span>초기화</span>
        </button>
        <button
          className='flex items-center gap-1'
          onClick={isAllPlay ? handleAllStop : handlePlayAll}
        >
          <IconAllPlay color='#ffffff' />
          <span>{isAllPlay ? '재생 중지' : '전체 재생'}</span>
        </button>
      </div>
      <div className='w-full h-fit flex flex-col items-center gap-2 overflow-auto'>
        {/* UI 테스트용 Track 여러 개 생성 */}
        {tracks.map((track) => (
          <Track key={track.trackId} track={track} isAllPlay={isAllPlay} />
        ))}
        <CreateRecord setTracks={setTracks} tracks={tracks} />
      </div>
    </div>
  );
}

export default TrackTab;
