import React from "react";
import { authenticateUser } from "../services/auth";

const Main = () => {
  return <button onClick={() => authenticateUser()}>auth</button>;
};

export default Main;
