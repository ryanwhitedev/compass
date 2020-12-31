import React, { useEffect } from "react";
import { authenticateUser } from "../services/auth";
import { getAllUserSavedPosts } from "../services/user";
import storage from "../utils/storage";

const Main = ({ user, posts, setPosts }) => {
  useEffect(() => {
    const getAndSetPosts = async () => {
      const posts = await getAllUserSavedPosts(user);
      console.log("main:", posts);

      setPosts(posts);
      storage.savePosts(posts);
    };
    if (user && !posts.length) {
      getAndSetPosts();
    }
  }, [user, posts, setPosts]);

  if (!user || !user.isAuthenticated) {
    return <button onClick={() => authenticateUser()}>auth</button>;
  }

  return posts.length ? (
    posts.map((post) => (
      <div dangerouslySetInnerHTML={{ __html: post.title }}></div>
    ))
  ) : (
    <p>No saved posts!</p>
  );
};

export default Main;
