"use client";

import { PostType } from "@/app/page";
import { User, useUser } from "@/providers/AuthContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { token } = useUser();
  const params = useParams();

  const [userInfo, setUserInfo] = useState<User | null>();
  const [posts, setPosts] = useState<PostType[] | []>([]);

  const fetchUserData = async () => {
    const response = await fetch(
      `http://localhost:5555/user-info/${params.userId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const user = await response.json();
    setUserInfo(user);
  };

  const fetchUserPosts = async () => {
    const response = await fetch(
      `http://localhost:5555/post/user-posts/${params.userId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const posts = await response.json();
    setPosts(posts);
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
      fetchUserPosts();
    }
  }, [token]);

  return (
    <div>
      <div>{userInfo?.email}</div>
      <div>{userInfo?.username}</div>
      {posts.map((post) => {
        return <div key={post._id}>{post.caption}</div>;
      })}
    </div>
  );
};

export default Page;
