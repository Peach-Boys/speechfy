'use client';

import { AISong } from '@/types/song';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';

type WebSocketEventMap = {
  AI_COMPOSE_SUCCESS: { result: AISong };
};

interface Props {
  on: <K extends keyof WebSocketEventMap>(
    event: K,
    callback: (data: WebSocketEventMap[K]) => void
  ) => void;
  ws: React.RefObject<WebSocket | null>;
}

function SocketContext({ on, ws }: Props) {
  const queryClient = useQueryClient();
  useEffect(() => {
    on('AI_COMPOSE_SUCCESS', () => {
      alert('작업이 끝났어요.\n작업실로 가서 만들어진 곡을 만나봐요!');
      queryClient.invalidateQueries({
        queryKey: ['previewSongList'],
      });
      if (ws.current) {
        ws.current.close();
      }
    });
  }, []);

  return <></>;
}

export default SocketContext;
