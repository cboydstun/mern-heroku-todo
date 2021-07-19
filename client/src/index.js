import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { UserStateProvider } from "./context/StateProvider";
import reducer, { initialState } from "./context/reducer";

ReactDOM.render(
  <UserStateProvider initialState={initialState} reducer={reducer}>
    <App />
  </UserStateProvider>,
  document.getElementById("root")
);