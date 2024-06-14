"use client";
import { useEffect } from "react";
import { connectWebSocket, disconnectWebSocket } from "@/app/Utils/web-socket";

const WebSocketConnection = () => {
  console.log(" Use Web Socket ");
  useEffect(() => {
    connectWebSocket(); // Connect to the WebSocket
    console.log(" Use WebSocketConnection connectWebSocket");
    return () => {
      disconnectWebSocket(); // Disconnect the WebSocket on component unmount
      console.log(" Use WebSocketConnection  disconnectWebSocket");
    };
  }, []);

  return null;
};
export default WebSocketConnection;
