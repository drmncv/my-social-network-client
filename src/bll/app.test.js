import app, { setInitialized } from "./app.js";

//initial state
const initialState = {
  initialized: false,
};

// reducer tests
test("should handle SET_INITIALIZED", () => {
  const action = setInitialized();
  expect(app(initialState, action)).toEqual({ initialized: true });
});
