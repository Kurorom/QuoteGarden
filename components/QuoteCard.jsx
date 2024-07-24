"use client"

import { useState, useEffect } from "react";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';

const QuoteCard = ({ post, handleTagClick, handleEdit, handleDelete}) => {
  
  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(post.likeCount || 0); 
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState("");
  
  useEffect(() => {
    // Initial check if the user has liked the post
    if(post?.likedBy && session?.user.id){
    setHasLiked(post.likedBy.includes(session?.user.id));
    };
  }, [session?.user.id, post.likedBy]);

   
  const handleProfilClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`); 
  }

  const handleLike = async () => {
    
      await fetch(`/api/quote/${post._id.toString()}?userId=${session?.user.id}`
      ,{
        method: 'PUT' ,
      });

      
      
        setHasLiked(!hasLiked);
        if(hasLiked){
          setLikeCount(likeCount -1);
          
        }else{
          setLikeCount(likeCount +1);
        }
       
      
 
}

  const handleCopy =  () => {
    setCopied(post.quote);
    navigator.clipboard.writeText(post.quote);
    setTimeout(() => setCopied(""),3000);
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' 
             onClick={handleProfilClick}>
            <Image
             
              src={post.creator?.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object contain"
            />
            <div className="flex flex-col">
              <h3 className="ml-2 font-satoshi text-base font-semibold text-gray-900">{post.creator.username}</h3>
              {/* <p className="font-inter text-sm text-gray-500">{post.creator.email}</p> */}
            </div>
          </div>
          <div className="copy-btn hover:cursor-pointer" onClick={handleCopy}>
            <Image 
              src={copied === post.quote
                  ? '/assets/icons/tick.svg'
                  : '/assets/icons/copy.svg'
                }
                alt={copied === post.quote ? "tick_icon" : "copy_icon"}
                width={15}
                height={15}
              />
        </div>
      </div>      
      <p className="my-3 font-satoshi text-sm text-gray-700">"{post.quote}"-
        <span className="font-satoshi font-style: italic font-semibold text-gray-700">{post.author}</span></p>
      <p className="mb-3 font-satoshi font-style: italic text-gray-700">{post.source}</p>

      <div>
        {post.tag.map((tag, index) => (
          <span key={index} className="text-sm font-inter text-sm blue_gradient cursor-pointer"
          onClick={()=> handleTagClick && handleTagClick(tag)}> #{tag}</span>
        ))}
      </div>
   
     
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
     
     <div className="absolute bottom-0 right-0 h-10 w-16">
                <Button onClick={handleLike} startIcon={hasLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}>
                    <span>{likeCount}</span>
                </Button>
            </div>
    </div>
        
  )
}

export default QuoteCard