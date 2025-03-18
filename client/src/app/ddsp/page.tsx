'use client';
import { useRecord } from '@/hooks/useRecord';

export default function DdspPage() {
  const { isRecording, startRecording, stopRecording, audio } = useRecord();
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
        <button className='p-1 bg-white rounded-xl text-black hover:cursor-pointer'>
          Convert
        </button>
        <audio src='' controls></audio>
      </section>
    </div>
  );
}
