import Tag from '@/components/common/Tag';
import IconTripleDots from '@/components/icons/IconTripleDots';

interface Props {
  name: string;
  trackInfo: string[];
  modifiedAt: string;
}

function WorkroomBox({ name, trackInfo, modifiedAt }: Props) {
  return (
    <section className='w-full p-4 border rounded-[10px]'>
      <div className='w-full flex'>
        <div className='p-4 rounded-[10px] bg-white text-gray-800'>
          {name[0]}
        </div>
        <div className='w-full'>
          <div className='w-full'>{name}</div>
          <div className='w-full'>{modifiedAt}</div>
        </div>
        <IconTripleDots color='#ffffff' />
      </div>
      <div className='w-full flex flex-wrap'>
        {trackInfo.map((t) => (
          <Tag key={t} label={t} isSelect />
        ))}
      </div>
      <div className='w-full flex justify-end'>
        <button className='bg-white text-gray-800 rounded-[10px]'>
          작업하기 &gt;
        </button>
      </div>
    </section>
  );
}

export default WorkroomBox;
