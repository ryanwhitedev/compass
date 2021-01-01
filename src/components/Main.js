import React, { useEffect } from "react";
import { authenticateUser } from "../services/auth";
import { getAllUserSavedPosts } from "../services/user";
import storage from "../utils/storage";
import Card from "./Card";

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
    <div className="md:container md:max-w-screen-xl md:mx-auto p-4">
      <h1 className="text-4xl font-extrabold">Saved Posts</h1>
      {posts.map((post) => (
        <Card post={post} />
      ))}
    </div>
  ) : (
    <p>No saved posts!</p>
  );
};

export default Main;
