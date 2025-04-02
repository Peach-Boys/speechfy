import CompleteSong from '@/components/features/CompleteSong';
import GenerateImage from '@/components/features/GenerateImage';

function CompleteTab() {
  return (
    <div className='w-full h-full p-5 flex flex-col justify-between items-center gap-5'>
      <div className='w-full h-full flex flex-col items-center gap-5'>
        <CompleteSong />
        <GenerateImage />
      </div>
      <button className='w-full py-3 bg-jihyegra rounded-[10px] cursor-pointer'>
        완성하기
      </button>
    </div>
  );
}

export default CompleteTab;
