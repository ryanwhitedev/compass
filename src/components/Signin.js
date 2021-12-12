import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import storage from "../utils/storage";
import { getUrlParams, parseStateToken } from "../utils/common";
import { getUserData } from "../services/user";
import { getAccessToken } from "../services/auth";
import {
  setUser,
  setAction,
  clearUser,
  clearPosts,
} from "../utils/actionCreators";
import Loading from "./Loading";
import SigninError from "./SigninError";

let tokenCalls = 0;

const Signin = () => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = getUrlParams();
  const user = storage.loadUser();

  // Setup user data and action
  useEffect(() => {
    // Clear user state if authentication or fetching user data fails
    const setErrorAndClearUserData = () => {
      setError(true);
      storage.clearUser();
      dispatch(clearUser());
      storage.clearPosts();
      dispatch(clearPosts());
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
        storage.saveUser(user);
        history.replace("/");
        dispatch(setUser(user));
        dispatch(setAction(parseStateToken(state)));
      } catch (err) {
        console.error(err);
        setErrorAndClearUserData();
      }
    };

    const setupUser = async (params) =>  {
      const accessParams = await getAccessToken(params);
      if (!accessParams.error) {
        setupUserData({
          ...accessParams,
          state: params.state
        });
      } else {
        setErrorAndClearUserData();
      }
    }

    if (params && params.code && user && params.state === user.state && tokenCalls < 1) {
      tokenCalls++;
      setupUser(params);
    } else if (params.error && tokenCalls < 1) {
      setErrorAndClearUserData();
    }
  }, [user, params, dispatch, history]);

  // If no URL parameters, redirect was not from Reddit. Redirect to home page
  if (!params) {
    history.push("/");
  }

  return error ? <SigninError /> : <Loading message="Authenticating User..." />;
};

export default Signin;
