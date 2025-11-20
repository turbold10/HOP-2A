"use client";

import { useParams } from "next/navigation";
import ChatClient from "../../_components/ChatClient";

export default function ChatPage() {
  const { characterId } = useParams();

  if (!characterId) {
    return (
      <div className="p-6 text-center text-red-600">
        No character selected. Go back and choose one.
      </div>
    );
  }

  return <ChatClient characterId={characterId as string} />;
}
