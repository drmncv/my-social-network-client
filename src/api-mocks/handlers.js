import { rest } from "msw";
const baseUrl = "https://social-network.samuraijs.com/api/1.0/";

const userData = { id: 1, email: "test@test", login: "test" };

export const handlers = [
  // /auth/me GET
  rest.get(`${baseUrl}auth/me`, (req, res, ctx) => {
    // check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (isAuthenticated) {
      return res(
        ctx.json({
          data: userData,
          resultCode: 0,
        })
      );
    } else {
      return res(ctx.json({ resultCode: 1 }));
    }
  }),

  // /auth/login POST
  rest.post(`${baseUrl}auth/login`, (req, res, ctx) => {
    const { email, password } = req.body;
    if (email === "test@test" && password === "correctPassword") {
      sessionStorage.setItem("is-authenticated", true);
      return res(ctx.json({ resultCode: 0 }));
    } else {
      return res(
        ctx.json({ messages: ["Incorrect Email or Password"], resultCode: 1 })
      );
    }
  }),

  // /auth/login DELETE
  rest.delete(`${baseUrl}auth/login`, (req, res, ctx) => {
    sessionStorage.setItem("is-authenticated", false);
    return res(ctx.json({ resultCode: 0 }));
  }),

  // /users GET
  rest.get(`${baseUrl}users`, (req, res, ctx) => {
    return res(
      ctx.json({
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
      })
    );
  }),

  // /follow/{userId} POST
  rest.post(`${baseUrl}follow/1`, (req, res, ctx) => {
    return res(ctx.json({ resultCode: 0 }));
  }),

  // /follow/{userId} DELETE
  rest.delete(`${baseUrl}follow/1`, (req, res, ctx) => {
    return res(ctx.json({ resultCode: 0 }));
  }),

  // /profile/{userId} GET
  rest.get(`${baseUrl}profile/1`, (req, res, ctx) => {
    return res(ctx.json({ fullName: "testUser" }));
  }),

  // /profile/status/{userId} GET
  rest.get(`${baseUrl}profile/status/1`, (req, res, ctx) => {
    return res(ctx.json("test status"));
  }),
];
