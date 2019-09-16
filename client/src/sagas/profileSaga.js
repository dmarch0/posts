import { takeEvery, call, put } from "redux-saga/effects";
import {
  PROFILE_FETCH,
  PROFILE_SUCCESS,
  PROFILE_ERROR
} from "../actions/types";
import axiosConfig from "../config/axios";
import axios from "axios";

function* profileWatcher() {
  yield takeEvery(PROFILE_FETCH, profileWorker);
}

function* profileWorker(action) {
  console.log("saga fired");
  try {
    const { id, handle } = action.payload;
    const queryString = `
    query {
        user(${
          id ? "userId: " + '"' + id + '"' : "handle" + '"' + handle + '"'
        }) {
            _id
            name
            avatar
            bio
            follows {
                name
                avatar
            }
            followers {
                name
                avatar
            }
            posts {
                title
                comments {
                    author {
                        name
                    }
                }
            }
        }
    }
`;
    const response = yield call(axiosConfig.post, "", { query: queryString });
    const { user } = response.data.data;
    try {
      const avatarResponse = yield call(axios.get(user.avatar));
    } catch (error) {
      user.avatar = false;
    }
    yield put({ type: PROFILE_SUCCESS, payload: user });
  } catch (error) {
    yield put({ type: PROFILE_ERROR, payload: error.data.message });
  }
}

export default profileWatcher;
