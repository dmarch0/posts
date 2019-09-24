import {
  ADD_POST_SUCCESS,
  ADD_POST_FETCH,
  ADD_POST_ERROR,
  POST_FETCH,
  COMMENT_FETCH
} from "./types";

export const addPost = (formValues, history) => ({
  type: ADD_POST_FETCH,
  payload: { formValues, history }
});

export const postFetch = postId => ({
  type: POST_FETCH,
  payload: postId
});

export const commentFetch = (commentText, postId) => ({
  type: COMMENT_FETCH,
  payload: { commentText, postId }
});
