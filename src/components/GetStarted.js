import React from "react";
import { authenticateUserWithAction } from "../services/auth";

const GetStarted = () => (
  <div className="md:container md:max-w-screen-xl md:mx-auto px-4 py-8 text-center">
    <div className="max-w-2xl m-auto">
      <h1 className="text-4xl font-extrabold mb-4 ">Saved Search for Reddit</h1>
      <p className="mb-4">
        Reddit doesn't currently have a way to search through your saved posts.
        Saved Search for Reddit provides this missing search interface. All data
        obtained from Reddit is stored in your browser, so that you are in
        control of your own data. Sign in with Reddit to get started!
      </p>
      <button
        className="py-1.5 px-6 bg-orange border border-orange hover:bg-orange-light text-white text-lg font-bold rounded"
        onClick={() => authenticateUserWithAction("getAllPosts")}
      >
        Get Started
      </button>
    </div>
  </div>
);

export default GetStarted;
