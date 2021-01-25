const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.data.user;
    case "CLEAR_USER":
      return null;
    default:
      return state;
  }
};

const actionReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_ACTION":
      return action.data.action;
    case "CLEAR_ACTION":
      return null;
    default:
      return state;
  }
};

const postReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_POSTS":
      return action.data.posts;
    case "CLEAR_POSTS":
      return [];
    default:
      return state;
  }
};

const indexReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_INDEX":
      return action.data.index;
    case "CLEAR_INDEX":
      return null;
    default:
      return state;
  }
};

const searchReducer = (state = null, action) => {
  switch (action.type) {
    case "SEARCH":
      return action.data.search;
    case "CLEAR_SEARCH":
      return null;
    default:
      return state;
  }
};

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.notification;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const themeReducer = (state = "light", action) => {
  switch (action.type) {
    case "SET_THEME":
      return action.data.theme;
    default:
      return state;
  }
};

const reducers = {
  userReducer,
  actionReducer,
  postReducer,
  indexReducer,
  searchReducer,
  notificationReducer,
  themeReducer,
};
export default reducers;
