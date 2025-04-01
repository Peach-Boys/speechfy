import Spinner from '@/components/common/Spinner';
import LoginContext from './Login';

function LoginPage() {
  return (
    <>
      <LoginContext />
      <div className='flex items-center justify-center h-full'>
        <Spinner size={10} />
      </div>
    </>
  );
}
export default LoginPage;
