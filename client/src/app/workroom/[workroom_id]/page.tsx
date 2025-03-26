import TrackTab from '@/app/workroom/[workroom_id]/TrackTab';
import clsx from 'clsx';

type Props = {
  params: {
    workroom_id: string;
  };
};

const ROUTE_TABS = [
  { tabSrc: 'work', tabName: '작업' },
  { tabSrc: 'ai', tabName: 'AI' },
  { tabSrc: 'complete', tabName: '완성' },
];
async function WorkroomPage({ params }: Props) {
  const { workroom_id } = params;
  console.log(workroom_id);

  return (
    <div className='w-full h-full flex flex-col'>
      <ul className='w-full h-fit flex mb-2'>
        {ROUTE_TABS.map((tab) => (
          <li
            key={tab.tabSrc}
            className={clsx(
              'w-full py-2 flex justify-center border-b-2 border-gray-300 cursor-pointer ',
              tab.tabSrc === 'work' ? 'border-pink-500' : 'border-gray-300'
            )}
          >
            {tab.tabName}
          </li>
        ))}
      </ul>
      <div className='w-full flex justify-center text-xl h-fit'>
        당근할아버지 프로젝트
      </div>
      <TrackTab />
      <div className='w-full px-5'>
        <button className='w-full h-fit py-3 rounded-[10px] bg-gray-600'>
          다음 스탭
        </button>
      </div>
    </div>
  );
}

export default WorkroomPage;
