"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handletagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((elm) => {
        return (
          <PromptCard
            key={elm._id}
            post={elm}
            handletagClick={handletagClick}
          />
        );
      })}
    </div>
  );
};

export default function Feed() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchPosts, setSearchPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const handleSearchChange = async (e) => {
    const text = e.target.value;
    if (text != "") {
      setIsSearching(true);
      const res = await fetch(`/api/search/${text}`);
      const data = await res.json();
      setSearchPosts(data);
    } else setIsSearching(false);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for a tag or a username"
          // value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={isSearching ? searchPosts : posts} />
    </section>
  );
}
