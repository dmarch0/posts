import { combineReducers } from "redux";
import { reducer } from "redux-form";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  test: () => 5,
  form: reducer,
  error: errorReducer,
  auth: authReducer
});
