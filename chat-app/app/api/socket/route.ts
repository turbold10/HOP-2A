import { Server as IOServer, Socket } from "socket.io";
import type { NextRequest } from "next/server";

type ChatMessage = {
  text: string;
  user?: string;
  timestamp?: number;
};

let io: IOServer | undefined;

const messageHistory: ChatMessage[] = [];

export const GET = async (req: NextRequest): Promise<Response> => {
  if (!io) {
    io = new IOServer(3001, {
      cors: { origin: "*" },
    });

    io.on("connection", (socket: Socket) => {
      console.log("User connected:", socket.id);

      socket.on("sendMessage", (msg: ChatMessage) => {
        const message = {
          ...msg,
          timestamp: msg.timestamp ?? Date.now(),
        };

        messageHistory.push(message);

        io?.emit("receiveMessage", message);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  return new Response("Socket server running", { status: 200 });
};
