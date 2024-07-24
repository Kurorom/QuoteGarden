"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Profile from '@components/Profile';

const MyProfile = () => {
    const {data : session} = useSession();
    const router = useRouter();
    const [MyPosts, setMyPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setMyPosts(data);
        }
      
       if(session?.user.id) fetchPosts();
      }, []);
    
      useEffect(() => {
        const fetchLikedPosts = async () => {
          const res = await fetch(`/api/users/${session?.user.id}/liked-posts`);
          const likedPostsData = await res.json();
          setLikedPosts(likedPostsData);
        };
    
        if (session?.user.id) fetchLikedPosts();
      }, [session?.user.id]);

    const handleEdit = (post) => {
      router.push(`/update-quote?id=${post._id}`);
    }

    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this Quote ?");
      if(hasConfirmed){
        try {
          await fetch(`/api/quote/${post._id.toString()}`
          ,{
            method: 'DELETE' 
          });

          const filteredPosts = MyPosts.filter((p)=> p._id != post._id);
          setMyPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    }

  return (
    
    <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={MyPosts}
        posts={likedPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;