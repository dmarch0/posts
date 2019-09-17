import { takeEvery, call, put } from "redux-saga/effects";
import { EDIT_FETCH, EDIT_SUCCESS, EDIT_ERROR } from "../actions/types";

import axiosConfig from "../config/axios";

function* editProfileWatcher() {
  yield takeEvery(EDIT_FETCH, editProfileWorker);
}

function* editProfileWorker(action) {
  console.log("edit saga fired");
  const { formValues, history } = action.payload;

  try {
    const queryString = `
        mutation {
            editUser(editInput: {
                bio:"${formValues.bio}",
                avatar:"${formValues.avatar}",
                handle:"${formValues.handle}"
            }) {
            _id
            name
            avatar
            bio
            handle
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
    const response = yield call(axiosConfig.post, "", {
      query: queryString
    });
    yield call(history.push, `/profile/${response.data.data.editUser.handle}`);
    yield put({ type: EDIT_SUCCESS, payload: response.data.data.editUser });
  } catch (error) {
    yield put({
      type: EDIT_ERROR,
      payload: error.response.data.data.errors[0].message
    });
  }
}

export default editProfileWatcher;
