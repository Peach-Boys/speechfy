'use client';

import { useRef, useState } from 'react';

export function useRecord(): {
  isRecording: boolean;
  startRecording: () => Promise<void>;
  audio: string;
  stopRecording: () => void;
} {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audio, setAudio] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudio(audioUrl);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        throw new Error('알 수 없는 에러 발생');
      }
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };
  return { isRecording, startRecording, audio, stopRecording };
}
