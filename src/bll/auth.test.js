import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import auth, {
  clearAuthorizedUserData,
  getAuthorizedUserData,
  login,
  logout,
  setAuthorizedUserData,
  setCaptchaUrl,
} from "./auth";

const userData = { id: 1, email: "test@test", login: "test" };
const mockStore = configureStore([thunk]);

const authorizedUserState = {
  isAuthorized: true,
  userData,
  captchaUrl: null,
};

const unauthorizedUserState = {
  isAuthorized: false,
  userData: { id: null, email: null, login: null },
  captchaUrl: null,
};

//reducers
test("should handle SET_USER_DATA", () => {
  const action = setAuthorizedUserData(userData);
  expect(auth(unauthorizedUserState, action)).toEqual(authorizedUserState);
});

test("should handle CLEAR_USER_DATA", () => {
  const action = clearAuthorizedUserData();
  expect(auth(authorizedUserState, action)).toEqual(unauthorizedUserState);
});

test("should handle SET_CAPTCHA_URL", () => {
  const action = setCaptchaUrl("test.url");
  expect(auth(unauthorizedUserState, action).captchaUrl).toBe("test.url");
});

//actions
test("should set authorized user data if authorized", async () => {
  sessionStorage.setItem("is-authenticated", "true");
  const store = mockStore({});

  await store.dispatch(getAuthorizedUserData());
  const actions = store.getActions();
  expect(actions[0]).toEqual(setAuthorizedUserData({ testUserData: "test" }));
});

test("should set authorized user data after login", async () => {
  sessionStorage.setItem("is-authenticated", "false");
  const store = mockStore({});

  await store.dispatch(login("test@test", "123"));
  const actions = store.getActions();
  expect(actions[0]).toEqual(setAuthorizedUserData({ testUserData: "test" }));
  expect(sessionStorage.getItem("is-authenticated")).toBe("true");
});

test("should clear authorized user data after logout", async () => {
  sessionStorage.setItem("is-authenticated", "true");
  const store = mockStore({});

  await store.dispatch(logout());
  const actions = store.getActions();
  expect(actions[0]).toEqual(clearAuthorizedUserData());
  expect(sessionStorage.getItem("is-authenticated")).toBe("false");
});
