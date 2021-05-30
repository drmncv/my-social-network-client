import profile, { setProfile, setStatus } from "./profile";

const profileState = {
  fullName: "testName",
};

test("should handle SET_PROFILE", () => {
  const action = setProfile(profileState);
  expect(profile(null, action).profileInfo).toEqual(profileState);
});

test("should handle SET_STATUS", () => {
  const action = setStatus("test status");
  expect(profile(null, action).status).toBe("test status");
});
