import auth, { clearAuthorizedUserData, setAuthorizedUserData } from "./auth";

const userData = { id: 1, email: "test@test", login: "test" };

const authorizedUserState = {
  isAuthorized: true,
  userData,
};

const unauthorizedUserState = {
  isAuthorized: false,
  userData: { id: null, email: null, login: null },
};

test("should handle SET_USER_DATA", () => {
  const action = setAuthorizedUserData(userData);
  expect(auth(unauthorizedUserState, action)).toEqual(authorizedUserState);
});

test("should handle CLEAR_USER_DATA", () => {
  const action = clearAuthorizedUserData();
  expect(auth(authorizedUserState, action)).toEqual(unauthorizedUserState);
});
