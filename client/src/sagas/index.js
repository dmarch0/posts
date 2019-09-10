import { all } from "redux-saga/effects";

function* helloSaga() {
  console.log("testing saga");
}

export default function* rootSaga() {
  yield all([helloSaga()]);
}
