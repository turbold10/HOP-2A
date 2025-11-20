import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt, characterDescription, referenceImageBase64 } = await req.json();

  if (!referenceImageBase64) {
    return NextResponse.json({ error: "Reference image missing" }, { status: 400 });
  }

  // Enhanced prompt for character consistency
  const fullPrompt = `
Portrait of ${characterDescription}, ${prompt}.
Style: children's storybook illustration, soft digital painting, 
pastel watercolor colors, warm gentle lighting, rounded friendly shapes, 
expressive cartoon face, whimsical magical atmosphere, cozy feeling, 
hand-painted texture, smooth shading, storybook art, innocent expression.
High quality illustration, professional children's book art.
`.trim();

  const negativePrompt = `
realistic, photographic, photograph, photo, dark, scary, horror, 
creepy, nightmare, harsh lighting, harsh shadows, gore, violence,
extra limbs, deformed hands, distorted face, disfigured, 
ugly, blurry, bad anatomy, bad proportions, duplicate, 
3d render, cgi, overdetailed, gritty, sharp edges,
lowres, worst quality, low quality, jpeg artifacts, 
signature, watermark, text, logo, brand
`.trim();

  try {
    // Using the NEW router endpoint
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
          "X-Wait-For-Model": "true",
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            negative_prompt: negativePrompt,
            num_inference_steps: 50,
            guidance_scale: 7.5,
            width: 1024,
            height: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HuggingFace error:", errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    // Check content type
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      // If JSON response, it might be an error
      const jsonData = await response.json();
      throw new Error(JSON.stringify(jsonData));
    }

    // Response is binary image data
    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    return NextResponse.json({
      image: `data:image/png;base64,${base64Image}`,
    });
  } catch (error: any) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: error.message || "Generation failed" },
      { status: 500 }
    );
  }
}