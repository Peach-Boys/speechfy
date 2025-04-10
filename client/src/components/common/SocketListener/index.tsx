'use client';

import useWebSocket from '@/hooks/useWebSocket';
import { AISong } from '@/types/song';
import { useEffect, useRef } from 'react';

type WebSocketEventMap = {
  AI_COMPOSE_SUCCESS: { result: AISong };
};

function SocketContext() {
  const { wsConnection, on, ws } = useWebSocket<WebSocketEventMap>();
  const connected = useRef<boolean>(false);

  useEffect(() => {
    const isLogin = localStorage.getItem('speechfy');
    if (isLogin && !connected.current) {
      wsConnection();
      connected.current = true;

      on('AI_COMPOSE_SUCCESS', () => {
        alert('작업이 끝났어요.\n작업실로 가서 만들어진 곡을 만나봐요!');
      });
    }

    if (!isLogin && connected.current && ws.current) {
      ws.current.close();
      connected.current = false;
    }
  }, []);

  return <></>;
}

export default SocketContext;
