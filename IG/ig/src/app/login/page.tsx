"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IG_LOGO } from "@/icons/ig-logo";
import { decodedTokenType, useUser } from "@/providers/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const Page = () => {
  const { token, setToken, setUser } = useUser();
  const { push } = useRouter();

  const login = async () => {
    const response = await fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: "tur@gmail.com",
        password: "turuu123",
      }),
    });
    if (response.ok) {
      const token = await response.json();
      localStorage.setItem("token", token);
      setToken(token);
      const decodedToken: decodedTokenType = jwtDecode(token);
      setUser(decodedToken.data);
      push("/");
      toast.success("Gal2");
    } else {
      toast.error("Sorry nz min");
    }
  };

  useEffect(() => {
    if (token) push("/");
  }, [token]);

  return (
    <div className="w-max-[500px]">
      <Input placeholder="email" className="w-full bg-amber-300" />
      <Input placeholder="password" />
      <Button onClick={login}>Login</Button>
    </div>
  );
};

export default Page;
