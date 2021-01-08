import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import storage from "../utils/storage";
import { getUrlParams, parseStateToken } from "../utils/common";
import { getUserData } from "../services/user";
import { setUser, setAction, clearUser } from "../utils/actionCreators";
import Loading from "./Loading";
import SigninError from "./SigninError";

const Signin = () => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = getUrlParams();
  const user = storage.loadUser();

  // Setup user data and action
  useEffect(() => {
    // Clear user state if authentication or fetching user data fails
    const setErrorAndClearUser = () => {
      setError(true);
      storage.clearUser();
      dispatch(clearUser());
    };

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
          tokenExpiry: Date.now() + expires_in * 1000,
        };
        dispatch(setUser(user));
        storage.saveUser(user);
        dispatch(setAction(parseStateToken(state)));
        history.push("/");
      } catch (err) {
        console.error(err);
        setErrorAndClearUser();
      }
    };

    if (params && !params.error && user && params.state === user.state) {
      setupUserData(params);
    } else {
      setErrorAndClearUser();
    }
  }, [user, params, dispatch, history]);

  // If no URL parameters, redirect was not from Reddit. Redirect to home page
  if (!params) {
    history.push("/");
  }

  return error ? <SigninError /> : <Loading message="Authenticating User..." />;
};

export default Signin;
