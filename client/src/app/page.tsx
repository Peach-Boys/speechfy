import LoginButton from '@/components/common/LoginButton';
import MswInitializer from '@/components/common/MswInitializer';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();

  const isLogin = cookieStore.get('speechfyAccessToken');

  return (
    <>
      <MswInitializer />

      {/* Hero 섹션 */}
      <section className='w-[90%] mx-auto flex flex-col items-center justify-center h-[calc(100vh-62px)] text-center gap-8'>
        <h1 className='text-5xl md:text-6xl font-bold leading-tight'>
          {/* '내 목소리로'와 '나만의 음악' 부분에 그라디언트 텍스트 적용 */}
          <span className='bg-gradient-to-r from-[#b73abb] via-[#d0579a] to-[#e46e80] bg-clip-text text-transparent'>
            내 목소리
          </span>
          로 만드는
          <br />
          <span className='bg-gradient-to-r from-[#b73abb] via-[#d0579a] to-[#e46e80] bg-clip-text text-transparent'>
            나만의 음악
          </span>
        </h1>
        <p className='text-xl md:text-2xl max-w-3xl mt-2 text-center break-keep'>
          “작곡은 어렵다”라는 편견은 이제 그만! 허밍으로 편하게 작곡에
          도전해보세요!
        </p>
        {isLogin ? (
          <button
            className='w-full max-w-[500px] bg-jihyegra rounded-lg py-3 cursor-pointer'
            onClick={() => (window.location.href = '/create')}
          >
            작업하기
          </button>
        ) : (
          <div className='mt-10 w-full max-w-[500px]'>
            <LoginButton />
          </div>
        )}
      </section>

      {/* 왜 이 서비스를 써야 하나? 섹션 */}
      <section className='w-[90%] mx-auto py-16 text-center '>
        <h2 className='text-4xl font-bold mb-8'>
          왜
          <span className='bg-gradient-to-r from-[#b73abb] via-[#d0579a] to-[#e46e80] bg-clip-text text-transparent'>
            {' SPEECHFY '}
          </span>
          일까요?
        </h2>
        <div className='grid gap-8 md:grid-cols-3'>
          <div className='p-6 border border-gray-200 rounded-md shadow-sm'>
            <h3 className='text-2xl font-semibold mb-4'>초보자도 간단하게</h3>
            <p className='text-center break-keep'>
              복잡한 악보나 장비 없이도 허밍만으로 원하는 악기 소리를 얻을 수
              있습니다. 음정이나 박자가 다소 불안해도 AI가 깔끔히 보정해주니까
              걱정 없어요!
            </p>
          </div>
          <div className='p-6 border border-gray-200 rounded-md shadow-sm'>
            <h3 className='text-2xl font-semibold mb-4'>다양한 악기 선택</h3>
            <p className='text-center break-keep'>
              드럼, 바이올린, 색소폰, 트럼펫 등 AI가 학습한 악기 사운드를
              자유롭게 활용할 수 있습니다. 연주자를 섭외하지 않아도 원하는 악기
              사운드를 즉시 얻을 수 있어요.
            </p>
          </div>
          <div className='p-6 border border-gray-200 rounded-md shadow-sm'>
            <h3 className='text-2xl font-semibold mb-4'>
              루프 스테이션으로 잼세션
            </h3>
            <p className='text-center break-keep'>
              간단한 반복 리듬부터 화려한 솔로라인까지 자유롭게 녹음하고, 반복
              배치해보세요. 혼자서도 밴드 연주 느낌을 낼 수 있어요.
            </p>
          </div>
        </div>
      </section>

      {/* 어떻게 사용하나요? 섹션 (How it works) */}
      <section className='w-[90%] mx-auto py-16'>
        <div className='max-w-3xl mx-auto text-center mb-12'>
          <h2 className='text-4xl font-bold mb-4 bg-gradient-to-r from-[#b73abb] via-[#d0579a] to-[#e46e80] bg-clip-text text-transparent'>
            간단한 사용 방법
          </h2>
          <p className='text-xl'>
            누구나 손쉽게 작곡할 수 있도록, 모든 과정을 단계별로 간소화했어요.
          </p>
        </div>
        <div className='grid gap-10 md:grid-cols-3 max-w-5xl mx-auto'>
          <div className='flex flex-col items-center'>
            <div className='w-20 h-20 mb-4  border border-gray-200 rounded-full flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-[#b73abb] via-[#d0579a] to-[#e46e80] bg-clip-text text-transparent'>
              1
            </div>
            <h3 className='text-xl font-semibold mb-2'>허밍 녹음</h3>
            <p className='text-center break-keep'>
              부르기만 하면 AI가 자동으로 음정과 박자를 인식합니다.
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <div className='w-20 h-20 mb-4 border border-gray-200 rounded-full flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-[#b73abb] via-[#d0579a] to-[#e46e80] bg-clip-text text-transparent'>
              2
            </div>
            <h3 className='text-xl font-semibold mb-2'>악기 선택 및 변환</h3>
            <p className='text-center break-keep'>
              선택한 악기(드럼, 바이올린 등)로 소리를 손쉽게 교체하세요.
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <div className='w-20 h-20 mb-4 border border-gray-200 rounded-full flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-[#b73abb] via-[#d0579a] to-[#e46e80] bg-clip-text text-transparent'>
              3
            </div>
            <h3 className='text-xl font-semibold mb-2'>루프 및 트랙 구성</h3>
            <p className='text-center break-keep'>
              루프 스테이션 기능으로 반복 패턴을 만들고, 여러 트랙을 쌓아 더욱
              풍성한 사운드를 얻으세요.
            </p>
          </div>
        </div>
      </section>

      {/* 어떤 가치를 주나요? 섹션 (Features + 장점) */}
      <section className='w-[90%] mx-auto py-16 '>
        <div className='text-center mb-10'>
          <h2 className='text-4xl font-bold text-center break-keep'>
            서비스가 선사하는{' '}
            <span className='bg-gradient-to-r from-[#b73abb] via-[#d0579a] to-[#e46e80] bg-clip-text text-transparent'>
              가치
            </span>
          </h2>
          <p className='text-xl mt-4 max-w-2xl mx-auto text-center break-keep'>
            부담 없이 음악에 도전하고, 창작의 즐거움을 경험하세요.
          </p>
        </div>
        <div className='grid gap-8 md:grid-cols-3'>
          <div className='p-6 border border-gray-200 rounded-lg shadow-md'>
            <h3 className='text-2xl font-semibold mb-4 text-center'>
              쉬운 작곡
            </h3>
            <p className='text-center break-keep'>
              미디 장비나 고가의 소프트웨어가 없어도, 누구나 아이디어를 곡으로
              옮길 수 있습니다.
            </p>
          </div>
          <div className='p-6 border border-gray-200 rounded-lg shadow-md'>
            <h3 className='text-2xl font-semibold mb-4 text-center'>
              멀티악기 활용
            </h3>
            <p className='text-center break-keep'>
              여러 악기를 다루지 못해도, 다양한 사운드를 하나의 곡으로 완성할 수
              있습니다.
            </p>
          </div>
          <div className='p-6 border border-gray-200 rounded-lg shadow-md'>
            <h3 className='text-2xl font-semibold mb-4 text-center'>
              공유와 협업
            </h3>
            <p className='text-center break-keep'>
              완성된 곡을 즉시 다운로드하거나 공유할 수 있고, 협업 기능으로 다른
              사람과 함께 편집도 가능합니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className='w-[90%] mx-auto py-16 text-center'>
        {/* CTA 제목에 그라디언트 적용 */}
        <h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-[#b73abb] via-[#d0579a] to-[#e46e80] bg-clip-text text-transparent'>
          지금 바로 시작해보세요!
        </h2>
        <p className='text-xl mb-8 text-center break-keep'>
          간단한 허밍 한 번으로 작곡의 세계에 발을 내딛어 보세요.
        </p>
        {isLogin ? (
          <button
            className='w-full max-w-[500px] bg-jihyegra rounded-lg py-3 cursor-pointer'
            onClick={() => (window.location.href = '/create')}
          >
            작업하기
          </button>
        ) : (
          <div className='mt-10 w-full max-w-[500px]'>
            <LoginButton />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className='w-full py-8 bg-gray-800 text-white text-center'>
        <p>© 2025 SPEECHFY. All rights reserved.</p>
      </footer>
    </>
  );
}
