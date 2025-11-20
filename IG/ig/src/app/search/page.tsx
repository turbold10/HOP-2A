"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, useUser } from "@/providers/AuthContext";
import { upload } from "@vercel/blob/client";
import {
  ChangeEvent,
  ReactElement,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";

const Page = () => {
  const { token } = useUser();
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const getUsers = async () => {
    const response = await fetch(`http://localhost:5555/users/${searchValue}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const users = await response.json();
    setUsers(users);
  };

  useEffect(() => {
    if (token && searchValue) getUsers();
  }, [searchValue, token]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const uploadImage = async () => {
    if (!file) return;

    const uploaded = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });
    console.log(uploaded);
  };

  return (
    <div>
      <Input type="file" accept="image/*" onChange={handleFile} />
      <Button onClick={uploadImage}>upload</Button>
      <Input
        placeholder="search users"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {users.length > 0
        ? users.map((user) => {
            return (
              <div key={user._id}>
                {user.username}
                {user.email}
              </div>
            );
          })
        : "search user"}
    </div>
  );
};

export default Page;
