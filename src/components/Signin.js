import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import storage from "../utils/storage";
import { getUrlParams, parseStateToken } from "../utils/common";
import { getUserData } from "../services/user";
import { setUser, setAction } from "../utils/actionCreators";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = getUrlParams();
  const { state } = storage.loadUser();

  // Setup user and action
  useEffect(() => {
    const setupUserData = async ({
      access_token,
      token_type,
      expires_in,
      state,
    }) => {
      try {
        const userData = await getUserData(access_token);
        const user = {
          isAuthenticated: true,
          username: userData.name,
          accessToken: access_token,
          tokenType: token_type,
          tokenExpiry: Date.now() + expires_in * 1000, // may need to set this when sending initial request
        };
        dispatch(setUser(user));
        storage.saveUser(user);
        dispatch(setAction(parseStateToken(state)));
        history.push("/");
      } catch (err) {
        console.error(err);
      }
    };

    if (!params.error && params.state === state) {
      setupUserData(params);
    }
  }, [state, params, dispatch, history]);

  if (params.error) {
    return <h1>{params.error}</h1>;
  }
  if (params.state !== state) {
    return <h1>state mismatch</h1>;
  }

  return <h1>authenticating user...</h1>;
};

export default Signin;
