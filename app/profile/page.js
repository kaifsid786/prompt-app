"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
export default function MyProfile() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/post`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);

  // handling functions
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    try {
      const res = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/");
      }

      return new Response("Id not Found", { status: 404 });
    } catch (e) {
      console.log(e);
      return new Response("Deletion failed", { status: 500 });
    }
  };

  return (
    <Profile
      name="My"
      des="Welcome to your Personalised Profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
