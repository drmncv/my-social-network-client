import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import store from "../../../../bll/_store";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import LoginContainer from "./LoginContainer";

const history = createMemoryHistory();

render(
  <Router history={history}>
    <Provider store={store}>
      <Route path="/login" component={LoginContainer} />
      <Route path="/profile">Profile page</Route>
    </Provider>
  </Router>
);

beforeEach(() => {
  sessionStorage.setItem("is-authenticated", false);
  history.push("/login");
});

test("Successful login flow", async () => {
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "test@test" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "correctPassword" },
  });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => screen.getByText(/profile page/i));
  expect(sessionStorage.getItem("is-authenticated")).toBe("true");
});
