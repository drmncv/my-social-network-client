import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import profile, {
  setProfile,
  setStatus,
  addPhoto,
  getProfile,
  getStatus,
  uploadStatus,
  uploadPhoto,
} from "./profile";

const profileState = { testProfileData: "test" };
const mockStore = configureStore([thunk]);

//reducers
test("should handle SET_PROFILE", () => {
  const action = setProfile(profileState);
  expect(profile(null, action).profileInfo).toEqual(profileState);
});

test("should handle SET_STATUS", () => {
  const action = setStatus("test status");
  expect(profile(null, action).status).toBe("test status");
});

test("should handle ADD_PHOTO", () => {
  const action = addPhoto("some URL");
  const initialState = { profileInfo: { photos: { large: null } } };
  expect(profile(initialState, action).profileInfo.photos.large).toBe(
    "some URL"
  );
});

//actions
test("should set profile after fetching profile", async () => {
  const store = mockStore({});

  await store.dispatch(getProfile(1));
  const actions = store.getActions();
  expect(actions[0]).toEqual(setProfile(profileState));
});

test("should set status after fetching status", async () => {
  const store = mockStore({});

  await store.dispatch(getStatus(1));
  const actions = store.getActions();
  expect(actions[0]).toEqual(setStatus("test..."));
});

test("should set status after successfully uploading it", async () => {
  const store = mockStore();

  await store.dispatch(uploadStatus("test..."));
  const actions = store.getActions();
  expect(actions[0]).toEqual(setStatus("test..."));
});

test("should add photo after successfully uploading it", async () => {
  const store = mockStore();

  await store.dispatch(uploadPhoto("some file"));
  const actions = store.getActions();
  expect(actions[0]).toEqual(addPhoto("some URL"));
});
