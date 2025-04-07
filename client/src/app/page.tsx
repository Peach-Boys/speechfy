import LoginButton from '@/components/common/LoginButton';
import MswInitializer from '@/components/common/MswInitializer';

export default function Home() {
  return (
    <>
      <MswInitializer />
      <section className='w-[90%] mx-auto justify-around h-[calc(100vh-62px)] flex flex-col  box-border'>
        <article className='text-center flex flex-col gap-5'>
          <h2 className='text-5xl'>
            Transform Your <span className='text-watchapink'>Voice</span> Into
            Musical Magic
          </h2>
          <span className='text-3xl'>
            Convert vocals to instruments and complete your demo songs with AI-
            powered music composition.
          </span>
        </article>
        <LoginButton />
      </section>
      <section className='w-[90%] mx-auto h-[calc(100vh-62px)] border-white border-1'>
        <div>
          <h2>Powerful Features</h2>
          <span>
            Our AI-powered tools make music composition accessible to everyone
          </span>
          <div>
            <p>
              <img src='' alt='' />
              <span>
                Transform your vocals into any instrument. Sing a melody and
                convert it to piano, guitar, strings, and more.
              </span>
            </p>
            <p>
              <img src='' alt='' />
              <span>
                Transform your vocals into any instrument. Sing a melody and
                convert it to piano, guitar, strings, and more.
              </span>
            </p>
            <p>
              <img src='' alt='' />
              <span>
                Transform your vocals into any instrument. Sing a melody and
                convert it to piano, guitar, strings, and more.
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
