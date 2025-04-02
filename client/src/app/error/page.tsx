function ErrorPage() {
  return (
    <section className='flex flex-col items-center relative w-fit h-[calc(100dvh-62px)]'>
      <img src='/images/error.png' alt='error' />
      <h1 className='text-6xl inline-block absolute bottom-40'>ERROR!</h1>
    </section>
  );
}

export default ErrorPage;
