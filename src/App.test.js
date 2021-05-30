import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "./App";
import store from "./bll/_store";

const history = createMemoryHistory();
sessionStorage.setItem("is-authenticated", false);

test("Successful login flow", async () => {
  act(() => {
    render(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
  });

  await waitFor(() => screen.getByText(/users/i));
});
