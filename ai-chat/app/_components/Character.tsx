import Link from "next/link";
import { prisma } from "@/lib/db";

export const Character = async () => {
  const characters = await prisma.character.findMany();

  if (characters.length === 0)
    return <p>No characters yet. Create one first.</p>;

  return (
    <div>
      {characters.map((character) => (
        <Link key={character.id} href={`/chat/${character.id}`}>
          {character.name}
        </Link>
      ))}
    </div>
  );
};
