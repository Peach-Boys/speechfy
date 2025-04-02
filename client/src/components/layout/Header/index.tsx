import IconPeachPeach from '@/components/icons/IconPeachPeach';

function Header() {
  return (
    <header className='fixed w-full h-[60px] max-w-[500px] px-3 flex items-center gap-3 bg-black z-100'>
      <div className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-jihyegra'>
        <IconPeachPeach width={30} height={30} />
      </div>
      <span className='font-[SEBANG] text-3xl font-bold '>SPEECHFY</span>
      {/* 햄버거 메뉴는 추후 개발 */}
    </header>
  );
}

export default Header;
