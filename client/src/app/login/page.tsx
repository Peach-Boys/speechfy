import Spinner from '@/components/common/Spinner';
import LoginContext from './Login';
import ClientProvider from '@/components/common/ClientProvider';

function LoginPage() {
  return (
    <>
      <ClientProvider>
        <LoginContext />
        <div className='flex items-center justify-center h-full'>
          <Spinner size={10} />
        </div>
      </ClientProvider>
    </>
  );
}
export default LoginPage;
