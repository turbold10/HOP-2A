import { House } from "lucide-react";
import { Search } from "lucide-react";
import { SquarePlus } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/providers/AuthContext";

export const Footer = () => {
  const { user } = useUser();

  return (
    <div className="fixed bottom-0 flex justify-between w-screen px-8 py-2">
      <Link href="/">
        <House />
      </Link>
      <Link href="/search">
        <Search />
      </Link>
      <Link href="/create">
        <SquarePlus />
      </Link>
      <Link href="/profile">
        <Avatar>
          <AvatarImage src={user!.profilePicture!} />
          <AvatarFallback>
            {user?.username.charAt(0).toUpperCase()}
            {user?.username.charAt(1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
};
