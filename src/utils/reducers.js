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

const reducers = { userReducer, postReducer };
export default reducers;
