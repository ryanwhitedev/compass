import React from "react";
import Menu from "./Menu";
import Search from "./Search";

const NavBar = () => (
  <div className="py-2 bg-gray-100">
    <div className="grid sm:grid-cols-2 grid-gap-4 justify-center sm:justify-start md:container md:max-w-screen-xl md:mx-auto px-4">
      <Menu />
      <Search />
    </div>
  </div>
);

export default NavBar;
