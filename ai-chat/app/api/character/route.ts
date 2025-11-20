import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, systemPrompt } = await req.json();

    if (!name || !systemPrompt) {
      return NextResponse.json(
        { error: "Name and systemPrompt are required" },
        { status: 400 }
      );
    }

    const character = await prisma.character.create({
      data: {
        name,
        systemPrompt,
      },
    });

    return NextResponse.json({ character }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const characters = await prisma.character.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ characters });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to load characters" },
      { status: 500 }
    );
  }
}
