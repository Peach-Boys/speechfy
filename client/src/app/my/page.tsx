import ClientMy from '@/app/my/ClientMy';
import ClientProvider from '@/components/common/ClientProvider';
import MswInitializer from '@/components/common/MswInitializer';

function MyPage() {
  return (
    <ClientProvider>
      <MswInitializer />
      <ClientMy />
    </ClientProvider>
  );
}

export default MyPage;
