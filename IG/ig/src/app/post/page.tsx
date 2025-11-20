"use client";

import React, { useState } from "react";
import { usePollinationsImage } from "@pollinations/react";

const SunsetImageComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");

  const imageUrl = usePollinationsImage(submittedPrompt, {
    width: 800,
    height: 600,
    seed: 42,
    model: "turbo",
    nologo: true,
    enhance: true,
  });

  const handleGenerate = () => {
    if (prompt.trim() !== "") {
      setSubmittedPrompt(prompt);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h2>AI Image Generator</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your image description..."
        style={{
          padding: "12px",
          width: "80%",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <br />
      <button
        onClick={handleGenerate}
        disabled={!prompt.trim()}
        style={{
          marginTop: "15px",
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: prompt.trim() ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: prompt.trim() ? "pointer" : "not-allowed",
        }}
      >
        Generate Image
      </button>

      <div style={{ marginTop: "30px" }}>
        {submittedPrompt && !imageUrl && (
          <div>
            <p>Generating image for: {submittedPrompt}</p>
            <p>Loading...</p>
          </div>
        )}
        {imageUrl && (
          <div>
            <p>Generated image for: {submittedPrompt}</p>
            <img
              src={imageUrl}
              alt={`Generated image: ${submittedPrompt}`}
              style={{
                width: "100%",
                maxWidth: "800px",
                height: "auto",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SunsetImageComponent;
