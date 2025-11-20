import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";

const genAI = new GoogleGenerativeAI("AIzaSyBHBqvf7IBnvqepYpdgJXvF4_UmrErooUM");
const ai = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(
  req: Request,
  context: { params: Promise<{ characterId: string }> }
) {
  try {
    const { characterId } = await context.params;
    const { message } = await req.json();

    console.log("CharacterId:", characterId);

    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character)
      return NextResponse.json(
        { error: "Character not found" },
        { status: 404 }
      );

    // const history = await prisma.message.findMany({
    //   where: { characterId },
    //   orderBy: { createdAt: "asc" },
    //   take: 20,
    // });

    const prompt = [
      {
        role: "user",
        parts: [{ text: `SYSTEM INSTRUCTION:\n${character.systemPrompt}` }],
      },
      // ...history.map((m) => ({
      //   role: m.role === "assistant" ? "model" : "user",
      //   parts: [{ text: m.content }],
      // })),

      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const result = await ai.generateContent({
      contents: prompt,
    });

    const reply = result.response.text();

    await prisma.message.createMany({
      data: [
        { role: "user", content: message, characterId },
        { role: "assistant", content: reply, characterId },
      ],
    });

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export const POST = (
  req: Request,
  context: 
) => {
  const { characterId } = await context.params

  const body = await req.json()


  NextResponse.json({ error: "Server error" }, { status: 500 });
}


