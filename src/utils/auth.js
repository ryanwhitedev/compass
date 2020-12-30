import appConfig from "./config";
import storage from "./storage";

const BASE_AUTH_URL = "https://www.reddit.com/api/v1/authorize";
const [CLIENT_ID, REDIRECT_URI] = appConfig();

const TYPE = "token";
const DURATION = "temporary";
const SCOPE = ["identity", "history", "save"];

const generateStateToken = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let token = "";
  while (token.length < 36) {
    let randomIndex = Math.floor(Math.random() * chars.length);
    token += chars[randomIndex];
  }
  return token;
};

export const authenticateUser = () => {
  const user = {
    isAuthenticated: false,
    state: generateStateToken(),
  };
  storage.saveUser(user);

  window.location = `${BASE_AUTH_URL}?client_id=${CLIENT_ID}&response_type=${TYPE}&state=${
    user.state
  }&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE.join(",")}`;
};
