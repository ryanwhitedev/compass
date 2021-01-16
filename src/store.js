import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./utils/reducers";

const storeReducers = combineReducers({
  user: reducers.userReducer,
  action: reducers.actionReducer,
  posts: reducers.postReducer,
  index: reducers.indexReducer,
  search: reducers.searchReducer,
  notification: reducers.notificationReducer,
});

const store = createStore(
  storeReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
