import { LOGIN_SUCCESS, LOGOUT, SET_AUTH } from "../actions/types";

const initialState = { isAuth: false };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, isAuth: action.payload };
    case LOGIN_SUCCESS:
      return { ...action.payload, isAuth: true };
    case LOGOUT:
      return { isAuth: false };
    default:
      return state;
  }
};

export default authReducer;
