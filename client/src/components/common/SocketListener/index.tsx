'use client';

import useWebSocket from '@/hooks/useWebSocket';
import { AISong } from '@/types/song';
import { useEffect } from 'react';

type WebSocketEventMap = {
  AI_COMPOSE_SUCCESS: { result: AISong };
};

function SocketContext() {
  const { wsConnection, on } = useWebSocket<WebSocketEventMap>();

  useEffect(() => {
    wsConnection();

    on('AI_COMPOSE_SUCCESS', (data) => {
      console.log('AI 작업 완료:', data.result);
      // data.result -> previewsonglist 저장
    });
  }, []);

  return <></>;
}

export default SocketContext;
