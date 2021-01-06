import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./utils/reducers";

const storeReducers = combineReducers({
  user: reducers.userReducer,
  action: reducers.actionReducer,
  posts: reducers.postReducer,
  index: reducers.indexReducer,
  search: reducers.searchReducer,
});

const store = createStore(storeReducers, composeWithDevTools());

export default store;
