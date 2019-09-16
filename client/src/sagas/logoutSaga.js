import { takeEvery, call } from "redux-saga/effects";

import { LOGOUT } from "../actions/types";
import setAuthHeader from "../utils/setAuthHeader";

function* logoutWatcher() {
  yield takeEvery(LOGOUT, logoutWorker);
}

function* logoutWorker() {
  yield call(setAuthHeader, false);
  yield call([localStorage, "removeItem"], "token");
}

export default logoutWatcher;
