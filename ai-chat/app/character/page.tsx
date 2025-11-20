"use client";

import { useState } from "react";

export default function CreateCharacterPage() {
  const [name, setName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleCreate() {
    if (!name || !systemPrompt) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, systemPrompt }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create New Character</h1>

      <input
        type="text"
        placeholder="Character Name"
        className="border p-2 w-full rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="System Prompt"
        className="border p-2 w-full rounded h-40"
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Character"}
      </button>

      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <p className="font-semibold">Character Created:</p>
          <pre className="text-sm">
            {JSON.stringify(result.character, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
