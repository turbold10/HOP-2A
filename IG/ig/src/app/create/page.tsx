"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/AuthContext";
import { upload } from "@vercel/blob/client";
import { useState } from "react";
import { toast } from "sonner";

const HuggingFaceImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useUser();

  const HF_API_KEY = process.env.HF_API_KEY;

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate");

      const blob = await response.blob();

      const file = new File([blob], "generated.png", { type: "image/png" });

      const uploaded = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      setImageUrl((prev) => [...prev, uploaded.url]);
    } catch (err) {
      console.error(err);
      toast.error("Error generating image");
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async () => {
    const res = await fetch("http://localhost:5555/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        caption: "turuugin post",
        images: imageUrl,
      }),
    });

    if (res.ok) {
      toast.success("success!");
    } else {
      toast.error("try again!");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          AI Image Generator
        </h1>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Describe your image:
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A beautiful sunset over mountains, detailed, vibrant colors, photorealistic..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <button
            onClick={generateImage}
            disabled={!prompt.trim() || isLoading}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
              !prompt.trim() || isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 active:scale-95"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Generating...
              </div>
            ) : (
              "Generate Image"
            )}
          </button>
        </div>

        {isLoading && (
          <div className="mt-8 text-center p-6 bg-purple-50 rounded-lg">
            <div className="text-purple-600 mb-2">Unshijiisihde...</div>
            <div className="text-sm text-purple-500">
              This may take 10-30 seconds
            </div>
          </div>
        )}

        {imageUrl && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Your Generated Image:
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              {imageUrl.map((url) => {
                return (
                  <img
                    src={url}
                    key={url}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">
            💡 Tips for Better Results:
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Be specific: photorealistic portrait vs just portrait</li>
            <li>• Add style keywords: digital art, oil painting, cinematic</li>
            <li>• Include quality terms: high detail, sharp focus, 8k</li>
            <li>• First generation might be slow (model loading)</li>
          </ul>
        </div>
      </div>
      <Button onClick={createPost}>create post</Button>
    </div>
  );
};

export default HuggingFaceImageGenerator;
