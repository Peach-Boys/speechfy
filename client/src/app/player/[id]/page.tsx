import ClientProvider from '@/components/common/ClientProvider';
import ClientSharePage from './ClientSharePage';

function PlayerPage() {
  return (
    <ClientProvider>
      <ClientSharePage />
    </ClientProvider>
  );
}

export default PlayerPage;
