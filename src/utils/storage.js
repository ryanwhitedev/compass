const USER_KEY = "compassAppUser";
const POSTS_KEY = "compassAppPosts";
const THEME_KEY = "compassAppTheme";

const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

const loadUser = () => JSON.parse(localStorage.getItem(USER_KEY));

const clearUser = () => localStorage.removeItem(USER_KEY);

const savePosts = (posts) =>
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));

const loadPosts = () => JSON.parse(localStorage.getItem(POSTS_KEY)) || [];

const clearPosts = () => localStorage.removeItem(POSTS_KEY);

const saveTheme = (theme) => localStorage.setItem(THEME_KEY, theme);

const loadTheme = () => localStorage.getItem(THEME_KEY);

const storage = {
  saveUser,
  loadUser,
  clearUser,
  savePosts,
  loadPosts,
  clearPosts,
  saveTheme,
  loadTheme,
};
export default storage;
