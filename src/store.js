import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./utils/reducers";

const storeReducers = combineReducers({
  user: reducers.userReducer,
  posts: reducers.postReducer,
});

const store = createStore(storeReducers, composeWithDevTools());

export default store;
