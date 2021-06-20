import { authAPI } from "../api/api";

//action types
const SET_USER_DATA = "my-social-network-client/auth/SET_USER_DATA";
const CLEAR_USER_DATA = "my-social-network-client/auth/CLEAR_USER_DATA";
const SET_CAPTCHA_URL = "my-social-network-client/auth/SET_CAPTCHA_URL";

//initial state
const initialState = {
  isAuthorized: false,
  userData: { id: null, email: null, login: null },
  captchaUrl: null,
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { isAuthorized: true, userData: action.data, captchaUrl: null };
    case CLEAR_USER_DATA:
      return initialState;
    case SET_CAPTCHA_URL:
      return { ...state, captchaUrl: action.data };
    default:
      return state;
  }
};

//action creators
export const setAuthorizedUserData = (data) => ({ type: SET_USER_DATA, data });
export const clearAuthorizedUserData = () => ({ type: CLEAR_USER_DATA });
export const setCaptchaUrl = (url) => ({ type: SET_CAPTCHA_URL, data: url });

//side effects
export const getAuthorizedUserData = () => async (dispatch) => {
  const response = await authAPI.me();
  if (response.resultCode === 0) {
    dispatch(setAuthorizedUserData(response.data));
  }
  return response;
};

export const login =
  (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
      await dispatch(getAuthorizedUserData());
    } else {
      if (response.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
      return response.messages;
    }
  };

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.resultCode === 0) {
    dispatch(clearAuthorizedUserData());
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await authAPI.getCaptchaUrl();
  dispatch(setCaptchaUrl(response.url));
};

//selectors
export const selectIsAuthorized = (state) => state.auth.isAuthorized;
export const selectAuthorizedUserData = (state) => state.auth.userData;
export const selectCaptchaUrl = (state) => state.auth.captchaUrl;
