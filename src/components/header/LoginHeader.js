import React from "react";
import { Link } from "react-router-dom";
import CompassLogo from "./CompassLogo";
import ThemeToggleButton from "./ThemeToggleButton";

const LoginHeader = ({ login }) => (
  <header className="sticky top-0 py-2 w-full z-10">
    <div className="grid grid-cols-2 grid-gap-4 items-center md:container md:max-w-screen-xl md:mx-auto px-4">
      <Link to="/">
        <CompassLogo />
      </Link>
      <div className="flex justify-end items-center">
        <button
          className="mr-4 py-1 px-4 bg-orange border border-orange hover:bg-orange-light text-white font-bold rounded max-w-min"
          onClick={login}
        >
          Login
        </button>
        <ThemeToggleButton />
      </div>
    </div>
  </header>
);

export default LoginHeader;
