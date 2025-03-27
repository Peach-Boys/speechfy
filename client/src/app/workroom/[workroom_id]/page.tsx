import ClientWorkroom from '@/app/workroom/[workroom_id]/ClientWorkroom';
import ClientProvider from '@/components/common/ClientProvider';

type Props = {
  params: {
    workroom_id: string;
  };
};

async function WorkroomPage({ params }: Props) {
  const { workroom_id } = params;

  return (
    <ClientProvider>
      <ClientWorkroom id={workroom_id} />
    </ClientProvider>
  );
}

export default WorkroomPage;
