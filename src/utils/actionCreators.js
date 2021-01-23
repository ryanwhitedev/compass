export const setUser = (user) => ({
  type: "SET_USER",
  data: { user },
});

export const clearUser = () => ({ type: "CLEAR_USER" });

export const setAction = (action) => ({
  type: "SET_ACTION",
  data: { action },
});

export const clearAction = () => ({ type: "CLEAR_ACTION" });

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

let timeoutId;
const NOTIFICATION_DURATION = 3000;
export const setNotification = (notification) => async (dispatch) => {
  // clear timeout to ensure notification is shown for full duration
  clearTimeout(timeoutId);
  timeoutId = setTimeout(
    () => dispatch(clearNotification()),
    NOTIFICATION_DURATION
  );

  dispatch({
    type: "SET_NOTIFICATION",
    data: { notification },
  });
};

export const clearNotification = (notification) => ({
  type: "CLEAR_NOTIFICATION",
});

const toggleTheme = (theme) =>
  document.body.classList.toggle("dark", theme === "dark");
export const setTheme = (theme) => {
  toggleTheme(theme);
  return {
    type: "SET_THEME",
    data: { theme },
  };
};
