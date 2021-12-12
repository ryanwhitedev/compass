import storage from "../utils/storage";
import { authConfig } from "../utils/config";
import { generateToken } from "../utils/common";

export const isUserAuthenticated = ({ tokenExpiry }) =>
  tokenExpiry > Date.now();

// `state` is returned with the authentication response. `action` is used to determine which
// action to complete following successful authentication
export const authenticateUserWithAction = (action) => {
  const user = {
    isAuthenticated: false,
    state: generateToken(36, action),
  };
  storage.saveUser(user);

  const { baseUrl, clientId, redirectUri, type, duration, scope } = authConfig;
  window.location = `${baseUrl}?client_id=${clientId}&response_type=${type}&state=${user.state}&redirect_uri=${redirectUri}&duration=${duration}&scope=${scope}`;
};

export const getAccessToken = async ({ code }) => {
  const body = `grant_type=authorization_code&code=${code}&redirect_uri=${authConfig.redirectUri}`;
  const endpoint = 'https://www.reddit.com/api/v1/access_token';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(authConfig.clientId + ':'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  });
  const json = await response.json();
  return json;
};
