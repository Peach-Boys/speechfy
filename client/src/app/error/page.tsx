import Image from 'next/image';

function ErrorPage() {
  return (
    <section className='flex flex-col items-center justify-center relative w-full h-[calc(100dvh-62px)]'>
      <Image
        src={'/images/error_logo.png'}
        alt='error'
        width={300}
        height={300}
      />
      <Image
        src={'/images/error_msg.png'}
        alt='error_message'
        width={200}
        height={200}
      />
    </section>
  );
}

export default ErrorPage;
