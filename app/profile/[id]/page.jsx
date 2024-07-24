"use client";


import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');
  const [myPosts, setMyPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };

    if (params.id) fetchPosts();
  }, [params.id]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      const res = await fetch(`/api/users/${params.id}/liked-posts`);
      const likedPostsData = await res.json();
      setLikedPosts(likedPostsData);
    };

    if (params.id) fetchLikedPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page`}
      data={myPosts}
      posts={likedPosts}
    />
  );
};

export default UserProfile;
