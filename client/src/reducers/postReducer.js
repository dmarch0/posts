import {
  POST_FETCH,
  POST_SUCCESS,
  POST_ERROR,
  COMMENT_FETCH,
  COMMENT_SUCCESS,
  COMMENT_ERROR
} from "../actions/types";

const initialState = { loading: true, error: null, post: {} };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_FETCH:
    case COMMENT_FETCH:
      return { ...state, loading: true };
    case POST_SUCCESS:
    case COMMENT_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case POST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case COMMENT_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default postReducer;
