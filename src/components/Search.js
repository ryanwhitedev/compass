import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import useSearch from "../hooks/useSearch";
import { setSearch, clearSearch } from "../utils/actionCreators";

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const search = useSearch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (location.search) {
      const queryStr = decodeURIComponent(location.search.replace("?s=", ""));
      setQuery(queryStr);
      const results = search(queryStr);
      dispatch(setSearch({ query: queryStr, results }));
    } else {
      setQuery("");
      dispatch(clearSearch());
    }
  }, [location, dispatch, search]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const results = search(query);
    if (!query) {
      dispatch(clearSearch());
      history.push("/");
    } else {
      dispatch(setSearch({ query, results }));
      history.push(`?s=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      className="justify-self-center flex items-center w-full max-w-500px"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="flex-grow py-1 px-1.5 mr-2 border border-gray-300 rounded"
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

export default Search;
