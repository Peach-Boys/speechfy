'use client';

import React, { useState } from 'react';
import { useRecord } from '@/hooks/useRecord';
import { useDDSP } from '@/hooks/useDDSP';

export default function DdspPage() {
  // useRecord 훅은 음원 녹음을 위한 훅입니다.
  const { isRecording, startRecording, stopRecording, audio } = useRecord();

  // useDDSP 훅은 녹음된 오디오 URL을 기반으로 모델을 초기화하고 음원 변환을 수행합니다.
  const { initialized, toneTransfer, loading, convertedUrl } = useDDSP(audio);

  // 변환 버튼 클릭 시 호출되는 핸들러
  const handleConvert = async (modelType: string) => {
    try {
      await toneTransfer(modelType);
    } catch (error) {
      console.error('Tone transfer error:', error);
    }
  };

  return (
    <div className='flex flex-col gap-4 p-4'>
      <h1>DDSP Demo</h1>

      {/* 녹음 섹션 */}
      <section className='bg-gray-200 p-4 rounded-xl'>
        <h2 className='text-black'>1. Record Voice</h2>
        {!isRecording ? (
          <button
            className='px-3 py-2 bg-white rounded-xl text-black hover:cursor-pointer'
            onClick={startRecording}
          >
            Start Recording
          </button>
        ) : (
          <button
            className='px-3 py-2 bg-white rounded-xl text-black hover:cursor-pointer'
            onClick={stopRecording}
          >
            Stop Recording
          </button>
        )}
        {audio && <audio src={audio} controls />}
      </section>

      {/* 모델 초기화 섹션 */}
      <section className='bg-gray-200 p-4 rounded-xl'>
        <h2 className='text-black'>2. DDSP Model Initialization</h2>
        {initialized ? (
          <p className='text-green-600'>Models are initialized and ready!</p>
        ) : (
          <p className='text-red-600'>Initializing models...</p>
        )}
      </section>

      {/* 변환 섹션 */}
      <section className='bg-gray-200 p-4 rounded-xl'>
        <h2 className='text-black'>3. Transfer Tone</h2>
        <div className='flex flex-col gap-2'>
          <button
            className='px-3 py-2 bg-white rounded-xl text-black hover:cursor-pointer'
            onClick={() => handleConvert('tenor_saxophone')}
            disabled={!initialized || loading || !audio}
          >
            Convert Saxophone
          </button>
          <button
            className='px-3 py-2 bg-white rounded-xl text-black hover:cursor-pointer'
            onClick={() => handleConvert('flute')}
            disabled={!initialized || loading || !audio}
          >
            Convert Flute
          </button>
          <button
            className='px-3 py-2 bg-white rounded-xl text-black hover:cursor-pointer'
            onClick={() => handleConvert('violin')}
            disabled={!initialized || loading || !audio}
          >
            Convert Violin
          </button>
          <button
            className='px-3 py-2 bg-white rounded-xl text-black hover:cursor-pointer'
            onClick={() => handleConvert('trumpet')}
            disabled={!initialized || loading || !audio}
          >
            Convert Trumpet
          </button>
        </div>
        {loading && <p className='mt-2 text-black'>Processing conversion...</p>}
        {convertedUrl && (
          <div className='mt-4'>
            <p className='text-black'>Converted Audio:</p>
            <audio src={convertedUrl} controls />
          </div>
        )}
      </section>
    </div>
  );
}
