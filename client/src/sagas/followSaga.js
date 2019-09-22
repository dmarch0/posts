import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { FOLLOW_FETCH } from "../actions/types";
import axiosConfig from "../config/axios";
import checkAvatar from "../utils/checkAvatar";

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
          `
    });
    console.log(response);
  } catch (error) {
    console.log(error.response);
  }
}

export default followWatcher;
