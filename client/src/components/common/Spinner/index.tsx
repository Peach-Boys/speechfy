function Spinner() {
  return (
    <div className='flex justify-center items-center'>
      <div
        className='w-10 h-10 border-5 border-y-0 border-y-gray-800 rounded-full animate-spin'
        style={{ animationDuration: '1.5s' }}
      ></div>
    </div>
  );
}

export default Spinner;
