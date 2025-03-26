'use client';

import CreateRecord from '@/components/features/CreateRecord';
import Track from '@/components/features/Track';
import IconAllPlay from '@/components/icons/IconAllPlay';
import IconReset from '@/components/icons/IconReset';
import { ITrack } from '@/types/track';
import { useState } from 'react';

const DUMMYTRACKS: ITrack[] = [
  {
    trackId: 1,
    instrumentName: 'SoundHelix-Song-1',
    isPlaying: false,
    trackName: 'SoundHelix-Song-1',
    trackUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
];
function TrackTab() {
  const [tracks, setTracks] = useState<ITrack[]>(DUMMYTRACKS);
  return (
    <div className='w-full h-full min-h-4/5 max-h-5/6 p-5 flex flex-col items-center gap-3'>
      <div className='w-full h-fit flex justify-between'>
        <button className='flex items-center gap-1'>
          <IconReset />
          <span>초기화</span>
        </button>
        <button className='flex items-center gap-1'>
          <IconAllPlay color='#ffffff' />
          <span>전체 재생</span>
        </button>
      </div>
      <div className='w-full h-fit flex flex-col items-center gap-2 overflow-auto'>
        {/* UI 테스트용 Track 여러 개 생성 */}
        {tracks.map((track) => (
          <Track key={track.trackId} track={track} />
        ))}
        <CreateRecord setTracks={setTracks} tracks={tracks} />{' '}
        {/* 임시로 빈 배열 입력 */}
      </div>
    </div>
  );
}

export default TrackTab;
