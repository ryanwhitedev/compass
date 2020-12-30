const DEV_CLIENT_ID = "5cdwTjQLHGSubA";
const DEV_REDIRECT_URI = "http://localhost:3000/signin";

const BASE_AUTH_URL = "https://www.reddit.com/api/v1/authorize";
const AUTH_TYPE = "token";
const AUTH_DURATION = "temporary";
const AUTH_SCOPE = ["identity", "history", "save"];

export const authConfig = {
  baseUrl: BASE_AUTH_URL,
  clientId: DEV_CLIENT_ID,
  redirectUri: DEV_REDIRECT_URI,
  type: AUTH_TYPE,
  duration: AUTH_DURATION,
  scope: AUTH_SCOPE.join(","),
};
