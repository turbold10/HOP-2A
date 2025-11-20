"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type ChatMessage = {
  text: string;
  user?: string;
  timestamp?: number;
};

type ServerToClientEvents = {
  receiveMessage: (msg: ChatMessage) => void;
  chatHistory: (history: ChatMessage[]) => void;
};

type ClientToServerEvents = {
  sendMessage: (msg: ChatMessage) => void;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    fetch("/api/socket");

    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:3001"
    );

    setSocket(newSocket);

    newSocket.on("receiveMessage", (msg) => setChat((prev) => [...prev, msg]));

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !socket) return;

    const newMsg: ChatMessage = {
      text: message,
      timestamp: Date.now(),
    };

    socket.emit("sendMessage", newMsg);
    setMessage("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Real-Time Chat</h1>

      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "auto",
          padding: "1rem",
        }}
      >
        {chat.map((msg, i) => (
          <div key={i}>
            <b>{msg.user || "User"}:</b> {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ marginTop: "16px" }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "80%", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Send
        </button>
      </form>
    </div>
  );
}
