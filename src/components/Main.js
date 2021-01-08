import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getNewPosts } from "../services/user";
import storage from "../utils/storage";
import GetStarted from "./GetStarted";
import Loading from "./Loading";
import Card from "./Card";
import { setAction, clearAction, setPosts } from "../utils/actionCreators";

const POST_INTERVAL = 10;

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const action = useSelector((state) => state.action);
  const posts = useSelector((state) => {
    if (state.search) {
      return state.search.results;
    }
    return state.posts;
  });
  const [displayedPosts, setDisplayedPosts] = useState(
    posts.slice(0, POST_INTERVAL)
  );

  console.log("main:", posts);

  const showMorePosts = () => {
    const numPosts = displayedPosts.length + POST_INTERVAL;
    const postsToDisplay = posts.slice(0, numPosts);
    setDisplayedPosts(postsToDisplay);
  };

  useEffect(() => {
    const getAndSetPosts = async (fetchPosts) => {
      const posts = await fetchPosts(user);
      dispatch(clearAction());
      dispatch(setPosts(posts));
      storage.savePosts(posts);
    };

    if (user && action === "getAllPosts") {
      dispatch(setAction("loading"));
      getAndSetPosts(getAllPosts);
    } else if (user && action === "getNewPosts") {
      dispatch(setAction("loading"));
      getAndSetPosts(getNewPosts);
    } else if (user && posts.length) {
      setDisplayedPosts(posts.slice(0, POST_INTERVAL));
    }
  }, [user, action, posts, dispatch]);

  useEffect(() => {
    setDisplayedPosts(posts.slice(0, POST_INTERVAL));
  }, [posts]);

  if (!user || !user.isAuthenticated) {
    return <GetStarted />;
  }

  if (action === "loading") {
    return <Loading message="Loading Posts. This may take a few seconds..." />;
  }

  return (
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
  );
};

export default Main;
