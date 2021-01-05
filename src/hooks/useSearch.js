import lunr from "lunr";
import { useEffect, useState } from "react";

const SEARCH_FIELDS = ["title", "body", "subreddit"];

const buildIndex = (postObj) => {
  const posts = Object.values(postObj);
  if (!posts.length) return null;

  const index = new lunr.Builder();
  index.ref("id");
  SEARCH_FIELDS.forEach((field) => index.field(field));

  posts.forEach((post) => index.add(post));
  return index.build();
};

const buildQueryString = (text) =>
  text
    .split(" ")
    .map((str) => `+${str}`)
    .join(" ")
    .concat("*");

const formatPosts = (posts) => {
  if (!Array.isArray(posts)) return {};

  return posts.reduce((obj, post) => {
    obj[post.id] = post;
    return obj;
  }, {});
};

const useSearch = (initialPosts = []) => {
  const [posts, setPosts] = useState(formatPosts(initialPosts));
  const [index, setIndex] = useState(buildIndex(posts));

  useEffect(() => {
    setIndex(buildIndex(posts));
  }, [posts]);

  const search = (searchStr) => {
    if (!searchStr || !index) return [];

    const query = buildQueryString(searchStr);
    const results = index.search(query);
    return results.map((result) => posts[result.ref]);
  };

  // should be called inside `useEffect`
  const updateIndex = (posts) => {
    if (!Array.isArray(posts)) return null; // should throw error
    setPosts(formatPosts(posts));
  };

  return [search, updateIndex];
};

export default useSearch;
