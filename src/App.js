import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import storage from "./utils/storage";
import Signin from "./components/Signin";
import Header from "./components/header/Header";
import Posts from "./components/Posts";
import GetStarted from "./components/GetStarted";
import { useDispatch } from "react-redux";
import { setUser, setPosts } from "./utils/actionCreators";

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
      <Header />
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/">
          {!user || !user.isAuthenticated ? <GetStarted /> : <Posts />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
