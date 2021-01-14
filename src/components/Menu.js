import React from "react";
import { useDispatch } from "react-redux";
import storage from "../utils/storage";
import { setAction, clearUser, clearPosts } from "../utils/actionCreators";

const Menu = ({ toggleVisibility }) => {
  const dispatch = useDispatch();

  const logout = () => {
    storage.clearUser();
    dispatch(clearUser());
    storage.clearPosts();
    dispatch(clearPosts());
  };

  const loadPosts = (postType) => {
    dispatch(setAction(postType));
    toggleVisibility();
  };

  return (
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
          <button
            className="px-4 py-2 w-full hover:bg-gray-100"
            onClick={logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
