import { authAPI } from "../api/api";

//action types
const SET_USER_DATA = "my-social-network-client/auth/SET_USER_DATA";
const CLEAR_USER_DATA = "my-social-network-client/auth/CLEAR_USER_DATA";

//initial state
const initialState = {
  isAuthorized: false,
  userData: { id: null, email: null, login: null },
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { isAuthorized: true, userData: action.data };
    case CLEAR_USER_DATA:
      return initialState;
    default:
      return state;
  }
};

//action creators
export const setAuthorizedUserData = (data) => ({ type: SET_USER_DATA, data });
export const clearAuthorizedUserData = () => ({ type: CLEAR_USER_DATA });

//side effects
export const getAuthorizedUserData = () => async (dispatch) => {
  const response = await authAPI.me();
  if (response.resultCode === 0) {
    dispatch(setAuthorizedUserData(response.data));
  }
  return response;
};

export const login = (email, password, rememberMe) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe);
  if (response.resultCode === 0) {
    await dispatch(getAuthorizedUserData());
  } else {
    return response.messages;
  }
};

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.resultCode === 0) {
    dispatch(clearAuthorizedUserData());
  }
};

//selectors
export const selectIsAuthorized = (state) => state.auth.isAuthorized;
export const selectAuthorizedUserData = (state) => state.auth.userData;
