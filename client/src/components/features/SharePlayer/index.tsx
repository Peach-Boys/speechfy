'use client';

import Background from '@/components/common/Background';
import PlayBar from '@/components/common/PlayBar';
import { useAudioPlayBar } from '@/hooks/useAudioPlayBar';
import { IShareSong } from '@/types/song';
import Image from 'next/image';
import WavePlay from '../Track/WavePlay';

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

  function isInvalidImageUrl(url?: string): boolean {
    if (!url) return true;

    try {
      const parsed = new URL(url);
      const lastSegment = parsed.pathname.split('/').pop(); // 마지막 path
      return !lastSegment || lastSegment === 'null';
    } catch (e) {
      console.error(e);
      return true;
    }
  }

  const imageUrl = isInvalidImageUrl(song.imageCloudFrontUrl)
    ? '/images/defaultImage.png'
    : song.imageCloudFrontUrl;

  return (
    <>
      <Background imgSrc={song.imageCloudFrontUrl}>
        <div className='w-full h-full p-5 flex flex-col items-center gap-10'>
          <div className='max-w-screen-sm w-full p-5 flex flex-col items-center gap-6'>
            <div className='relative w-full aspect-[1/1] max-w-100 max-h-100 shadow-lg'>
              <Image
                src={imageUrl}
                alt='이미지'
                className='rounded-[10px]'
                fill
                sizes='(max-width: 768px) 90vw, (max-width: 1024px) 60vw, 400px'
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <h1 className='text-4xl'>{song.songTitle}</h1>
            <div className='w-full max-w-200'>
              <PlayBar
                currentTime={currentTime}
                endTime={endTime}
                onSeek={handleSeek}
                isReady={isReady}
              />
            </div>
            <button
              aria-label={isPlaying ? '정지' : '재생'}
              title={isPlaying ? '클릭 시 정지' : '클릭 시 재생'}
              className='w-100 px-10 h-20 bg-jihyegra text-2xl rounded-[10px] cursor-pointer transition hover:bg-opacity-80 hover:scale-[1.02]'
              onClick={() => handlePlay()}
            >
              {isPlaying ? <WavePlay isPlay /> : '재생'}
            </button>
          </div>
        </div>
      </Background>
      <audio ref={audioRef} src={song.songCloudFrontUrl} />
    </>
  );
}

export default SharePlayer;
