import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../Menu";
import Search from "../Search";

const MobileHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleVisibility = () => setMenuVisible(!menuVisible);

  return (
    <header
      className={`header py-2 px-4 bg-gray-100 ${menuVisible ? "open" : null}`}
    >
      <div
        className={`grid grid-cols-2 gap-2 xs:gap-x-6 xs:grid-cols-mobileNav justify-between items-center ${
          menuVisible ? null : "xs:grid-flow-col"
        }`}
      >
        <div className="text-xl sm:text-2xl font-black">
          <Link to="/">SS4R</Link>
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
            <Menu toggleVisibility={toggleVisibility} />
          </div>
        ) : (
          <div className="col-span-2 xs:col-start-2 justify-self-center w-full">
            <Search />
          </div>
        )}
      </div>
    </header>
  );
};

export default MobileHeader;
