import ClientWorkroom from '@/app/workroom/[workroom_id]/ClientWorkroom';
import ClientProvider from '@/components/common/ClientProvider';
import MswInitializer from '@/components/common/MswInitializer';

async function WorkroomPage() {
  return (
    <ClientProvider>
      <MswInitializer />
      <ClientWorkroom />
    </ClientProvider>
  );
}

export default WorkroomPage;
