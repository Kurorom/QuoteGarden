"use client";

import { useState, useEffect } from "react";
import QuoteCard from "@components/QuoteCard";

const QuoteCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <QuoteCard 
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResult, setSearchedResult] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/quote');
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const filterQuotes = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.quote) ||
        regex.test(item.tag)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterQuotes(e.target.value);
        setSearchedResult(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterQuotes(tagName);
    setSearchedResult(searchResult);
  };

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
        <QuoteCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
