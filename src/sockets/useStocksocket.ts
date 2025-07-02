import { useEffect, useRef } from 'react';

type TradeMessage = {
  type: 'trade';
  data: { s: string; p: number }[];
};

export const useStockSocket = (
  symbols: string[],
  onMessage: (symbol: string, price: number) => void
) => {
  const socketRef = useRef<WebSocket | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const socket = new WebSocket('wss://ws.finnhub.io?token=d1ifhu9r01qhsrhf9ek0d1ifhu9r01qhsrhf9ekg');
    socketRef.current = socket;

    const startPolling = () => {
      if (!pollingRef.current) {
        pollingRef.current = setInterval(async () => {
          try {
            const res = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbols[0]}&token=d1ifhu9r01qhsrhf9ek0d1ifhu9r01qhsrhf9ekg`
            );
            const data = await res.json();
            onMessage(symbols[0], data.c); // 'c' = current price
          } catch (err) {
            console.error('Polling error:', err);
          }
        }, 5000);
        console.log('📡 Polling started');
      }
    };

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
      symbols.forEach((symbol) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: 'subscribe', symbol }));
        }
      });
    };

    socket.onmessage = (event) => {
      try {
        const msg: TradeMessage = JSON.parse(event.data);
        if (msg.type === 'trade') {
          msg.data.forEach((trade) => {
            onMessage(trade.s, trade.p);
          });
        }
      } catch (err) {
        console.error('❌ Error parsing WebSocket message', err);
      }
    };

    socket.onerror = (err) => {
      console.error('🚨 WebSocket error:', err);
      startPolling();
    };

    socket.onclose = () => {
      console.warn('⚠️ WebSocket closed');
      startPolling();
    };

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
        console.log('🛑 Polling stopped');
      }

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        symbols.forEach((symbol) => {
          socketRef.current?.send(JSON.stringify({ type: 'unsubscribe', symbol }));
        });
        socketRef.current?.close();
        console.log('🔌 WebSocket unsubscribed and closed');
      } else {
        console.warn('⏱️ Cleanup skipped: socket not open');
      }
    };
  }, [symbols, onMessage]);
};
