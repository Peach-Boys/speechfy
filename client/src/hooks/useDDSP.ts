import { useRef, useState, useEffect } from 'react';
import { encodeWAV } from '@/utils/encodeWAV';
import * as m from '@magenta/music';

const PRESET_MODEL_URL = '/model';
const MODEL_TYPES = ['violin', 'flute', 'trumpet', 'tenor_saxophone'];

export function useDDSP() {
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const audioCtx = useRef<AudioContext | null>(null);
  const spice = useRef<m.SPICE | null>(null);
  const audioFeatures = useRef(null);
  const mmModule = useRef<typeof m | null>(null);
  const ddspModels = useRef<Map<string, m.DDSP>>(new Map());

  // 초기화: 컴포넌트가 마운트되면 자동으로 실행
  useEffect(() => {
    async function initializeAllModels() {
      try {
        // mmModule이 아직 로드되지 않았다면 동적 import
        if (!mmModule.current) {
          const mm = await import('@magenta/music');
          mmModule.current = mm;
        }
        const mm = mmModule.current;

        // SPICE 모델 초기화
        spice.current = new mm.SPICE(`${PRESET_MODEL_URL}/spice`);
        await spice.current.initialize();

        // 지정된 모든 DDSP 모델(여기서는 violin, flute, trumpet, tenor_saxophone)을 미리 초기화
        for (const modelType of MODEL_TYPES) {
          const ddsp = new mm.DDSP(`${PRESET_MODEL_URL}/${modelType}`);
          await ddsp.initialize();
          ddspModels.current.set(modelType, ddsp);
        }

        setInitialized(true);
      } catch (error: unknown) {
        console.error('Tone transfer error:', error);
        throw new Error((error as Error).message);
      }
    }
    initializeAllModels();
  }, []);

  // toneTransfer 함수는 사전에 초기화된 DDSP 모델 중 원하는 모델을 선택하여 변환 실행
  const toneTransfer = async (modelType: string, audioUrl: string) => {
    if (!initialized) {
      throw new Error('모델이 아직 초기화되지 않았습니다.');
    }
    setLoading(true);
    try {
      // AudioContext 생성 및 시작
      const ctx = new AudioContext();
      await ctx.resume();
      audioCtx.current = ctx;
      // 오디오 파일 로드 및 오디오 피처 추출
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      audioFeatures.current =
        await spice.current!.getAudioFeatures(audioBuffer);

      const mm = mmModule.current;
      if (!mm) {
        throw new Error('Magenta Music 모듈을 로드하지 못했습니다.');
      }
      const ddsp = ddspModels.current.get(modelType);
      if (!ddsp) {
        throw new Error(`DDSP 모델(${modelType})이 초기화되지 않았습니다.`);
      }
      // 사전에 추출된 오디오 피처를 이용하여 변환 수행
      const toneTransferredAudioData = await ddsp.synthesize(
        audioFeatures.current
      );
      const dataview = encodeWAV(
        toneTransferredAudioData,
        audioCtx.current!.sampleRate
      );
      const blob = new Blob([dataview], { type: 'audio/wav' });
      const url = window.URL.createObjectURL(blob);
      setLoading(false);
      return url;
      // 필요에 따라 ddsp.dispose()를 호출해 리소스를 해제할 수 있으나,
      // 모델 재사용을 위해 계속 유지할 수도 있습니다.
    } catch (error: unknown) {
      console.error('Tone transfer error:', error);
      throw new Error((error as Error).message);
    }
  };

  return { initialized, toneTransfer, loading };
}
