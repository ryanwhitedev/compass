import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import storage from "./utils/storage";
import Signin from "./components/Signin";
import Header from "./components/header/Header";
import Main from "./components/Main";
import { useDispatch } from "react-redux";
import { setUser, setPosts } from "./utils/actionCreators";

const App = () => {
  const dispatch = useDispatch();

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
          <Main />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
