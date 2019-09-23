import { put, call, takeEvery } from "redux-saga/effects";

import axiosConfig from "../config/axios";
import {
  UNFOLLOW_FETCH,
  UNFOLLOW_ERROR,
  UNFOLLOW_SUCCESS
} from "../actions/types";

function* unfollowWatcher() {
  yield takeEvery(UNFOLLOW_FETCH, unfollowWorker);
}

function* unfollowWorker(action) {
  try {
    const response = yield call(axiosConfig.post, "", {
      query: `
                mutation {
                    unfollow(userId:"${action.payload}") {
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
    const { unfollow } = response.data.data;
    yield put({ type: UNFOLLOW_SUCCESS, payload: unfollow });
  } catch (error) {
    yield put({ type: UNFOLLOW_ERROR, payload: error.data.message });
  }
}

export default unfollowWatcher;
