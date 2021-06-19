import { profileAPI } from "../api/api";

//action types
const SET_PROFILE = "my-social-network-client/users/SET_PROFILE";
const SET_STATUS = "my-social-network-client/users/GET_STATUS";
const ADD_PHOTO = "my-social-network-client/users/ADD_PHOTO";

//initial state
const initialState = {
  profileInfo: null,
  status: null,
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profileInfo: action.data,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.data,
      };
    case ADD_PHOTO:
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          photos: { ...state.profileInfo.photos, large: action.data },
        },
      };
    default:
      return state;
  }
};

//action creators
export const setProfile = (profileInfo) => ({
  type: SET_PROFILE,
  data: profileInfo,
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  data: status,
});

export const addPhoto = (image) => ({
  type: ADD_PHOTO,
  data: image,
});

//side effects
export const getProfile = (userId) => async (dispatch) => {
  const response = await profileAPI.getProfile(userId);
  dispatch(setProfile(response));
};

export const getStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response));
};

export const uploadStatus = (status) => async (dispatch) => {
  const response = await profileAPI.uploadStatus(status);
  if (response.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const uploadPhoto = (file) => async (dispatch) => {
  const response = await profileAPI.uploadPhoto(file);
  if (response.resultCode === 0) {
    dispatch(addPhoto(response.data.photos.large));
  }
};

export const updateProfile = (profile) => async (dispatch, getState) => {
  const response = await profileAPI.updateProfile(profile);
  if (response.resultCode === 0) {
    dispatch(getProfile(getState().profile.profileInfo.userId));
  } else {
    return response.messages;
  }
};

//selectors
export const selectProfileInfo = (state) => state.profile.profileInfo;
export const selectStatus = (state) => state.profile.status;
export const selectErrors = (state) => state.profile.errors;
