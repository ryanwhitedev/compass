const isDev =
  window.location.href.includes("localhost") ||
  window.location.href.includes("127.0.0.1");

const DEV_CLIENT_ID = "5cdwTjQLHGSubA";
const DEV_REDIRECT_URI = "http://localhost:3000/signin";

const PROD_CLIENT_ID = "FZTcrrxOiok8uA";
const PROD_REDIRECT_URI = "https://compass.ryanwhite.dev/signin";

const BASE_AUTH_URL = "https://www.reddit.com/api/v1/authorize";
const AUTH_TYPE = "token";
const AUTH_DURATION = "temporary";
const AUTH_SCOPE = ["identity", "history", "save"];

export const authConfig = {
  baseUrl: BASE_AUTH_URL,
  clientId: isDev ? DEV_CLIENT_ID : PROD_CLIENT_ID,
  redirectUri: isDev ? DEV_REDIRECT_URI : PROD_REDIRECT_URI,
  type: AUTH_TYPE,
  duration: AUTH_DURATION,
  scope: AUTH_SCOPE.join(","),
};
