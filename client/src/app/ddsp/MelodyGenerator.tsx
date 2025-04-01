'use client';
import { useMusicVaeGenerator } from '@/hooks/useMusicVaeGenerator';
import { useDDSP } from '@/hooks/useDDSP';
import { useEffect, useState } from 'react';

const MelodyGenerator = () => {
  // BPM, 마디 수, temperature 값은 필요에 따라 조정
  const { loading, audioURL, generatedSequence, generateMelody } =
    useMusicVaeGenerator(125, 16, 1.3);
  const { initialized, toneTransfer } = useDDSP();
  const [genAudio, setGenAudio] = useState<string>('');
  useEffect(() => {
    async function generate() {
      if (audioURL && initialized) {
        const audio = await toneTransfer('tenor_saxophone', audioURL);
        setGenAudio(audio);
      }
    }
    generate();
  }, [audioURL]);
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>MusicVAE Melody Generator</h1>
      <button onClick={generateMelody} disabled={loading}>
        {loading ? '생성 중...' : '멜로디 생성'}
      </button>
      {audioURL && genAudio !== '' && (
        <div>
          <h2>생성된 멜로디 (WAV)</h2>
          <audio src={genAudio} controls />
        </div>
      )}
      {generatedSequence && (
        <div>
          <h3>생성된 NoteSequence</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(generatedSequence, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default MelodyGenerator;
