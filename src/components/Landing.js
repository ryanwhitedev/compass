import React from "react";
import { authenticateUserWithAction } from "../services/auth";

const Landing = () => (
  <div className="fixed inset-0 flex items-center">
    <div className="md:container md:max-w-screen-xl md:mx-auto px-4 py-8 text-left">
      <div className="max-w-2xl mr-auto">
        <h1 className="text-6xl font-extrabold mb-4">Compass</h1>
        <h2 className="text-3xl font-extrabold mb-4">
          Saved Post Search for Reddit
        </h2>
        <p className="mb-4">
          Reddit doesn't currently have a way to search through your saved
          posts. Compass provides this missing search interface. All data
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
  </div>
);

export default Landing;
