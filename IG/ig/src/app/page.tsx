"use client";

import { User, useUser } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { toast } from "sonner";
import { Heart, HeartCrack, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditPostDialog } from "./_components/EditPostDialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type PostType = {
  _id: string;
  caption: string;
  likes: string[];
  images: string[];
  user: User;
};

export default function Home() {
  const { token, user } = useUser();
  const { push } = useRouter();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const myId = user?._id;

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.BACKEND_URL}/post/all-posts`, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch posts");

      const posts = await res.json();
      setPosts(posts);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const postLike = async (postId: string) => {
    try {
      const res = await fetch(
        `http://localhost:5555/post/toggle-like/${postId}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to toggle like");

      toast.success("Updated like");
      await fetchPosts();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const followUser = async (followedUserId: string) => {
    const res = await fetch(
      `http://localhost:5555/follow-toggle/${followedUserId}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );

    if (res.ok) {
      toast.success("wow");
    } else {
      toast.error("bye");
    }
  };

  useEffect(() => {
    if (!token) {
      push("/login");
      return;
    }
    fetchPosts();
  }, [token]);

  const redirectUserProfile = (userId: string) => {
    push(`/user-profile/${userId}`);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelecetedPost] = useState<PostType | null>(null);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3 text-gray-600">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p>Loading posts...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-2xl w-full mx-auto p-4 space-y-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome, {user?.username} 👋
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No posts yet 😅</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition"
            >
              {/* Post header */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  <AvatarImage src={post.user.profilePicture ?? ""} />
                  <AvatarFallback>
                    {post.user.username.charAt(0).toUpperCase()}
                    {post.user.username.charAt(1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div
                    className="flex gap-2 items-center"
                    onClick={() => redirectUserProfile(post.user._id)}
                  >
                    <p className="font-semibold text-gray-800">
                      {post.user.username}
                    </p>
                    <p className="text-sm text-gray-500">{post.user.email}</p>
                  </div>
                  {post.user.followers.includes(myId!) ? (
                    <Button
                      variant="secondary"
                      onClick={() => followUser(post.user._id)}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => followUser(post.user._id)}
                    >
                      Follow
                    </Button>
                  )}
                </div>
                <div
                  onClick={() => {
                    setIsOpen(true);
                    setSelecetedPost(post);
                  }}
                >
                  open
                </div>
              </div>

              {/* Post image */}

              {post.images?.length > 0 && (
                // <img
                //   src={post.images[0]}
                //   alt="post"
                //   className="w-full rounded-xl mb-3 object-cover max-h-96"
                // />

                <Carousel className="w-full max-w-xs">
                  <CarouselContent>
                    {post.images.map((postImage, index) => (
                      <CarouselItem key={index}>
                        <img src={postImage} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious hidden={true} />
                  <CarouselNext hidden={true} />
                </Carousel>
              )}

              {/* Post caption */}
              <p className="text-gray-800 mb-4">{post.caption}</p>

              {/* Like section */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => postLike(post._id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition"
                >
                  {post.likes.includes(myId!) ? (
                    <Heart color="red" fill="red" />
                  ) : (
                    <HeartCrack />
                  )}
                  <span className="text-sm">{post.likes.length}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </main>
      {selectedPost && (
        <EditPostDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedPost={selectedPost!}
        />
      )}
      <Footer />
    </div>
  );
}
