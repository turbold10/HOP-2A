import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import fs from "fs/promises"; // Use fs/promises for async operations

const filePath = "./data/users.json";

export const GET = async () => {
  const fileData = await fs.readFile(filePath, "utf-8");
  return NextResponse.json(JSON.parse(fileData));
};

export const POST = async (req) => {
  const { lastname, firstname, email, imageUrl } = await req.json();

  if (!lastname) return NextResponse.json({ message: "lastname хоосон байж болохгүй" }, { status: 400 });
  if (!firstname) return NextResponse.json({ message: "firstname хоосон байж болохгүй" }, { status: 400 });
  if (!email) return NextResponse.json({ message: "email хоосон байж болохгүй" }, { status: 400 });

  const newUser = { id: nanoid(), lastname, firstname, email, imageUrl };

  let users = [];
  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    users = JSON.parse(fileData);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  users.push(newUser);

  await fs.writeFile(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ message: "Амжилттай нэмлээ", data: newUser });
};
