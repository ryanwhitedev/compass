import React from "react";

const CompassLogo = () => (
  <div className="flex items-center">
    <svg
      className="compass-logo stroke-current text-black dark:text-white h-10 w-10"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="45" />
      <polyline
        className="fill-current stroke-current text-black dark:text-white"
        points="40 51 50 20 60 51"
      />
      <polyline
        className="stroke-current text-black dark:text-white"
        points="40 49 50 80 60 49"
      />
    </svg>
    <div className="text-xl sm:text-2xl font-bold ml-2">Compass</div>
  </div>
);

export default CompassLogo;
