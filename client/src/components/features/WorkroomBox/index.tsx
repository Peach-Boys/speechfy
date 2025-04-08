'use client';

import Menu from '@/components/common/Menu';
import Modal from '@/components/common/Modal/intex';
import Tag from '@/components/common/Tag';
import IconTripleDots from '@/components/icons/IconTripleDots';
import useOutSideClick from '@/hooks/useOutSideClick';
import { useDeleteWorkroom } from '@/service/queries/useDeleteWorkroom';
import { BaseWorkroom } from '@/types/workroom';
import { useRef, useState } from 'react';

interface Props {
  workroom: BaseWorkroom;
}

function WorkroomBox({ workroom }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useOutSideClick(menuRef, () => setIsMenuOpen(false));
  const deleteMutation = useDeleteWorkroom(workroom.studioId);
  const tracks = Array.from(new Set([...workroom.trackInfo]));

  function handleDelete() {
    deleteMutation.mutate();
  }

  return (
    <>
      <section className='w-full p-3 flex flex-col gap-4 border-1 rounded-[10px]'>
        <div className='w-full flex gap-4'>
          {/* <div className='px-3 py-2 rounded-[10px] bg-white text-gray-800'>
          {workroom.studioName}
          </div> 이거 이미지 안받아와서 얘기 해봐야댐*/}
          <div className='w-full'>
            <div className='w-full'>{workroom.studioName}</div>
            <div className='w-full'>{workroom.modifiedAt}</div>
          </div>
          <div
            className='relative h-fit cursor-pointer'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <IconTripleDots color='#ffffff' />
            {isMenuOpen && (
              <div ref={menuRef} className='absolute z-10 top-3 right-0'>
                <Menu
                  items={[
                    { label: '삭제', onClick: () => setIsModalOpen(true) },
                  ]}
                />
              </div>
            )}
          </div>
        </div>
        <div className='w-full flex flex-wrap gap-2'>
          {tracks.map((t) => (
            <Tag key={t} label={t} isSelect />
          ))}
        </div>
        <div className='w-full flex justify-end'>
          <a
            href={`/workroom/${workroom.studioId}`}
            className='px-5 py-2 bg-white text-gray-800 rounded-[10px] cursor-pointer'
          >
            작업하기 &gt;
          </a>
        </div>
      </section>
      <Modal
        label='현재 선택한 작업실을 삭제하시겠습니까?'
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

export default WorkroomBox;
