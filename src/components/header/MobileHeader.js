import React, { useState } from "react";
import { Link } from "react-router-dom";
import CompassLogo from "./CompassLogo";
import Menu from "./Menu";
import SearchForm from "./SearchForm";

const MobileHeader = ({ searchPosts, loadPosts, logout }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleVisibility = () => setMenuVisible(!menuVisible);

  return (
    <header
      className={`header sticky top-0 shadow py-2 px-4 bg-white ${
        menuVisible ? "open" : ""
      }`}
    >
      <div
        className={`grid grid-cols-2 gap-2 xs:gap-6 justify-between items-center ${
          menuVisible ? null : "xs:grid-cols-auto-fr-auto xs:grid-flow-col"
        }`}
      >
        <div className="text-xl sm:text-2xl font-black">
          <Link to="/">
            <CompassLogo />
          </Link>
        </div>
        <button
          className="justify-self-end mobile-nav-toggle focus:outline-none"
          onClick={toggleVisibility}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </button>
        {menuVisible ? (
          <div className="col-span-2 xs:col-span-full">
            <Menu loadPosts={loadPosts(toggleVisibility)} logout={logout} />
          </div>
        ) : (
          <div className="col-span-2 xs:col-start-2 justify-self-center w-full">
            <SearchForm searchPosts={searchPosts} />
          </div>
        )}
      </div>
    </header>
  );
};

export default MobileHeader;
