import { authAPI, profileAPI, usersAPI } from "./api";

const userData = { id: 1, email: "test@test", login: "test" };

test("API method me()", async () => {
  sessionStorage.setItem("is-authenticated", true);
  const response = await authAPI.me();
  expect(response.resultCode).toBe(0);
  expect(response.data).toEqual(userData);
});

test("API method login()", async () => {
  sessionStorage.setItem("is-authenticated", false);
  let response = await authAPI.login("test@test", "incorrectPassword", true);
  expect(sessionStorage.getItem("is-authenticated")).toBe("false");
  expect(response.resultCode).toBe(1);

  expect(response.messages).toEqual(["Incorrect Email or Password"]);
  response = await authAPI.login("test@test", "correctPassword", true);
  expect(sessionStorage.getItem("is-authenticated")).toBe("true");
  expect(response.resultCode).toBe(0);
});

test("API method logout()", async () => {
  sessionStorage.setItem("is-authenticated", true);
  await authAPI.logout();
  expect(sessionStorage.getItem("is-authenticated")).toBe("false");
});

test("API method getUsers()", async () => {
  let response = await usersAPI.getUsers();
  expect(response).toEqual({
    items: [
      {
        name: "Ivan Ivanov",
        id: 1,
        photos: { small: null, large: null },
        status: "Learning React",
        followed: false,
      },
      {
        name: "Vladimir Petrov",
        id: 2,
        photos: { small: null, large: null },
        status: "Hi there",
        followed: false,
      },
    ],
    totalCount: 1234,
    pageSize: 5,
    currentPage: 1,
  });
});

test("API method toggleFollowed()", async () => {
  const response = await usersAPI.toggleFollowed(1, true);
  expect(response.resultCode).toBe(0);
});

test("API method getProfile()", async () => {
  const response = await profileAPI.getProfile(1);
  expect(response.fullName).toBe("testUser");
});

test("API method getStatus()", async () => {
  const response = await profileAPI.getStatus(1);
  expect(response).toBe("test status");
});
