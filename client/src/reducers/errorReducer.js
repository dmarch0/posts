import {
  LOGIN_ERROR,
  LOGIN_CLEAR,
  EDIT_ERROR,
  EDIT_CLEAR,
  ADD_POST_ERROR,
  ADD_POST_SUCCESS
} from "../actions/types";

const initialState = { login: {}, edit: {}, addPost: {} };

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return { ...state, login: action.payload };
    case LOGIN_CLEAR:
      return { ...state, login: {} };
    case EDIT_ERROR:
      return { ...state, edit: action.payload };
    case EDIT_CLEAR:
      return { ...state, edit: {} };
    case ADD_POST_ERROR:
      return { ...state, addPost: action.payload };
    case ADD_POST_SUCCESS:
      return { ...state, addPost: {} };
    default:
      return state;
  }
};

export default errorReducer;
