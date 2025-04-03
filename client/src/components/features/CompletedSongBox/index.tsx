import PlayBar from '@/components/common/PlayBar';
import Tag from '@/components/common/Tag';
import IconTripleDots from '@/components/icons/IconTripleDots';
import { useAudioPlayBar } from '@/hooks/useAudioPlayBar';
import { BaseCompletedSong } from '@/types/workroom';

interface Props {
  song: BaseCompletedSong;
}

function CompletedSongBox({ song }: Props) {
  const {
    audioRef,
    currentTime,
    endTime,
    handlePlay,
    handleSeek,
    isPlaying,
    isReady,
  } = useAudioPlayBar(song.songPresignedUrl);
  return (
    <article className='w-full p-3 flex flex-col gap-4 border-1 rounded-[10px]'>
      <div className='w-full flex gap-4'>
        <img
          src={song.imagePresignedUrl ?? '/images/defaultImage.png'}
          alt='음악 이미지'
          className='w-10 h-10 rounded-[10px]'
        />
        <div className='w-full'>
          <div>{song.title}</div>
          <div>{song.createdAt}</div>
        </div>
        <div className='h-fit cursor-pointer'>
          <IconTripleDots color='#ffffff' />
        </div>
      </div>
      <div className='w-full flex flex-col gap-5'>
        <PlayBar
          currentTime={currentTime}
          endTime={endTime}
          isReady={isReady}
          onSeek={(e) => handleSeek(e)}
        />
        <div className='w-full flex flex-wrap gap-2'>
          <Tag label={song.genre} isSelect />
          <Tag label={song.mood} isSelect />
        </div>
      </div>
      <div className='w-full flex gap-2'>
        <button
          className='w-full py-3 bg-gray-200 text-black rounded-[10px] cursor-pointer'
          onClick={() => handlePlay()}
        >
          {isPlaying ? '정지' : '재생'}
        </button>
        <a
          href={song.songPresignedUrl}
          className='w-full py-3 flex justify-center bg-gray-200 text-black rounded-[10px] cursor-pointer'
          download
        >
          다운로드
        </a>
      </div>
      <audio ref={audioRef} src={song.songPresignedUrl} />
    </article>
  );
}

export default CompletedSongBox;
