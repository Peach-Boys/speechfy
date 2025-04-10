'use client';

import useWebSocket from '@/hooks/useWebSocket';
import { AISong } from '@/types/song';
import { useEffect } from 'react';

type WebSocketEventMap = {
  AI_COMPOSE_SUCCESS: { result: AISong };
};

function SocketContext() {
  const { on, ws } = useWebSocket<WebSocketEventMap>();

  useEffect(() => {
    on('AI_COMPOSE_SUCCESS', () => {
      alert('작업이 끝났어요.\n작업실로 가서 만들어진 곡을 만나봐요!');
      if (ws.current) {
        ws.current.close();
      }
    });
  }, []);

  return <></>;
}

export default SocketContext;
