import {
  LOGIN_ERROR,
  LOGIN_CLEAR,
  EDIT_ERROR,
  EDIT_CLEAR
} from "../actions/types";

const initialState = { login: {}, edit: {} };

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
    default:
      return state;
  }
};

export default errorReducer;
