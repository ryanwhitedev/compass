import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import storage from "./utils/storage";
import Signin from "./components/Signin";
import Header from "./components/header/Header";
import Main from "./components/Main";
import { setUser, setPosts } from "./utils/actionCreators";
import Landing from "./components/Landing";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Setup user and posts if they exist in localStorage
  useEffect(() => {
    const storedUser = storage.loadUser();
    if (storedUser) {
      dispatch(setUser(storedUser));
    }

    const storedPosts = storage.loadPosts();
    if (storedPosts) {
      dispatch(setPosts(storedPosts));
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
