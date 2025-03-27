// components/DrumOfflineRenderer.tsx
'use client';

import React from 'react';
import { useDrumGenerator } from '@/hooks/useDrumGenerator';

// 원하는 시드 패턴 2D 배열 (1마디=16스텝)
const SEED_PATTERN_8BEAT: number[][] = [
  [0, 2],
  [],
  [2],
  [],
  [1, 2],
  [],
  [2],
  [],
  [0, 2],
  [],
  [2],
  [],
  [1, 2],
  [],
  [2],
  [3],
];

export default function DrumOfflineRenderer() {
  // 예: bpm=125, bars=8
  // -> 8마디 => totalSteps=8*16=128
  const { loading, audioURL, generateDrumBeat } = useDrumGenerator(
    SEED_PATTERN_8BEAT,
    125, // bpm
    8 // bars
  );

  return (
    <div>
      <h2>드럼 자동생성</h2>
      <button
        onClick={generateDrumBeat}
        disabled={loading}
        className='bg-white text-black px-2 py-1 rounded-xl hover:cursor-pointer'
      >
        {loading ? '생성 중...' : '드럼 패턴 생성 및 WAV 렌더링'}
      </button>
      {audioURL && (
        <>
          <h4>결과 WAV 미리듣기:</h4>
          <audio controls src={audioURL} />
        </>
      )}
    </div>
  );
}
