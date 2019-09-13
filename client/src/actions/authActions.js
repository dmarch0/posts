import { LOGIN_FETCH } from "./types";

export const loginFetch = formValues => ({
  type: LOGIN_FETCH,
  payload: formValues
});
