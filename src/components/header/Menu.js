import React from "react";

const Menu = ({ loadPosts, logout }) => (
  <nav className="flex flex-col">
    <ul>
      <li>
        <button
          className="px-4 py-2 w-full hover:bg-gray-100"
          onClick={() => loadPosts("getNewPosts")}
        >
          Load New Posts
        </button>
      </li>
      <li>
        <button
          className="px-4 py-2 w-full hover:bg-gray-100"
          onClick={() => loadPosts("getAllPosts")}
        >
          Reload All Posts
        </button>
      </li>
      <li>
        <button className="px-4 py-2 w-full hover:bg-gray-100" onClick={logout}>
          Logout
        </button>
      </li>
    </ul>
  </nav>
);

export default Menu;
