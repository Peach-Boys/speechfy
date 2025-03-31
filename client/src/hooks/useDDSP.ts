'use client';

import { useRef, useState, useEffect } from 'react';
import { encodeWAV } from '@/lib/utils/encodeWAV';
import * as m from '@magenta/music';
const PRESET_MODEL_URL = '/model';

export function useDDSP(audioUrl: string) {
  const [loading, setLoading] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState('');
  const audioCtx = useRef<AudioContext>(null);
  const spice = useRef<m.SPICE>(null);
  const audioFeatures = useRef(null);
  const mmModule = useRef<typeof m>(null);
  // 클라이언트 환경에서만 mm 모듈을 동적 import
  useEffect(() => {
    import('@magenta/music')
      .then((mm) => {
        mmModule.current = mm;
      })
      .catch((err) => {
        console.error('Failed to load @magenta/music:', err);
      });
  }, []);

  useEffect(() => {
    async function initModel() {
      await initialize();
    }
    initModel();
  }, []);
  const initialize = async () => {
    try {
      // 혹시 mmModule이 아직 로드되지 않았다면 여기서 재시도
      if (!mmModule.current) {
        const mm = await import('@magenta/music');
        mmModule.current = mm;
      }
      const mm = mmModule.current;
      const ctx = new AudioContext();
      await ctx.resume();
      audioCtx.current = ctx;
      spice.current = new mm.SPICE('/model/spice');
      await spice.current?.initialize();
      await readFileAndProcessAudio(audioUrl);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('알 수 없는 에러 발생');
      }
    }
    return {};
  };

  const readFileAndProcessAudio = async (src: string) => {
    try {
      const audioFile = await fetch(src);
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioBuffer = await audioCtx.current!.decodeAudioData(arrayBuffer);
      audioFeatures.current =
        await spice.current!.getAudioFeatures(audioBuffer);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('알 수 없는 에러 발생');
      }
    }
  };

  const toneTransfer = async (modelType: string) => {
    setLoading(true);
    try {
      const mm = mmModule.current;
      if (mm === null) {
        throw new Error('Failed to load @magenta/music');
      }
      const ddsp = new mm.DDSP(PRESET_MODEL_URL + `/${modelType}`);
      await ddsp.initialize();
      const toneTransferredAudioData = await ddsp.synthesize(
        audioFeatures.current
      );
      const dataview = encodeWAV(
        toneTransferredAudioData,
        audioCtx.current!.sampleRate
      );
      const blob = new Blob([dataview], { type: 'audio/wav' });
      const url = window.URL.createObjectURL(blob);
      setConvertedUrl(url);
      ddsp.dispose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('알 수 없는 에러 발생');
      }
    }
    setLoading(false);
  };

  return { initialize, toneTransfer, loading, convertedUrl };
}
