import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "./Profile";

const profile = {
  aboutMe: "test...",
  fullName: "test test",
  photos: {
    large: null,
    small: null,
  },
};

render(<Profile authorizedUserId={1} profile={profile} status="status..." />);

test("Renders test profile correctly", () => {
  expect(screen.getByText("test test")).toBeInTheDocument();
  expect(screen.getByText("status...")).toBeInTheDocument();
  expect(screen.getByText("About me: test...")).toBeInTheDocument();
});
