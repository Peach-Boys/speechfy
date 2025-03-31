import { useRef } from 'react';

export const useWebSocket = () => {
  const ws = useRef<WebSocket | null>(null);
  const { NEXT_PUBLIC_SOCKET_BASE } = process.env;

  function wsConnection() {
    ws.current = new WebSocket(`${NEXT_PUBLIC_SOCKET_BASE}/`);

    ws.current.onopen = () => console.log('WebSocket 연결');
    ws.current.onerror = (err) => console.error('WebSocket 에러', err);
    ws.current.onclose = () => {
      console.log('WebSocket 닫힘');
      ws.current = null;
    };
  }

  return {
    ws,
    wsConnection,
  };
};
