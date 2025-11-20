"use client";

import { User, useUser } from "@/providers/AuthContext";
import { useEffect, useState } from "react";

const Page = () => {
  const { user, token } = useUser();
  const userId = user?._id;
  const [userInfo, setUserInfo] = useState<User | null>();

  const fetchUserData = async () => {
    const response = await fetch(`http://localhost:5555/user-info/${userId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const user = await response.json();
    setUserInfo(user);
  };

  useEffect(() => {
    if (token) fetchUserData();
  }, [token]);

  return (
    <div>
      <div>{userInfo?.email}</div>
      <div>{userInfo?.username}</div>
    </div>
  );
};

export default Page;
