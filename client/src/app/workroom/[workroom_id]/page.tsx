import ClientWorkroom from '@/app/workroom/[workroom_id]/ClientWorkroom';

type Props = {
  params: {
    workroom_id: string;
  };
};

async function WorkroomPage({ params }: Props) {
  const { workroom_id } = params;

  return <ClientWorkroom id={workroom_id} />;
}

export default WorkroomPage;
