'use client';

import Menu from '@/components/common/Menu';
import Modal from '@/components/common/Modal/intex';
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
  } = useAudioPlayBar(song.songPresignedUrl);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useOutSideClick(menuRef, () => setIsMenuOpen(false));
  const deleteMutation = useDeleteCompletedSong(song.songId);

  function handleDelete() {
    deleteMutation.mutate();
  }

  const NEXT_PUBLIC_BASE = process.env.NEXT_PUBLIC_BASE;
  async function handleShare() {
    try {
      await navigator.share({
        title: document.title,
        text: song.title,
        url: `${NEXT_PUBLIC_BASE}/player/${song.songId}`,
      });
    } catch (err) {
      console.error('err:', err);
    }
  }

  async function handleDownload() {
    try {
      console.log('song.songPresignedUrl:', song.songPresignedUrl);
      // const response = await fetch(song.songPresignedUrl);
      // const blob = await song.songPresignedUrl.blob();
      // const url = window.URL.createObjectURL(blob);

      // console.log('url:', url);
      const a = document.createElement('a');
      a.href = song.songPresignedUrl;
      a.download = `${song.title}.wav`;
      a.target = '_blank';
      a.click();
    } catch (error) {
      console.error('Download error:', error);
    }
  }

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

  const imageUrl = isInvalidImageUrl(song.imagePresignedUrl)
    ? '/images/defaultImage.png'
    : song.imagePresignedUrl;

  return (
    <>
      <article className='w-full p-3 flex flex-col gap-4 border-1 rounded-[10px]'>
        <div className='w-full flex gap-4'>
          <img
            src={imageUrl}
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
                    { label: '삭제', onClick: () => setIsModalOpen(true) },
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
          <button
            className='w-full py-3 flex justify-center bg-gray-200 text-black rounded-[10px] cursor-pointer'
            onClick={() => handleDownload()}
          >
            다운로드
          </button>
        </div>
        <audio ref={audioRef} src={song.songPresignedUrl} />
      </article>
      <Modal
        label='현재 선택한 완성곡을 삭제하시겠습니까?'
        isOpen={isModalOpen}
      >
        <button
          className='w-full py-3 bg-gray-400 rounded-[10px] cursor-pointer'
          onClick={() => setIsModalOpen(false)}
        >
          취소
        </button>
        <button
          className='w-full py-3 bg-red-400 rounded-[10px] cursor-pointer'
          onClick={handleDelete}
        >
          삭제
        </button>
      </Modal>
    </>
  );
}

export default CompletedSongBox;
