import storage from "../utils/storage";
import { authConfig } from "../utils/config";
import { generateToken } from "../utils/common";

export const authenticateUser = () => {
  const user = {
    isAuthenticated: false,
    state: generateToken(36),
  };
  storage.saveUser(user);

  const { baseUrl, clientId, redirectUri, type, duration, scope } = authConfig;
  window.location = `${baseUrl}?client_id=${clientId}&response_type=${type}&state=${user.state}&redirect_uri=${redirectUri}&duration=${duration}&scope=${scope}`;
};
