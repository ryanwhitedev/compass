import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import storage from "../utils/storage";
import { setAction, clearUser, clearPosts } from "../utils/actionCreators";
import { authenticateUserWithAction } from "../services/auth";

const Menu = ({ toggleVisibility }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logout = () => {
    storage.clearUser();
    dispatch(clearUser());
    storage.clearPosts();
    dispatch(clearPosts());
  };

  const reloadAllPosts = async () => {
    if (user && user.tokenExpiry > Date.now()) {
      dispatch(setAction("getAllPosts"));
    } else {
      storage.clearPosts();
      storage.clearUser();
      authenticateUserWithAction("getAllPosts");
    }

    toggleVisibility();
  };

  const getNewPosts = async () => {
    if (user && user.tokenExpiry > Date.now()) {
      dispatch(setAction("getNewPosts"));
    } else {
      storage.clearUser();
      authenticateUserWithAction("getNewPosts");
    }
  };

  return (
    <nav className="flex flex-col">
      <ul>
        <li>
          <button
            className="px-4 py-2 w-full hover:bg-gray-300"
            onClick={getNewPosts}
          >
            Load New Posts
          </button>
        </li>
        <li>
          <button
            className="px-4 py-2 w-full hover:bg-gray-300"
            onClick={reloadAllPosts}
          >
            Reload All Posts
          </button>
        </li>
        <li>
          <button
            className="px-4 py-2 w-full hover:bg-gray-300"
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
