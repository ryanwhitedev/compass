import React, { useState, useEffect } from "react";
import { authenticateUser } from "../services/auth";
import { getAllUserSavedPosts } from "../services/user";
import storage from "../utils/storage";
import Nav from "./Nav";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../utils/actionCreators";

const POST_INTERVAL = 10;

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const [displayedPosts, setDisplayedPosts] = useState(
    posts.slice(0, POST_INTERVAL)
  );
  const [loading, setLoading] = useState(false);

  const showMorePosts = () => {
    const numPosts = displayedPosts.length + POST_INTERVAL;
    const postsToDisplay = posts.slice(0, numPosts);
    setDisplayedPosts(postsToDisplay);
  };

  useEffect(() => {
    const getAndSetPosts = async () => {
      const posts = await getAllUserSavedPosts(user);
      console.log("main:", posts);

      dispatch(setPosts(posts));
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
  }, [user, posts, dispatch]);

  if (!user || !user.isAuthenticated) {
    return <button onClick={() => authenticateUser()}>auth</button>;
  }
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Nav />
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
                onClick={showMorePosts}
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
