import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import lunr from "lunr";
import { setIndex } from "../utils/actionCreators";

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

const search = (searchStr, index, posts) => {
  if (!searchStr || !index) return [];

  const query = buildQueryString(searchStr);
  const results = index.search(query);
  return results.map((result) => formatPosts(posts)[result.ref]);
};

const useSearch = () => {
  const dispatch = useDispatch();
  const index = useSelector((state) => state.index);
  const posts = useSelector((state) => state.posts);

  // Initialize index the first time useSearch is called
  if (!index) {
    dispatch(setIndex(buildIndex(posts)));
  }

  useEffect(() => {
    dispatch(setIndex(buildIndex(posts)));
  }, [posts, dispatch]);

  return (searchStr) => search(searchStr, index, posts);
};

export default useSearch;
