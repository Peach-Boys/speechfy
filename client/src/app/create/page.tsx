import ClientProvider from '@/components/common/ClientProvider';
import CreateWorkroom from '@/components/features/CreateWorkroom';

function CreatePage() {
  return (
    <ClientProvider>
      <section className='w-full h-full p-5 flex flex-col justify-center items-center gap-5'>
        <span className='text-2xl'>멋진 이름을 정해주세요</span>
        <CreateWorkroom />
      </section>
    </ClientProvider>
  );
}

export default CreatePage;
