import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const SigninError = () => {
  const history = useHistory();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => setSeconds(seconds - 1), 1000);
    if (seconds <= 0) {
      history.push("/");
    }

    return () => clearInterval(countdown);
  }, [seconds, history]);

  return (
    <div className="md:container md:max-w-screen-xl md:mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold">User Authentication Failed</h1>
      <p>
        Click <Link to="/">here</Link> to return to home page or wait {seconds}{" "}
        {seconds === 1 ? "second" : "seconds"}.
      </p>
    </div>
  );
};

export default SigninError;
