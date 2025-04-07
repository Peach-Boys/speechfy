import React, { useEffect, useRef, useState } from 'react';

export function useAudioPlayBar(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const handlePlay = (e?: React.MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onReady = () => setIsReady(true);
    const onSet = () => setEndTime(audio.duration);
    const onUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('canplaythrough', onReady);
    audio.addEventListener('loadedmetadata', onSet);
    audio.addEventListener('timeupdate', onUpdate);

    return () => {
      audio.removeEventListener('canplaythrough', onReady);
      audio.removeEventListener('loadedmetadata', onSet);
      audio.removeEventListener('timeupdate', onUpdate);
    };
  }, [src]);

  useEffect(() => {
    if (currentTime === endTime) setIsPlaying(false);
  }, [currentTime, endTime]);

  return {
    audioRef,
    isPlaying,
    isReady,
    currentTime,
    endTime,
    handlePlay,
    handleSeek,
  };
}
