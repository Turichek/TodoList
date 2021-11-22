import { SET_AUTH_VALUES, SET_ISAUTHENTICATED } from "./constants";

export const setAuthValuesAction = (payload) => ({ type: SET_AUTH_VALUES, payload });
export const setIsAuthenticatedAction = (payload) => ({ type: SET_ISAUTHENTICATED, payload });
