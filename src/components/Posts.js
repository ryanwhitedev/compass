import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getNewPosts } from "../services/user";
import storage from "../utils/storage";
import Loading from "./Loading";
import Card from "./Card";
import { setAction, clearAction, setPosts } from "../utils/actionCreators";

const POST_INTERVAL = 10;

const Posts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const action = useSelector((state) => state.action);
  const posts = useSelector((state) =>
    state.search ? state.search.results : state.posts
  );
  const [displayedPosts, setDisplayedPosts] = useState(
    posts.slice(0, POST_INTERVAL)
  );

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

    if (action === "getAllPosts") {
      dispatch(setAction("loading"));
      getAndSetPosts(getAllPosts);
    } else if (action === "getNewPosts") {
      dispatch(setAction("loading"));
      getAndSetPosts(getNewPosts);
    }
  }, [user, action, posts, dispatch]);

  // Updates displayed posts (ie in response to a search)
  useEffect(() => {
    setDisplayedPosts(posts.slice(0, POST_INTERVAL));
  }, [posts]);

  if (action === "loading") {
    return <Loading message="Loading Posts. This may take a few seconds..." />;
  }

  return (
    <div className="md:container md:max-w-screen-xl md:mx-auto p-4">
      {displayedPosts.length ? (
        <>
          <div className="xs:flex justify-between items-center">
            <h1 className="text-4xl font-extrabold flex-grow">Saved Posts</h1>
            <span>{`Found ${posts.length} ${
              posts.length === 1 ? "post" : "posts"
            }`}</span>
          </div>
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

export default Posts;
