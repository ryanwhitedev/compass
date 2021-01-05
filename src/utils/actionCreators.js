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

export const setIndex = (index) => ({
  type: "SET_INDEX",
  data: { index },
});

export const clearIndex = () => ({ type: "CLEAR_INDEX" });

export const setSearch = (search) => ({
  type: "SEARCH",
  data: { search },
});

export const clearSearch = () => ({ type: "CLEAR_SEARCH" });
