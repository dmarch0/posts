import {
  PROFILE_FETCH,
  EDIT_FETCH,
  FOLLOW_FETCH,
  UNFOLLOW_FETCH
} from "./types";

export const profileFetch = (id, handle) => {
  if (id) {
    return { type: PROFILE_FETCH, payload: { id } };
  } else if (handle) {
    return { type: PROFILE_FETCH, payload: { handle } };
  }
};

export const editFetch = (formValues, history) => ({
  type: EDIT_FETCH,
  payload: { formValues, history }
});

export const followUser = userId => ({
  type: FOLLOW_FETCH,
  payload: userId
});

export const unfollowUser = userId => ({
  type: UNFOLLOW_FETCH,
  payload: userId
});
