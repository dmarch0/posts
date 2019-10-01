import { takeEvery, call, put } from "redux-saga/effects";

import {
  COMMENT_FETCH,
  COMMENT_SUCCESS,
  COMMENT_ERROR
} from "../actions/types";
import axiosConfig from "../config/axios";

function* commentWatcher() {
  yield takeEvery(COMMENT_FETCH, commentWorker);
}

function* commentWorker(action) {
  try {
    const { commentText, postId } = action.payload;
    const response = yield call(axiosConfig.post, "", {
      query: `
            mutation {
                commentPost(commentText: "${
                  commentText ? commentText : ""
                }", postId: "${postId}") {
                    title
                    text
                    date
                    _id
                    author {
                        name
                        _id
                    }
                    comments {
                        author 
                        text
                        name
                        date
                    }  
                }
            }
        `
    });
    yield put({
      type: COMMENT_SUCCESS,
      payload: response.data.data.commentPost
    });
  } catch (error) {
    yield put({
      type: COMMENT_ERROR,
      payload: error.response.data.errors[0].message
    });
  }
}

export default commentWatcher;
