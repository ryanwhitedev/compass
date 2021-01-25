import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchForm = ({ searchPosts }) => {
  const location = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (location.search) {
      const queryStr = decodeURIComponent(location.search.replace("?s=", ""));
      setQuery(queryStr);
      searchPosts(queryStr);
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchPosts(query);
  };

  return (
    <form
      className="justify-self-center flex items-center w-full max-w-500px"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="flex-grow py-1 px-1.5 mr-2 border border-gray-300 dark:border-gray-600 dark:bg-black rounded"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
      <button
        className="py-1 px-4 bg-orange border border-orange hover:bg-orange-light text-white font-bold rounded"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
