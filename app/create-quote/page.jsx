'use client';

import {useState} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Form from '@components/Form';


const CreateQuote = () => {

    const router = useRouter();
    const { data: session } = useSession();
    const [ submitting, setSubmitting] = useState(false);
    const [post,setPost] = useState({
      quote:'',
      tag:'',
      author:'',
      quote:'',
      source:'',
      likecount:0,
      likedBy: []
    })
  
  const createQuote = async (e) => {
    if(session?.user.id){
    e.preventDefault();
    setSubmitting(true);
    
      try {
        const response = await fetch('/api/quote/new',{
          method: 'POST',
          body: JSON.stringify({
            quote: post.quote,
            author: post.author,
            source: post.source || '',
            userId: session?.user.id,
            tag: post.tag,
            likecount: 0,
            likedBy: []
            
            
          })
        })
  
        if(response.ok){
          
          router.push('/');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }else{
      alert("you must logging before creating a post")
    }
    
  }
 
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createQuote}
    /> 
  )
}

export default CreateQuote