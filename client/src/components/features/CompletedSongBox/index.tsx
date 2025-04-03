import Menu from '@/components/common/Menu';
import PlayBar from '@/components/common/PlayBar';
import Tag from '@/components/common/Tag';
import IconTripleDots from '@/components/icons/IconTripleDots';
import { useAudioPlayBar } from '@/hooks/useAudioPlayBar';
import useOutSideClick from '@/hooks/useOutSideClick';
import { useDeleteCompletedSong } from '@/service/queries/useDeleteCompletedSong';
import { BaseCompletedSong } from '@/types/workroom';
import { useRef, useState } from 'react';

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
  } = useAudioPlayBar(song.completeUrl);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useOutSideClick(menuRef, () => setIsMenuOpen(false));
  const deleteMutation = useDeleteCompletedSong(song.songId);

  function handleDelete() {
    deleteMutation.mutate();
  }

  async function handleShare() {
    try {
      await navigator.share({
        title: document.title,
        text: song.title,
        url: song.completeUrl,
      });
    } catch (err) {
      console.error('err:', err);
    }
  }

  return (
    <article className='w-full p-3 flex flex-col gap-4 border-1 rounded-[10px]'>
      <div className='w-full flex gap-4'>
        <img
          src={song.imagePath ?? '/images/defaultImage.png'}
          alt='음악 이미지'
          className='w-10 h-10 rounded-[10px]'
        />
        <div className='w-full'>
          <div>{song.title}</div>
          <div>{song.createdAt}</div>
        </div>
        <div
          className='relative h-fit py-1 cursor-pointer'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IconTripleDots color='#ffffff' />
          {isMenuOpen && (
            <div ref={menuRef} className='absolute z-10 top-3 right-0'>
              <Menu
                items={[
                  { label: '공유', onClick: () => handleShare() },
                  { label: '삭제', onClick: () => handleDelete() },
                ]}
              />
            </div>
          )}
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
          href={song.completeUrl}
          className='w-full py-3 flex justify-center bg-gray-200 text-black rounded-[10px] cursor-pointer'
          download
        >
          다운로드
        </a>
      </div>
      <audio ref={audioRef} src={song.completeUrl} />
    </article>
  );
}

export default CompletedSongBox;
