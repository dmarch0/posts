import { all } from "redux-saga/effects";

import authSaga from "./authSaga";

function* helloSaga() {
  console.log("testing saga");
}

export default function* rootSaga() {
  yield all([helloSaga(), authSaga()]);
}
