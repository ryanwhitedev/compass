import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import storage from "../utils/storage";
import { getUrlParams } from "../utils/common";
import { getUserData } from "../services/user";

const Signin = ({ setUser }) => {
  const history = useHistory();
  const params = getUrlParams();
  const { state } = storage.loadUser();

  // Set user and redirect
  useEffect(() => {
    const setupUserData = async ({ access_token, token_type, expires_in }) => {
      try {
        const userData = await getUserData(access_token);
        const user = {
          isAuthenticated: true,
          username: userData.name,
          accessToken: access_token,
          tokenType: token_type,
          expires: Date.now() + expires_in * 1000, // may need to set this when sending initial request
        };
        setUser(user);
        storage.saveUser(user);
        history.push("/");
      } catch (err) {
        console.error(err);
      }
    };

    if (!params.error && params.state === state) {
      setupUserData(params);
    }
  }, [state, params, setUser, history]);

  if (params.error) {
    return <h1>{params.error}</h1>;
  }
  if (params.state !== state) {
    return <h1>state mismatch</h1>;
  }

  return <h1>authenticating user...</h1>;
};

export default Signin;
