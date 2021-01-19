import React from "react";
import Post from "./Post";

const PostContainer = ({ posts, morePosts, loadMorePosts }) =>
  posts.length ? (
    <>
      <div className="postContainer">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      {morePosts ? (
        <button
          className="block py-2 px-4 bg-orange hover:bg-orange-light text-white font-bold rounded mx-auto"
          onClick={loadMorePosts}
        >
          Load More
        </button>
      ) : null}
    </>
  ) : (
    <p>No posts found.</p>
  );

export default PostContainer;
