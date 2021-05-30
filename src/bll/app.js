import { getAuthorizedUserData } from "./auth";

//action types
const SET_INITIALIZED = "my-social-network-client/app/SET_INITIALIZED";

//initial state
const initialState = {
  initialized: false,
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

//action creators
export const setInitialized = () => ({ type: SET_INITIALIZED });

//side effects
export const initializeApp = () => async (dispatch) => {
  await dispatch(getAuthorizedUserData());
  dispatch(setInitialized());
};
