"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const { id } = params;

  const fetchPosts = async () => {
    const res = await fetch(`/api/users/${id}/posts`);
    const data = await res.json();
    setPosts(data);
  };

  const getUser = async () => {
    const res = await fetch(`/api/users/${id}/user`);
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    if (id) {
      fetchPosts();
      getUser();
    }
  }, []);

  return (
    <Profile
      name={user?.username}
      desc="Welcome to my profile"
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};

export default MyProfile;
