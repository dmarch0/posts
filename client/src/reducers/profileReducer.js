import {
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  PROFILE_FETCH
} from "../actions/types";

const initialState = { loading: true, profile: {}, error: null };

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_FETCH:
      return { ...state, loading: true };
    case PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case PROFILE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
