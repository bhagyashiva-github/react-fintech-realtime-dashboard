import { useEffect } from 'react';

export const useCryptoSocket = (
  symbol: string,
  onMessage: (data: unknown) => void
) => {
  useEffect(() => {
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    return () => socket.close();
  }, [symbol, onMessage]);
};
