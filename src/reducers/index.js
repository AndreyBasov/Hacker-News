import { combineReducers } from "redux";

const postIdsReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_IDS":
      return action.payload;
    default:
      return state;
  }
};

const fetchPostReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_POST":
      const newArray = [...state];
      newArray[action.index] = action.payload;
      return newArray;
    default:
      return state;
  }
};

const fetchCommentReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_COMMENT":
      const newArray = [...state];
      newArray[action.index] = action.payload;
      return newArray;
    default:
      return state;
  }
};

export default combineReducers({
  ids: postIdsReducer,
  posts: fetchPostReducer,
  comments: fetchCommentReducer,
});
