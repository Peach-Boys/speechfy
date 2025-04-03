'use client';

import Background from '@/components/common/Background';
import PlayBar from '@/components/common/PlayBar';
import { useAudioPlayBar } from '@/hooks/useAudioPlayBar';
import { IShareSong } from '@/types/song';

interface Props {
  song: IShareSong;
}

function SharePlayer({ song }: Props) {
  const {
    audioRef,
    currentTime,
    endTime,
    handlePlay,
    handleSeek,
    isPlaying,
    isReady,
  } = useAudioPlayBar(song.songCloudFrontUrl);

  return (
    <Background imgSrc={song.imageCloudFrontUrl}>
      <div className='w-full h-full flex flex-col p-5'>
        <div>
          <img
            src={song.imageCloudFrontUrl ?? '/images/defaultImage.png'}
            alt='이미지'
            loading='lazy'
          />
        </div>
        <span>{song.songTitle}</span>
        <PlayBar
          currentTime={currentTime}
          endTime={endTime}
          onSeek={handleSeek}
          isReady={isReady}
        />
        <button onClick={() => handlePlay()}>
          {isPlaying ? '일시정지' : '재생'}
        </button>
        <audio ref={audioRef} src={song.songCloudFrontUrl}></audio>
      </div>
    </Background>
  );
}

export default SharePlayer;
