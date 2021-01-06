import React, { useState, useEffect } from "react";
import { authenticateUser } from "../services/auth";
import { getAllUserSavedPosts } from "../services/user";
import storage from "../utils/storage";
import NavBar from "./NavBar";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../utils/actionCreators";

const POST_INTERVAL = 10;

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => {
    if (state.search) {
      return state.search.results;
    }
    return state.posts;
  });
  const [displayedPosts, setDisplayedPosts] = useState(
    posts.slice(0, POST_INTERVAL)
  );
  const [loading, setLoading] = useState(false);

  const showMorePosts = () => {
    const numPosts = displayedPosts.length + POST_INTERVAL;
    const postsToDisplay = posts.slice(0, numPosts);
    setDisplayedPosts(postsToDisplay);
  };

  console.log("main:", posts);

  useEffect(() => {
    const getAndSetPosts = async () => {
      const userPosts = await getAllUserSavedPosts(user);
      console.log("main (inside useEffect):", userPosts);

      dispatch(setPosts(userPosts));
      storage.savePosts(userPosts);

      setLoading(false);
      setDisplayedPosts(userPosts.slice(0, POST_INTERVAL));
    };

    if (user && !posts.length) {
      getAndSetPosts();
      setLoading(true);
    } else if (posts.length) {
      setDisplayedPosts(posts.slice(0, POST_INTERVAL));
    }
  }, [user, dispatch]);

  useEffect(() => {
    setDisplayedPosts(posts.slice(0, POST_INTERVAL));
  }, [posts]);

  if (!user || !user.isAuthenticated) {
    return <button onClick={() => authenticateUser()}>auth</button>;
  }
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <NavBar />
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
