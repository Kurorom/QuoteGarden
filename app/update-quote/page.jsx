'use client';

import {useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import Form from '@components/Form';


const UpdateQuote = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const quoteId = searchParams.get('id');
    const [ submitting, setSubmitting] = useState(false);
    const [post,setPost] = useState({
      quote:'',
      tag:'',
      author:'',
      quote:'',
    });

    useEffect(()=>{
        const getQuoteDetails = async () => {
        const response = await fetch(`/api/quote/${quoteId}`);
        const data = await response.json();

        setPost({
            quote: data.quote,
            tag:data.tag,
            author: data.author,
            source:data.source || '',
        })
    }
    if(quoteId) getQuoteDetails()
    },[quoteId])
  
    const UpdateQuote = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!quoteId) return alert('No Quote ID found');


        try {
        const response = await fetch(`/api/quote/${quoteId}`,{
            method: 'PATCH',
            body: JSON.stringify({
            quote: post.quote,
            author: post.author,
            source: post.source||'',
            tag: post.tag,
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
    }
    
    return (
        <Form
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={UpdateQuote}
        /> 
    )
}

export default UpdateQuote