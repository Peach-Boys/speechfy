'use client';

function TrackMenu() {
  function handleCopy() {
    console.log('카피');
  }
  function handleDelete() {
    console.log('삭제');
  }

  return (
    <menu className='w-[72px] flex flex-col gap-1 rounded-sm bg-gray-500'>
      <button
        className='w-fit px-5 py-2 hover:bg-gray-600 rounded-b-sm cursor-pointer'
        onClick={handleCopy}
      >
        복사
      </button>
      <button
        className='w-fit px-5 py-2 hover:bg-gray-600 rounded-b-sm cursor-pointer'
        onClick={handleDelete}
      >
        삭제
      </button>
    </menu>
  );
}

export default TrackMenu;
