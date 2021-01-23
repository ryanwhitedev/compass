import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../utils/actionCreators";
import storage from "../../utils/storage";

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const userTheme = useSelector((state) => state.theme);

  const toggleTheme = (theme) => {
    const toggledTheme = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(toggledTheme));
    storage.saveTheme(toggledTheme);
  };

  return (
    <button
      className="focus:outline-none"
      onClick={() => toggleTheme(userTheme)}
    >
      {userTheme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 stroke-current text-black dark:text-white md:hover:fill-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-current text-black dark:text-white md:hover:fill-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggleButton;
