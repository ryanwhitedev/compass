export const setUser = (user) => ({
  type: "SET_USER",
  data: { user },
});

export const clearUser = () => ({ type: "CLEAR_USER" });

export const setPosts = (posts) => ({
  type: "SET_POSTS",
  data: { posts },
});

export const clearPosts = () => ({ type: "CLEAR_POSTS" });
