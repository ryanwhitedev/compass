import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";

const Menu = () => {
  const user = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);

  const toggleVisibility = useCallback(() => setVisible(!visible), [visible]);

  const navRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (visible && navRef.current && !navRef.current.contains(event.target)) {
        toggleVisibility();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [visible, toggleVisibility]);

  return (
    <div className="flex items-center text-sm font-semibold">
      <div ref={navRef} className="relative mx-auto sm:ml-0">
        <button
          className="flex items-center py-1 px-4"
          onClick={toggleVisibility}
        >
          {`u/${user.username}`}
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path>
          </svg>
        </button>
        <nav
          className={`${
            visible
              ? "flex flex-col sm:absolute top-full bg-gray-100 w-full z-10"
              : "hidden"
          }`}
        >
          <ul>
            <li>
              <button
                className="px-4 py-2 w-full hover:bg-gray-300"
                onClick={toggleVisibility}
              >
                Load New Posts
              </button>
            </li>
            <li>
              <button
                className="px-4 py-2 w-full hover:bg-gray-300"
                onClick={toggleVisibility}
              >
                Reload All Posts
              </button>
            </li>
            <li>
              <button
                className="px-4 py-2 w-full hover:bg-gray-300"
                onClick={toggleVisibility}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
