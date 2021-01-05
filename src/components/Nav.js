import React from "react";
import { useSelector } from "react-redux";
import Search from "./Search";

const Nav = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="py-2 bg-gray-100">
      <div className="grid sm:grid-cols-2 grid-gap-4 justify-center sm:justify-start md:container md:max-w-screen-xl md:mx-auto px-4">
        <div className="flex items-center text-sm font-semibold">{`u/${user.username}`}</div>
        <Search />
      </div>
    </div>
  );
};

export default Nav;
