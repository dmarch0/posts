import {
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  PROFILE_FETCH,
  FOLLOW_SUCCESS,
  FOLLOW_FETCH,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FETCH,
  UNFOLLOW_ERROR,
  FOLLOW_ERROR
} from "../actions/types";

const initialState = { loading: true, profile: {}, error: null };

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_FETCH:
    case FOLLOW_FETCH:
    case UNFOLLOW_FETCH:
      return { ...state, loading: true };
    case PROFILE_SUCCESS:
    case FOLLOW_SUCCESS:
    case UNFOLLOW_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case PROFILE_ERROR:
    case UNFOLLOW_ERROR:
    case FOLLOW_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
