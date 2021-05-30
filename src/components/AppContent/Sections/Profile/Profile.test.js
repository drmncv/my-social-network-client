import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "./Profile";

const profile = {
  aboutMe: "some info",
  fullName: "my name",
  photos: {
    large: null,
    small: null,
  },
};

render(<Profile authorizedUserId="1" profile={profile} status="my status" />);

test("Renders test profile correctly", () => {
  expect(screen.getByText("my name")).toBeInTheDocument();
  expect(screen.getByText("my status")).toBeInTheDocument();
  expect(screen.getByText("About me: some info")).toBeInTheDocument();
});
