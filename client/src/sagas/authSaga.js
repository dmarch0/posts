import { takeEvery, call, put } from "redux-saga/effects";
import jwt_decode from "jwt-decode";
import axios from "axios";

import { LOGIN_FETCH, LOGIN_SUCCESS, LOGIN_ERROR } from "../actions/types";
import axiosInstance from "../config/axios";
import setAuthHeader from "../utils/setAuthHeader";

function* authWatcher() {
  yield takeEvery(LOGIN_FETCH, authWorker);
}

function* authWorker(action) {
  try {
    const response = yield call(axiosInstance.post, "", {
      query: `
        mutation {
            login(loginInput:{email:"${action.payload.email}", password:"${action.payload.password}"}) {
                token
            }
        }
    `
    });
    const token = response.data.data.login.token;
    setAuthHeader(token);
    localStorage.setItem("token", token);
    const decoded = jwt_decode(token);
    try {
      const avatarResponse = yield call(axios.get(decoded.avatar));
      console.log("hello");
    } catch (error) {
      decoded.avatar = false;
    }

    yield put({ type: LOGIN_SUCCESS, payload: decoded });
  } catch (error) {
    const errors = JSON.parse(error.response.data.errors[0].message);
    yield put({ type: LOGIN_ERROR, payload: errors });
  }
}

export default authWatcher;
