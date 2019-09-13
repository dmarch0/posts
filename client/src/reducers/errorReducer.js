import { LOGIN_ERROR, LOGIN_CLEAR } from "../actions/types";

const initialState = { login: {} };

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return { ...state, login: action.payload };
    case LOGIN_CLEAR:
      return { ...state, login: {} };
    default:
      return state;
  }
};

export default errorReducer;
