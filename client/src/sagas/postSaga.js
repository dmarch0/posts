import { call, put, takeEvery } from "redux-saga/effects";

import { POST_FETCH, POST_SUCCESS } from "../actions/types";
import axiosConfig from "../config/axios";

function* postWatcher() {
  yield takeEvery(POST_FETCH, postWorker);
}

function* postWorker(action) {
  try {
    console.log(action.payload);
    const response = yield call(axiosConfig.post, "", {
      query: `
            query {
                post(postId: "${action.payload}") {
                    title
                    text
                    date
                    _id
                    author {
                        name
                        _id
                    }
                    comments {
                        author {
                            name
                            _id
                        }
                        text
                        name
                        date
                    }
                }
            }
        `
    });
    yield put({ type: POST_SUCCESS, payload: response.data.data.post });
  } catch (error) {
    console.log(error.response);
  }
}

export default postWatcher;
