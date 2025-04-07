'use client';

import Box from '@/components/common/Box';
import IconClose from '@/components/icons/IconClose';
import { useRecord } from '@/hooks/useRecord';
import { useUploadFlow } from '@/service/queries/useUploadFlow';
// import { INSTRUMENT_TYPE } from '@/service/types/Workspace';
import Skeleton from '@/components/common/Skeleton';
import { useDDSP } from '@/hooks/useDDSP';
import { useWorkRoomStore } from '@/stores/workroomStore';
import { ITrack } from '@/types/track';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React, { SetStateAction, useEffect, useState } from 'react';
import Recording from './Recording';
import SelectInstrument from './SelectInstrument';
import SelectMode from './SelectMode';
const InstrumentGenerator = dynamic(
  () => import('@/components/features/InstrumentGenerator'),
  { ssr: false }
);
interface Props {
  setIsCreate: React.Dispatch<SetStateAction<boolean>>;
  addTrack: (track: ITrack) => void;
}

const label = ['악기 선택', '녹음', '녹음 중'];

function RecordBox({ setIsCreate }: Props) {
  const { workroom_id } = useParams();
  const { isRecording, startRecording, stopRecording, audio } = useRecord();
  const [hasProcessed, setHasProcessed] = useState(false);
  const [level, setLevel] = useState<number>(0); // 녹음 절차
  const [genAudio, setGenAudio] = useState<string | null>(null);
  const [instrument, setInstrument] = useState<string | null>(null);
  const { initialized, toneTransfer, loading } = useDDSP();
  const [isAutoComplete, setAutoComplete] = useState<boolean>();
  const { tracks } = useWorkRoomStore();
  const mutation = useUploadFlow();

  function handleNextLevel() {
    setLevel(level + 1);
  }

  function handleClose() {
    setIsCreate(false);
    setLevel(0);
  }

  function handleAddTrack(convertedUrl: string) {
    if (!instrument) return;

    mutation.mutate({
      workroomId: workroom_id as string,
      originalAudio: audio,
      transAudio: convertedUrl,
      instrument: instrument,
      order: tracks.length + 1,
      trackName: instrument,
    });
    // addTrack({
    //   order: 0,
    //   trackId: 1,
    //   instrumentName: 'SoundHelix-Song-1',
    //   trackName: 'SoundHelix-Song-1',
    //   trackUrl: convertedUrl,
    //   recordId: 1,
    //   recordUrl: '',
    //   isPlaying: false,
    // });
  }
  useEffect(() => {
    console.log(audio, initialized);
    async function processRecording() {
      if (!hasProcessed && !isRecording && audio !== '' && initialized) {
        if (!instrument) return;
        const convertedUrl = await toneTransfer(instrument, audio);
        console.log(convertedUrl);
        handleAddTrack(convertedUrl);
        setIsCreate(false);
        setHasProcessed(true);
      }
    }
    processRecording();
  }, [audio, instrument, initialized, hasProcessed]);

  useEffect(() => {
    if (genAudio) {
      console.log(genAudio);
      async function processRecording() {
        if (!hasProcessed && genAudio && initialized) {
          if (!instrument) return;
          const convertedUrl = await toneTransfer(instrument, genAudio);
          console.log(convertedUrl);
          handleAddTrack(convertedUrl);
          setIsCreate(false);
          setHasProcessed(true);
        }
      }
      processRecording();
    }
  }, [genAudio]);

  return (
    <Box borderStyle='solid'>
      <div className='flex flex-col items-center gap-10'>
        <div className='w-full h-full flex justify-between'>
          <span>{label[level]}</span>
          {!isRecording && !isAutoComplete && !loading && (
            <div className='cursor-pointer' onClick={handleClose}>
              <IconClose width={15} height={15} color='#ffffff' />
            </div>
          )}
        </div>
        {loading ? (
          <Skeleton className='w-full h-24' />
        ) : (
          <>
            {level == 0 && (
              <SelectInstrument
                handleNextLevel={handleNextLevel}
                setInstrument={setInstrument}
              />
            )}
            {level == 1 && (
              <SelectMode
                handleNextLevel={handleNextLevel}
                setAutoComplete={setAutoComplete}
              />
            )}
            {level == 2 && !isAutoComplete && (
              <Recording
                isRecording={isRecording}
                stopRecording={stopRecording}
                startRecording={startRecording}
              />
            )}
            {level == 2 && isAutoComplete && (
              <InstrumentGenerator
                selectedInst={instrument}
                setGenAudio={setGenAudio}
              />
            )}
          </>
        )}
      </div>
    </Box>
  );
}

export default RecordBox;
