import { useRef } from 'react';

type WebSocketEventMap = Record<string, unknown>;

function useWebSocket<T extends WebSocketEventMap>() {
  const ws = useRef<WebSocket | null>(null);
  const listeners = useRef<Partial<{ [K in keyof T]: (data: T[K]) => void }>>(
    {}
  );

  const NEXT_PUBLIC_SOCKET_BASE = process.env.NEXT_PUBLIC_SOCKET_BASE;
  function wsConnection() {
    ws.current = new WebSocket(`${NEXT_PUBLIC_SOCKET_BASE}`);

    ws.current.onopen = () => console.log('WebSocket 연결');
    ws.current.onerror = (err) => console.error('WebSocket 에러', err);
    ws.current.onclose = () => {
      console.log('WebSocket 닫힘');
      ws.current = null;
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as {
          message: keyof T;
          data: unknown;
        };

        const { message: type, data } = message;
        const listener = listeners.current[type];
        if (listener) {
          (listener as (data: unknown) => void)(data);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error('WebSocket 에러', e.message);
        } else {
          console.error('알 수 없는 에러 발생');
        }
      }
    };
  }

  function on<K extends keyof T>(event: K, callback: (data: T[K]) => void) {
    listeners.current[event] = callback;
  }
  return {
    ws,
    wsConnection,
    on,
  };
}

export default useWebSocket;
