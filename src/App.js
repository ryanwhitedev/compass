import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Signin from "./components/Signin";
import Main from "./components/Main";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <Signin setUser={setUser} />
        </Route>
        <Route path="/">
          <Main user={user} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
