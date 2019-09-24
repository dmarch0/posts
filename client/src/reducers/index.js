import { combineReducers } from "redux";
import { reducer } from "redux-form";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

export default combineReducers({
  test: () => 5,
  form: reducer,
  error: errorReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer
});
