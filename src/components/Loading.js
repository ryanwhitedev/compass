import React from "react";

const Loading = ({ message }) => (
  <div className="flex flex-col justify-center items-center mx-auto my-8">
    {message ? <p className="mb-4">{message}</p> : null}
    <div>
      <svg
        className="animate-spin-slow h-12 w-12"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="animate-circle-loading circle-loading"
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </div>
  </div>
);

export default Loading;
