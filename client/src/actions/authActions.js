import { LOGIN_FETCH, LOGOUT } from "./types";

export const loginFetch = (formValues, history) => {
  return {
    type: LOGIN_FETCH,
    payload: { formValues, history }
  };
};

export const logout = () => ({
  type: LOGOUT
});
