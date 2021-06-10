import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

const loginMock = jest.fn(() => Promise.resolve(""));

render(<Login authorizedUserId={1} isAuth={false} login={loginMock} />);

test("Collects login data from the form and passes it to login callback", () => {
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "test@test" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "test" },
  });
  fireEvent.change(screen.getByLabelText(/remember me/i), {
    target: { checked: true },
  });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(loginMock.mock.calls[0]).toEqual(["test@test", "test", true]);
});
