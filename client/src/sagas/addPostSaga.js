import { put, call, takeEvery } from "redux-saga/effects";

import axiosConfig from "../config/axios";
import { ADD_POST_FETCH, ADD_POST_ERROR } from "../actions/types";

function* addPostWatcher() {
  yield takeEvery(ADD_POST_FETCH, addPostWorker);
}

function* addPostWorker(action) {
  try {
    const { formValues, history } = action.payload;
    formValues.title = formValues.title ? formValues.title : "";
    formValues.text = formValues.text ? formValues.text : "";
    const response = yield call(axiosConfig.post, "", {
      query: `
                mutation {
                    addPost(postInput: {
                        title:"${formValues.title}",
                        text:"${formValues.text}"
                    }) {
                        text
                        title
                        _id
                        author {
                            _id
                        }
                    }
                }
            `
    });
    console.log(response);
    yield call(
      history.push,
      `/profile/${response.data.data.addPost.author._id}`
    );
  } catch (error) {
    const errors = JSON.parse(error.response.data.errors[0].message);
    yield put({ type: ADD_POST_ERROR, payload: errors });
  }
}

export default addPostWatcher;
