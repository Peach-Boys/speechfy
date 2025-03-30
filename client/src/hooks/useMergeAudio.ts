import { useState, useCallback } from 'react';

// Window에 webkitAudioContext 속성이 있을 수 있도록 타입 확장
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

interface UseMergeAudio {
  mergeWavFiles: (fileUrls: string[]) => Promise<ArrayBuffer>;
  isLoading: boolean;
  error: Error | null;
}

function useMergeWavFiles(): UseMergeAudio {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mergeWavFiles = useCallback(
    async (fileUrls: string[]): Promise<ArrayBuffer> => {
      try {
        setIsLoading(true);
        // AudioContext 생성 (브라우저 호환 처리)
        const AudioContextConstructor =
          window.AudioContext || window.webkitAudioContext;
        if (!AudioContextConstructor) {
          throw new Error('AudioContext is not supported in this browser.');
        }
        const audioContext = new AudioContextConstructor();

        // 각 파일을 AudioBuffer로 디코딩
        const buffers: AudioBuffer[] = await Promise.all(
          fileUrls.map(async (url: string): Promise<AudioBuffer> => {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return new Promise<AudioBuffer>((resolve, reject) => {
              audioContext.decodeAudioData(arrayBuffer, resolve, reject);
            });
          })
        );

        // 모든 파일은 동일한 샘플레이트, 채널 수, 길이(예: 17초)를 가진다고 가정
        const sampleRate = buffers[0].sampleRate;
        const duration = buffers[0].duration; // 예: 17초
        const numberOfChannels = buffers[0].numberOfChannels;

        // OfflineAudioContext를 생성하여 믹싱 처리
        const offlineContext = new OfflineAudioContext(
          numberOfChannels,
          sampleRate * duration,
          sampleRate
        );

        // 각 AudioBuffer를 OfflineAudioContext에 추가 (볼륨 조절로 클리핑 방지)
        buffers.forEach((buffer: AudioBuffer) => {
          const source = offlineContext.createBufferSource();
          source.buffer = buffer;
          const gainNode = offlineContext.createGain();
          gainNode.gain.value = 1 / buffers.length; // 예: 4개 파일이면 0.25
          source.connect(gainNode);
          gainNode.connect(offlineContext.destination);
          source.start(0);
        });

        // 믹싱된 오디오 렌더링
        const renderedBuffer = await offlineContext.startRendering();

        // 렌더링된 AudioBuffer를 WAV 파일 포맷으로 인코딩
        const wavArrayBuffer = audioBufferToWav(renderedBuffer);
        return wavArrayBuffer;
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
          throw err;
        } else {
          const unknownError = new Error('An unknown error occurred.');
          setError(unknownError);
          throw unknownError;
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { mergeWavFiles, isLoading, error };
}

/* AudioBuffer를 WAV 포맷의 ArrayBuffer로 변환 */
function audioBufferToWav(
  buffer: AudioBuffer,
  opt?: { float32?: boolean }
): ArrayBuffer {
  opt = opt || {};
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = opt.float32 ? 3 : 1; // 3: float, 1: PCM
  const bitDepth = format === 3 ? 32 : 16;

  let result: Float32Array;
  if (numChannels === 2) {
    result = interleave(buffer.getChannelData(0), buffer.getChannelData(1));
  } else {
    result = buffer.getChannelData(0);
  }

  return encodeWAV(result, format, sampleRate, numChannels, bitDepth);
}

/* 스테레오 채널 데이터를 인터리브(교차 배치) */
function interleave(left: Float32Array, right: Float32Array): Float32Array {
  const length = left.length + right.length;
  const result = new Float32Array(length);
  let index = 0;
  let inputIndex = 0;

  while (index < length) {
    result[index++] = left[inputIndex];
    result[index++] = right[inputIndex];
    inputIndex++;
  }
  return result;
}

/* WAV 파일 포맷에 맞게 헤더와 PCM 데이터를 작성 */
function encodeWAV(
  samples: Float32Array,
  format: number,
  sampleRate: number,
  numChannels: number,
  bitDepth: number
): ArrayBuffer {
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
  const view = new DataView(buffer);

  // RIFF identifier
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * bytesPerSample, true);
  writeString(view, 8, 'WAVE');

  // fmt sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);

  // data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * bytesPerSample, true);

  // PCM 데이터를 작성 (여기서는 16비트 PCM)
  if (format === 1) {
    floatTo16BitPCM(view, 44, samples);
  } else {
    // float32 처리 로직이 필요하면 여기에 구현
  }

  return buffer;
}

/* DataView에 문자열 기록 */
function writeString(view: DataView, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

/* 부동소수점 데이터를 16비트 PCM 데이터로 변환 */
function floatTo16BitPCM(
  output: DataView,
  offset: number,
  input: Float32Array
): void {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
}

export default useMergeWavFiles;
