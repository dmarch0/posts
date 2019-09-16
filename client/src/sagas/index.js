import { all } from "redux-saga/effects";

import authSaga from "./authSaga";
import logoutSaga from "./logoutSaga";
import profileSaga from "./profileSaga";

function* helloSaga() {
  console.log("testing saga");
}

export default function* rootSaga() {
  yield all([helloSaga(), authSaga(), logoutSaga(), profileSaga()]);
}
