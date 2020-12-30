import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUrlParams } from "../utils/common";

const Signin = ({ user, setUser }) => {
  const history = useHistory();
  const params = getUrlParams();

  // Set user and redirect
  useEffect(() => {
    if (!user || !user.isAuthenticated) {
      setUser({
        isAuthenticated: true,
        accessToken: params.access_token,
        tokenType: params.token_type,
        expires: Math.floor(Date.now() / 1000) + params.expires_in, // may need to set this when sending initial request
      });
      history.push("/");
    }
  }, [history, params, user, setUser]);

  return <h1>authenticating user...</h1>;
};

export default Signin;
