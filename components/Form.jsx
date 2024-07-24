import React from 'react'
import Link from 'next/link'
const Form = ({type,post,setPost,submitting,handleSubmit,}) => {

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className='green_gradient'>{type} Post</span>
        </h1>
        <p className='desc text-left max-w-md'>
        {type} and share your favorite quotes with the world! Whether it's a timeless saying, 
        a line from your favorite book, or words of wisdom from a loved one,
         we want to hear it. Inspire others with the quotes that have inspired you. 
         </p>

      <form 
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-lg max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Quote
          </span>
          <textarea value={post.quote}
          onChange={(e)=> setPost({ ...post, quote:
            e.target.value })}
            placeholder="Write your Quote here.."
            required
            className="form_textarea"
            />

         
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags
            <span>(inspirational, business, sport)</span>
          </span>
          <input value={post.tag}
          onChange={(e)=> setPost({ ...post, tag:
            e.target.value })}
            placeholder="tags"
            required
            className="form_input"
            />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            author
          </span>
          <input value={post.author}
          onChange={(e)=> setPost({ ...post, author:
            e.target.value })}
            placeholder="author of the quote"
            required
            className="form_input"
            />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            source (optional)
          </span>
          <input value={post.source}
          onChange={(e)=> setPost({ ...post, source:
            e.target.value })}
            placeholder="book,speech,podcast..."
            
            className="form_input"
            />
        </label>
        
        <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className='text-gray-500 text-sm'>
              Cancel
            </Link>

            <button
              type='submit'
              disabled={submitting}
              className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
            >
              {submitting ? `${type}...` : type}
            </button>
        </div>

      </form>
    </section>
  )
}

export default Form