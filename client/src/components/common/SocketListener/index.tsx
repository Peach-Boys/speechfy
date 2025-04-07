'use client';

import useWebSocket from '@/hooks/useWebSocket';
import { BaseCompletedSong } from '@/types/workroom';
import { useEffect } from 'react';

/**
 * 'ai-done' 이벤트를 수신하기 위한 타입 정의인데, 정확한 메세지 형식은 정해지지 않음.
 * 결과도 아직 정해지지 않음
 */
type WebSocketEventMap = {
  'ai-done': { result: BaseCompletedSong };
};

function SocketContext() {
  const { wsConnection, on } = useWebSocket<WebSocketEventMap>();

  useEffect(() => {
    wsConnection();

    on('ai-done', (data) => {
      console.log('AI 작업 완료:', data.result);
      // data.result -> previewsonglist 저장
    });
  }, []);

  return <></>;
}

export default SocketContext;
