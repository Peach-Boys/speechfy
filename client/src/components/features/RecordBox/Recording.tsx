'use client';

import Metronome from '@/components/features/RecordBox/Metronome';
import IconPlay from '@/components/icons/IconPlay';
import IconStop from '@/components/icons/IconStop';
import useCountDown from '@/hooks/useCountDown';

interface Props {
  isRecording: boolean;
  stopRecording: () => Promise<string>;
  startRecording: () => Promise<void>;
}

function Recording({ isRecording, stopRecording, startRecording }: Props) {
  const countdown = useCountDown(isRecording);

  async function handleFinishRecording() {
    await stopRecording();
  }

  function handleStartRecording() {
    setTimeout(async () => {
      await startRecording();
    }, 4000);
  }

  return (
    <div className='w-full flex flex-col items-center'>
      {isRecording ? (
        <div className='w-full flex flex-col items-center gap-10'>
          {countdown > 4 ? (
            <>
              <div
                className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
                onClick={handleFinishRecording}
              >
                <IconStop width={20} height={20} color='#000000' />
              </div>
              <Metronome
                isRecording={isRecording}
                bpm={125}
                onFinish={handleFinishRecording}
              />
            </>
          ) : (
            <span className='text-xl font-bold'>
              {countdown == 4 ? 'GO!' : countdown}
            </span>
          )}
        </div>
      ) : (
        <div
          className='size-12 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer'
          onClick={handleStartRecording}
        >
          <IconPlay width={20} height={20} />
        </div>
      )}
    </div>
  );
}

export default Recording;
