"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export type User = {
  _id: string;
  email: string;
  password: string;
  username: string;
  bio: string | null;
  profilePicture: string | null;
  followers: string[];
  following: string[];
};

type AuthContext = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

export type DecodedTokenType = {
  data: User;
  exp?: number;
};

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const localToken = localStorage.getItem("token");

    if (localToken) {
      const decodedToken: DecodedTokenType = jwtDecode(localToken);

      if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        router.push("/login");
      } else {
        setToken(localToken);
        setUser(decodedToken.data);
      }
    } else {
      router.push("/login");
    }
  }, []);

  const values = {
    user,
    setUser,
    token,
    setToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "Auth context ashiglahin tuld zaaval provider dotor bh heregtei!"
    );
  }

  return authContext;
};
