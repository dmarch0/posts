import { POST_FETCH, POST_SUCCESS, POST_ERROR } from "../actions/types";

const initialState = { loading: true, error: null, post: {} };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_FETCH:
      return { ...state, loading: true };
    case POST_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case POST_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default postReducer;
