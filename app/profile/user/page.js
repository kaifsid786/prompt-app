"use client";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
export default function UserPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${userId}/post`);
      const data = await res.json();
      setPosts(data);
      setUserName(data[0].creator.username);
    };
    fetchPosts();
  }, []);
  return (
    <Profile
      name={userName}
      des="Welcome to user's Personalised Profile"
      data={posts}
    />
  );
}
