import { ADD_POST_SUCCESS, ADD_POST_FETCH, ADD_POST_ERROR } from "./types";

export const addPost = (formValues, history) => ({
  type: ADD_POST_FETCH,
  payload: { formValues, history }
});
