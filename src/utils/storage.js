const LOCALSTORAGE_KEY = "ss4rUser";

const saveUser = (user) =>
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(user));

const loadUser = () => JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

const clearUser = () => localStorage.removeItem(LOCALSTORAGE_KEY);

const storage = { saveUser, loadUser, clearUser };
export default storage;
