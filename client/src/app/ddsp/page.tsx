'use client';

import { useRecord } from '@/hooks/useRecord';
import { useEffect, useState } from 'react';

export default function DdspPage() {
  const { isRecording, startRecording, stopRecording, audio } = useRecord();
  const [worker, setWorker] = useState<Worker>();
  const [convertedAudio, setAudio] = useState<string>('');

  useEffect(() => {
    const w = new window.Worker('src/utils/modelWorker.js');
    setWorker(w);

    w.onmessage = (event: MessageEvent) => {
      const data = event.data as {
        type: string;
        message?: string;
        convertedAudio: string;
      };
      if (data.type === 'initialized') {
        alert('모델 초기화 완료');
      } else if (data.type === 'converted') {
        setAudio(data.convertedAudio);
      }
    };

    w.postMessage({ type: 'initialize' });
    return () => {
      w.terminate();
    };
  }, []);

  function handleConvert(inst: string) {
    console.log(worker);
    if (worker) {
      worker.postMessage({ type: 'convert', payload: { inst, audio } });
    }
  }
  return (
    <div className='flex flex-col gap-4 p-4'>
      <h1>DDSP demo</h1>
      <section className='bg-gray-200 p-4 rounded-xl'>
        <h2 className='text-black'>1. Record voice</h2>
        {!isRecording ? (
          <button
            className='px-3 my-1 bg-white rounded-xl text-black hover:cursor-pointer'
            onClick={startRecording}
          >
            Start recording
          </button>
        ) : (
          <button
            className='p-1 bg-white rounded-xl text-black hover:cursor-pointer'
            onClick={stopRecording}
          >
            Stop recording
          </button>
        )}
        {audio !== '' && <audio src={audio} controls></audio>}
      </section>
      <section className='bg-gray-200 p-4 rounded-xl'>
        <h2 className='text-black'>2. Init DDSP Model</h2>
        <button className='p-1 bg-white rounded-xl text-black hover:cursor-pointer'>
          Initialize
        </button>
      </section>
      <section className='bg-gray-200 p-4 rounded-xl'>
        <h2 className='text-black'>3. Transfer Tone to tenor saxophone</h2>
        <button
          className='p-1 bg-white rounded-xl text-black hover:cursor-pointer'
          onClick={() => handleConvert('tenor_saxophone')}
        >
          Convert saxophone
        </button>
        <button
          className='p-1 bg-white rounded-xl text-black hover:cursor-pointer'
          onClick={() => handleConvert('flute')}
        >
          Convert flute
        </button>
        <button
          className='p-1 bg-white rounded-xl text-black hover:cursor-pointer'
          onClick={() => handleConvert('violin')}
        >
          Convert violin
        </button>
        <button
          className='p-1 bg-white rounded-xl text-black hover:cursor-pointer'
          onClick={() => handleConvert('trumpet')}
        >
          Convert trumpet
        </button>
        {/* {loading && <>loading</>} */}
        {convertedAudio !== '' && <audio src={convertedAudio} controls></audio>}
      </section>
    </div>
  );
}
