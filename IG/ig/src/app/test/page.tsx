"use client";

import { useState } from "react";

export default function StoryImagePage() {
  const [prompt, setPrompt] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleGenerate() {
    setErrorMsg(null);
    setGeneratedImage(null);

    if (!prompt || !characterDescription || !referenceFile) {
      setErrorMsg(
        "Please enter prompt, character description, and upload a reference image."
      );
      return;
    }

    setLoading(true);

    try {
      // Convert reference image to Base64
      const base64Ref = await toBase64(referenceFile);

      const res = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          characterDescription,
          referenceImageBase64: base64Ref,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      setGeneratedImage(data.image);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    }

    setLoading(false);
  }

  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Storybook Character Generator
          </h1>
          <p className="text-gray-600 mb-8">
            Create consistent characters for your children's stories
          </p>

          {errorMsg && (
            <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg mb-6 flex items-start gap-3">
              <svg
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Reference Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reference Image (Character Face)
              </label>
              <div className="flex items-start gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-400 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm text-gray-600">
                        Click to upload character reference
                      </span>
                      <span className="text-xs text-gray-400">
                        PNG, JPG up to 10MB
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setReferenceFile(e.target.files?.[0] || null)
                    }
                  />
                </label>

                {referenceFile && (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(referenceFile)}
                      alt="reference"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-purple-200"
                    />
                    <button
                      onClick={() => setReferenceFile(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Character Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Character Description
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="e.g., A friendly 5-year-old girl with curly brown hair, wearing a red hoodie and jeans. She has bright green eyes and a warm smile..."
                value={characterDescription}
                onChange={(e) => setCharacterDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Scene Prompt */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Scene Description
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="e.g., Playing in a magical forest with talking animals, surrounded by colorful flowers and butterflies..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Generating your character...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Generate Storybook Image</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Image */}
          {generatedImage && (
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Your Generated Character:
              </h2>
              <div className="relative group">
                <img
                  src={generatedImage}
                  alt="storybook character"
                  className="w-full rounded-xl shadow-2xl border-4 border-purple-100"
                />
                <a
                  href={generatedImage}
                  download="storybook-character.png"
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-white transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
