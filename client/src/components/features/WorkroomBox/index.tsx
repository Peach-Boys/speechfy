import Tag from '@/components/common/Tag';
import IconTripleDots from '@/components/icons/IconTripleDots';
import { BaseWorkroom } from '@/types/workroom';

interface Props {
  workroom: BaseWorkroom;
}

function WorkroomBox({ workroom }: Props) {
  return (
    <section className='w-full p-3 flex flex-col gap-4 border-1 rounded-[10px]'>
      <div className='w-full flex gap-4'>
        {/* <div className='px-3 py-2 rounded-[10px] bg-white text-gray-800'>
          {workroom.studioName}
        </div> 이거 이미지 안받아와서 얘기 해봐야댐*/}
        <div className='w-full'>
          <div className='w-full'>{workroom.studioName}</div>
          <div className='w-full'>{workroom.modifiedAt}</div>
        </div>
        <IconTripleDots color='#ffffff' />
      </div>
      <div className='w-full flex flex-wrap gap-2'>
        {workroom.trackInfo.map((t) => (
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
  );
}

export default WorkroomBox;
