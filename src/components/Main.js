import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getNewPosts } from "../services/user";
import storage from "../utils/storage";
import {
  setAction,
  clearAction,
  setPosts,
  setNotification,
} from "../utils/actionCreators";
import Loading from "./Loading";
import PostContainer from "./PostContainer";

const ADD_NUM_POSTS = 10;

const Main = ({ user }) => {
  const action = useSelector((state) => state.action);
  const posts = useSelector((state) =>
    state.search ? state.search.results : state.posts
  );
  const [displayedPosts, setDisplayedPosts] = useState(
    posts.slice(0, ADD_NUM_POSTS)
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const getAndSetPosts = async (fetchPosts) => {
      let notification;
      try {
        const posts = await fetchPosts(user);
        dispatch(setPosts(posts));
        storage.savePosts(posts);

        notification = {
          type: "success",
          message: "Posts loaded successfully.",
        };
      } catch (err) {
        console.error(err);

        notification = {
          type: "error",
          message: "Failed to load posts.",
        };
      }

      dispatch(setNotification(notification));
      dispatch(clearAction()); // clear loading action
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
    setDisplayedPosts(posts.slice(0, ADD_NUM_POSTS));
  }, [posts]);

  const loadMorePosts = () => {
    const numPosts = displayedPosts.length + ADD_NUM_POSTS;
    const postsToDisplay = posts.slice(0, numPosts);
    setDisplayedPosts(postsToDisplay);
  };

  if (action === "loading") {
    return <Loading message="Loading Posts. This may take a few seconds..." />;
  }

  return (
    <div className="md:container md:max-w-screen-xl md:mx-auto p-4">
      <div className="xs:flex justify-between items-center">
        <h1 className="text-4xl font-extrabold flex-grow">Saved Posts</h1>
        <span>{`Found ${posts.length} ${
          posts.length === 1 ? "post" : "posts"
        }`}</span>
      </div>
      <PostContainer
        posts={displayedPosts}
        morePosts={displayedPosts.length < posts.length}
        loadMorePosts={loadMorePosts}
      />
    </div>
  );
};

export default Main;
