"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { decodedTokenType, useUser } from "@/providers/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const { push } = useRouter();
  const { setToken, setUser } = useUser();

  const signup = async () => {
    const response = await fetch("http://localhost:5555/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: "turbold",
        password: "turuu123",
        email: "tur@gmail.com",
      }),
    });

    if (response.ok) {
      const token = await response.json();
      localStorage.setItem("token", token);
      setToken(token);
      const decodedToken: decodedTokenType = jwtDecode(token);
      setUser(decodedToken.data);
      toast.success("nice");
      push("/");
    } else {
      toast.error("GG");
    }
  };

  return (
    <div>
      <Input placeholder="username" />
      <Input placeholder="email" />
      <Input placeholder="password" />
      <Button onClick={signup}>Signup</Button>
    </div>
  );
};

export default Page;
