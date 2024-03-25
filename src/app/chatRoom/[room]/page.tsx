"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import Chats from "@/app/Components/Chat";
import styles from "@/app//Styles/Chat.module.css";

const socket = io("http://localhost:5000/"); // connects to socket server URL

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const path = usePathname();
  const dappType = path;

  const joinRoom = () => {
    // sends a join room event to socket.io server
    if (username !== "" && room !== "") {
      socket.emit("join_room", room); // sends a join_room event with data
      setShowChat(true);
    } else {
      toast.error("Empty Room or Username field");
    }
  };

  useEffect(() => {
    console.log("Room ID should be changed to this ", dappType);
    setRoom(dappType);
  }, [dappType]);

  return (
    <>
      <div>
        {!showChat && (
          <div className={styles.joinChatContainer}>
            <h1>Join a Chat</h1>

            <input
              type="text"
              placeholder="Name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />

            <button onClick={joinRoom}>Join a Room</button>
          </div>
        )}

        {showChat && <Chats socket={socket} username={username} room={room} />}
      </div>
    </>
  );
}

export default App;
