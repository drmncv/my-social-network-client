import { rest } from "msw";
const baseUrl = "https://social-network.samuraijs.com/api/1.0/";

export const handlers = [
  // /auth/me GET
  rest.get(`${baseUrl}auth/me`, (req, res, ctx) => {
    // check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (isAuthenticated === "true") {
      return res(
        ctx.json({
          data: { testUserData: "test" },
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
    if (email === "test@test" && password === "123") {
      sessionStorage.setItem("is-authenticated", "true");
      return res(ctx.json({ resultCode: 0 }));
    } else {
      return res(ctx.json({ resultCode: 1 }));
    }
  }),

  // /auth/login DELETE
  rest.delete(`${baseUrl}auth/login`, (req, res, ctx) => {
    sessionStorage.setItem("is-authenticated", "false");
    return res(ctx.json({ resultCode: 0 }));
  }),

  // /users GET
  rest.get(`${baseUrl}users`, (req, res, ctx) => {
    return res(
      ctx.json({
        items: ["user1", "user2", "user3"],
        totalCount: 3,
        error: null,
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
    return res(ctx.json({ testProfileData: "test" }));
  }),

  // /profile/status/{userId} GET
  rest.get(`${baseUrl}profile/status/1`, (req, res, ctx) => {
    return res(ctx.json("test..."));
  }),

  // /profile/status PUT
  rest.put(`${baseUrl}profile/status`, (req, res, ctx) => {
    return res(ctx.json({ resultCode: 0 }));
  }),

  // /profile/photo PUT
  rest.put(`${baseUrl}profile/photo`, (req, res, ctx) => {
    return res(
      ctx.json({ resultCode: 0, data: { photos: { large: "some URL" } } })
    );
  }),

  // /profile PUT
  rest.put(`${baseUrl}profile`, (req, res, ctx) => {
    return res(ctx.json({ resultCode: 0 }));
  }),
];
