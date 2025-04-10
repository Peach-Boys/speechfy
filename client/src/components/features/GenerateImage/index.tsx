'use client';

import Input from '@/components/common/Input';
import Spinner from '@/components/common/Spinner';
import IconLightning from '@/components/icons/IconLightning';
import { useGenerateImage } from '@/service/queries/useGenerateImage';
import clsx from 'clsx';
import React, { useEffect } from 'react';

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  selectTags: (string | null)[];
  imgSrc: string;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
}

function GenerateImage({
  title,
  setTitle,
  selectTags,
  imgSrc,
  setImgSrc,
}: Props) {
  const { mutate, data, isPending } = useGenerateImage();
  useEffect(() => {
    if (data) {
      setImgSrc(data.imageUrl);
    }
  }, [data]);
  function handleCreate() {
    if (!selectTags[0] || !selectTags[1]) {
      alert('장르와 분위기를 선택해주세요!');
      return;
    }

    if (title.length > 1) {
      mutate({
        title: title,
        genre: selectTags[0],
        mood: selectTags[1],
      });
    } else {
      alert('제목을 입력해주세요!');
    }
  }

  return (
    <div className='w-full flex flex-col justify-between items-center gap-5'>
      <div className='w-full flex text-xl'>
        앨범 이미지 {'('}선택{')'}
      </div>

      <div className='w-full flex flex-col items-center bg-gray-900 rounded-[10px] text-m'>
        {isPending ? (
          <div className='w-full h-[328px]'>
            <Spinner />
          </div>
        ) : imgSrc === '' ? (
          <div className='py-30 flex flex-col items-center justify-center gap-2'>
            <span>제목을 입력하고 버튼을 누르면</span>
            <span>AI가 어울리는 앨범 커버를</span>
            <span>만들어 줄거에요!</span>
          </div>
        ) : (
          <img src={imgSrc} alt='앨범 이미지' className='w-fit' />
        )}
      </div>
      <div className='w-full h-full px-3 flex items-center'>
        <span className='w-[40px] h-full ext-center text-mb'>제목</span>
        <Input title={title} setTitle={setTitle} maxLen={20} />
      </div>
      <button
        className={clsx(
          'flex items-center gap-2 px-4 py-2 rounded-[10px] cursor-pointer',
          title.length > 1 ? 'bg-pink-500' : 'bg-zinc-700'
        )}
        onClick={handleCreate}
        disabled={isPending}
      >
        <IconLightning />
        앨범 이미지 생성
      </button>
    </div>
  );
}

export default GenerateImage;
