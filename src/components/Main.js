import React, { useState, useEffect } from "react";
import { authenticateUser } from "../services/auth";
import { getAllUserSavedPosts } from "../services/user";
import storage from "../utils/storage";
import Nav from "./Nav";
import Card from "./Card";

const POST_INTERVAL = 10;

const Main = ({ user, posts, setPosts }) => {
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMorePosts = () => {
    const numPosts = displayedPosts.length + POST_INTERVAL;
    const postsToDisplay = posts.slice(0, numPosts);
    setDisplayedPosts(postsToDisplay);
  };

  useEffect(() => {
    const getAndSetPosts = async () => {
      const posts = await getAllUserSavedPosts(user);
      console.log("main:", posts);

      setPosts(posts);
      storage.savePosts(posts);

      setLoading(false);
      setDisplayedPosts(posts.slice(0, POST_INTERVAL));
    };
    if (user && !posts.length) {
      getAndSetPosts();
      setLoading(true);
    } else if (posts.length) {
      setDisplayedPosts(posts.slice(0, POST_INTERVAL));
    }
  }, [user, posts, setPosts]);

  if (!user || !user.isAuthenticated) {
    return <button onClick={() => authenticateUser()}>auth</button>;
  }
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Nav user={user} />
      <div className="md:container md:max-w-screen-xl md:mx-auto p-4">
        {displayedPosts.length ? (
          <>
            <h1 className="text-4xl font-extrabold">Saved Posts</h1>
            {displayedPosts.map((post) => (
              <Card key={post.id} post={post} />
            ))}
            {displayedPosts.length < posts.length ? (
              <button
                className="block py-2 px-4 bg-orange hover:bg-orange-light text-white font-bold rounded mx-auto"
                onClick={loadMorePosts}
              >
                Load More
              </button>
            ) : null}
          </>
        ) : (
          <p>No saved posts!</p>
        )}
      </div>
    </>
  );
};

export default Main;
