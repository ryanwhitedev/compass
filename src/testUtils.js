import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import reducers from "./utils/reducers";

const storeReducers = combineReducers({
  user: reducers.userReducer,
  action: reducers.actionReducer,
  posts: reducers.postReducer,
  index: reducers.indexReducer,
  search: reducers.searchReducer,
  notification: reducers.notificationReducer,
});

function render(
  ui,
  {
    initialState,
    store = createStore(storeReducers, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything from RTL
export * from "@testing-library/react";
// override render method
export { render };
