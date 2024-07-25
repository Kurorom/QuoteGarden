"use client";

import { useState, useEffect } from "react";
import QuoteCard from "./QuoteCard";

const QuoteCardList = ({data,handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) =>(
        <QuoteCard 
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const feed = () => {

  const  [allposts, setallposts] = useState([])

  const [searchText, setsearchText] = useState('')
  const [searchTimeOut, setsearchTimeOut] = useState(null)
  const [searchedResult, setsearchedResult] = useState([])


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/quote');
      const data = await response.json();

      setallposts(data);
    }
  
   fetchPosts();
  }, [])
  
  const filterQuotes = (searchText) => {
      const regex = RegExp(searchText,"i");
      return allposts.filter(
        (item)=>
        regex.test(item.creator?.username) ||
        regex.test(item.quote) ||
        regex.test(item.tag) 
        
      );
  };

  const handleSearchChange = (e) =>{
    clearTimeout(searchTimeOut);
    setsearchText(e.target.value);

    setsearchTimeOut(
      setTimeout(() => {
        const searchResult = filterQuotes(e.target.value);
        setsearchedResult(searchResult);
      }, 500)
    )
  }

  const handleTagClick = (tagName)=> {
      setsearchText(tagName);
      const searchResult = filterQuotes(tagName);
      setsearchedResult(searchResult);
  }
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
    
      {searchText ? (
        <QuoteCardList
          data={searchedResult}
          handleTagClick={handleTagClick}
        />
      ) : (
        <QuoteCardList data={allposts} handleTagClick={handleTagClick} />
      )}
    </section>

  );
};

export default feed
