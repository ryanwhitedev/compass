import React, { useState } from "react";
import { useSelector } from "react-redux";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(query);
  };

  return (
    <div className="py-2 bg-gray-100">
      <div className="grid sm:grid-cols-2 grid-gap-4 justify-center sm:justify-start md:container md:max-w-screen-xl md:mx-auto px-4">
        <div className="flex items-center text-sm font-semibold">{`u/${user.username}`}</div>
        <form
          className="sm:justify-self-end pt-2 sm:pt-0"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="py-1 px-1.5 mr-2 border border-gray-300 rounded"
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
      </div>
    </div>
  );
};

export default Nav;
