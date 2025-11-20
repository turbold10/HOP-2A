"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { LayoutDashboard } from "lucide-react";
import { UserToggle } from "./user-toggle";

export const Header = () => {
  return (
    <div className="border-b bg-background">
      <div className="container flex items-center justify-between py-3 mx-auto">
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <LayoutDashboard />
          </Link>
        </div>
        <div className="flex space-x-4 flex-end">
          <ModeToggle />
          <UserToggle />
        </div>
      </div>
    </div>
  );
};
