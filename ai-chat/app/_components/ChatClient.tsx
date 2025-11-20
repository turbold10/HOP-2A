"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatClient({ characterId }: { characterId: string }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const chatRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    const res = await fetch(`/api/chat/${characterId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();

    // Add AI reply
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply ?? "Error: No reply" },
    ]);
  }

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto">
      {/* chat window */}
      <div
        ref={chatRef}
        className="h-[500px] overflow-y-auto border p-3 rounded mb-3 bg-white shadow"
      >
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <p
              className={m.role === "user" ? "text-blue-600" : "text-green-600"}
            >
              <strong>{m.role}:</strong> {m.content}
            </p>
          </div>
        ))}
      </div>

      {/* input */}
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage() : null)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
