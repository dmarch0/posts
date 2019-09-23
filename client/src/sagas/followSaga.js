import { call, put, takeEvery } from "redux-saga/effects";

import { FOLLOW_FETCH, FOLLOW_SUCCESS, FOLLOW_ERROR } from "../actions/types";
import axiosConfig from "../config/axios";

function* followWatcher() {
  yield takeEvery(FOLLOW_FETCH, followWorker);
}

function* followWorker(action) {
  try {
    const response = yield call(axiosConfig.post, "", {
      query: `
            mutation {
                follow(userId:"${action.payload}") {
                    _id
                    name
                    avatar
                    bio
                    follows {
                        name
                        avatar
                        _id
                    }
                    followers {
                        name
                        avatar
                        _id
                    }
                    posts {
                        _id
                        title
                        comments {
                            author {
                                name
                            }
                        }
                    }
                }
            }
          `
    });
    const { follow } = response.data.data;

    yield put({ type: FOLLOW_SUCCESS, payload: follow });
  } catch (error) {
    yield put({ type: FOLLOW_ERROR, payload: error.data.message });
  }
}

export default followWatcher;
