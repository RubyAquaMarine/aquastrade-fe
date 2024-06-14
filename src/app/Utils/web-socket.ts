"use client";

export const BINANCE_WEB_SOCKET_ENDPOINT: string =
  "wss://stream.binance.com:9443/ws/!ticker@arr";

export const BINANCE_WEB_SOCKET_KLINE_ENDPOINT: string =
  "wss://stream.binance.com:9443/ws/ethusdt@kline_1m";

export const BINANCE_API_ENDPOINT: string =
  "https://api.binance.com/api/v3/klines";

let webSocket: WebSocket | null = null;

export const getWebSocket = () => webSocket;

export const connectWebSocket = () => {
  if (!webSocket) {
    console.log("[Connecting to WebSocket...]");
    webSocket = new WebSocket(BINANCE_WEB_SOCKET_KLINE_ENDPOINT);

    console.log("[WebSocket ]", webSocket);
  } else {
    console.log("[WebSocket already connected]");
  }
};

export const disconnectWebSocket = () => {
  if (webSocket) {
    console.log("[Disconnecting WebSocket...]");
    webSocket.close();
    webSocket = null;
  } else {
    console.log("[WebSocket already disconnected]");
  }
};
