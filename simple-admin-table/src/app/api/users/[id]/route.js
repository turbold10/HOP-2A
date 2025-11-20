import { NextResponse } from "next/server";
import fs from "fs/promises";

const filePath = "./data/users.json";

export const GET = async (_, { params }) => {
  const { id } = params;

  if (!id)
    return NextResponse.json(
      { message: "id хоосон байж болохгүй" },
      { status: 400 }
    );
  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(fileData);

    const user = users.find((user) => user.id === id);

    if (!user)
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );

    return NextResponse.json({ data: user });
  } catch (error) {
    return NextResponse.json(
      { message: "Алдаа гарлаа", error: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (_, { params }) => {
  const { id } = params;

  if (!id)
    return NextResponse.json(
      { message: "id хоосон байж болохгүй" },
      { status: 400 }
    );
  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(fileData);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1)
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );

    users.splice(userIndex, 1);

    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: "Хэрэглэгч амжилттай устгагдлаа" });
  } catch (error) {
    return NextResponse.json(
      { message: "Алдаа гарлаа", error: error.message },
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  const { id } = params;

  if (!id)
    return NextResponse.json(
      { message: "id хоосон байж болохгүй" },
      { status: 400 }
    );

  const { lastname, firstname, email, imageUrl } = await req.json();

  if (!lastname)
    return NextResponse.json(
      { message: "lastname хоосон байж болохгүй" },
      { status: 400 }
    );
  if (!firstname)
    return NextResponse.json(
      { message: "firstname хоосон байж болохгүй" },
      { status: 400 }
    );
  if (!email)
    return NextResponse.json(
      { message: "email хоосон байж болохгүй" },
      { status: 400 }
    );

  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(fileData);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1)
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );

    users[userIndex] = { id, lastname, firstname, email, imageUrl };

    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({
      message: "Амжилттай шинэчиллээ",
      data: users[userIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Алдаа гарлаа", error: error.message },
      { status: 500 }
    );
  }
};
