import React, { useEffect } from "react";
import { authenticateUser } from "../services/auth";
import { getAllUserSavedPosts } from "../services/user";

const Main = ({ user }) => {
  console.log(user);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getAllUserSavedPosts(user);
      console.log("main:", posts);
    };
    if (user) {
      getPosts();
    }
  }, [user]);

  return <button onClick={() => authenticateUser()}>auth</button>;
};

export default Main;
