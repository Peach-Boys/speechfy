import Hamburger from '@/components/common/Hamburger';
import IconPeachPeach from '@/components/icons/IconPeachPeach';

function Header() {
  return (
    <header className='fixed w-full h-[60px] px-3 flex items-center bg-black z-100'>
      <div className='flex items-center'>
        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-jihyegra'>
          <IconPeachPeach width={30} height={30} />
        </div>
        <span className='font-[SEBANG] text-3xl font-bold '>SPEECHFY</span>
      </div>
      <div className='ml-auto'>
        <Hamburger />
      </div>
    </header>
  );
}

export default Header;
