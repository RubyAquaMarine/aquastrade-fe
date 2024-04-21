"use client";
import { useEffect } from "react";
import { connectWebSocket, disconnectWebSocket } from "@/app/Utils/web-socket";

const WebSocketConnection = () => {
  useEffect(() => {
    connectWebSocket(); // Connect to the WebSocket

    return () => {
      disconnectWebSocket(); // Disconnect the WebSocket on component unmount
    };
  }, []);

  return null;
};
export default WebSocketConnection;
