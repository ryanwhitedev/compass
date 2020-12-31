import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import storage from "./utils/storage";
import Signin from "./components/Signin";
import Main from "./components/Main";

const App = () => {
  const [user, setUser] = useState(storage.loadUser());
  const [posts, setPosts] = useState(storage.loadPosts());

  console.log("user:", user);
  console.log("posts:", posts);

  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <Signin setUser={setUser} />
        </Route>
        <Route path="/">
          <Main user={user} posts={posts} setPosts={setPosts} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
