import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import CompassLogo from "./CompassLogo";
import Menu from "./Menu";
import SearchForm from "./SearchForm";

const DesktopHeader = ({ username, searchPosts, loadPosts, logout }) => {
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
    <header className="sticky top-0 shadow py-2 bg-white">
      <div className="grid grid-cols-auto-fr-auto gap-6 justify-center sm:justify-start md:container md:max-w-screen-xl md:mx-auto px-4">
        <div className="text-xl sm:text-2xl font-black">
          <Link to="/">
            <CompassLogo />
          </Link>
        </div>
        <SearchForm searchPosts={searchPosts} />
        <div ref={navRef} className="flex items-center relative ml-auto">
          <button
            className="flex justify-center items-center py-1 px-4 border border-gray-100 rounded hover:border-gray-300 focus:outline-none min-w-menu"
            onClick={toggleVisibility}
          >
            {`u/${username}`}
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path>
            </svg>
          </button>
          <div
            className={`${
              visible
                ? "sm:absolute top-full bg-white shadow-lg w-full z-10"
                : "hidden"
            }`}
          >
            <Menu loadPosts={loadPosts(toggleVisibility)} logout={logout} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
