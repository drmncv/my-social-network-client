import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginBlock from "./LoginBlock";

test("Renders correctly for unauthorized user", () => {
  render(
    <BrowserRouter>
      <LoginBlock isAuth={false} />
    </BrowserRouter>
  );
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(screen.queryByText(/logout/i)).toBeNull();
});

test("Renders correctly for authorized user", () => {
  render(
    <BrowserRouter>
      <LoginBlock isAuth={true} login="test" />
    </BrowserRouter>
  );
  expect(screen.getByText("test")).toBeInTheDocument();
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
  expect(screen.queryByText(/login/i)).toBeNull();
});
