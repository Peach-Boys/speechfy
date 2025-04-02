'use client';
import { useRecord } from '@/hooks/useRecord';

function LandingRecord() {
  const { isRecording, startRecording, audio, stopRecording } = useRecord();
  return (
    <div>
      <button>녹음</button>
    </div>
  );
}

export default LandingRecord;
