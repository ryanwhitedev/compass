import React from "react";
import { Link } from "react-router-dom";
import { authenticateUserWithAction } from "../../services/auth";

const LoginHeader = () => (
  <header className="py-2 bg-gray-100">
    <div className="grid grid-cols-2 grid-gap-4 items-center md:container md:max-w-screen-xl md:mx-auto px-4">
      <div className="text-xl sm:text-2xl font-black mr-3">
        <Link to="/">SS4R</Link>
      </div>
      <button
        className="justify-self-end py-1 px-4 bg-orange border border-orange hover:bg-orange-light text-white font-bold rounded max-w-min"
        onClick={() => authenticateUserWithAction("getAllPosts")}
      >
        Login
      </button>
    </div>
  </header>
);

export default LoginHeader;
