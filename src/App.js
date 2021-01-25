import React, { useLayoutEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import storage from "./utils/storage";
import Header from "./components/header/Header";
import Landing from "./components/Landing";
import Signin from "./components/Signin";
import Main from "./components/Main";
import Notification from "./components/Notification";
import { setUser, setPosts, setTheme } from "./utils/actionCreators";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Setup user and posts if they exist in localStorage
  useLayoutEffect(() => {
    const storedUser = storage.loadUser();
    if (storedUser) {
      dispatch(setUser(storedUser));
    }

    const storedPosts = storage.loadPosts();
    if (storedPosts) {
      dispatch(setPosts(storedPosts));
    }

    const storedTheme = storage.loadTheme();
    if (storedTheme) {
      dispatch(setTheme(storedTheme));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="fixed inset-0 bg-contour bg-white text-black dark:bg-black dark:text-white overflow-y-auto">
        <Header />
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/">
            {!user || !user.isAuthenticated ? (
              <Landing />
            ) : (
              <Main user={user} />
            )}
          </Route>
        </Switch>
        <Notification />
      </div>
    </Router>
  );
};

export default App;
