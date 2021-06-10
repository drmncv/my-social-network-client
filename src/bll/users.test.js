import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import users, {
  changeFollowed,
  getUsers,
  setUsers,
  toggleFollowed,
} from "./users";

const mockStore = configureStore([thunk]);
const usersState = {
  items: [{ id: 1, followed: false }, "user2", "user3"],
  totalCount: 3,
  currentPage: 1,
};

//reducers
test("should handle SET_USERS", () => {
  const { items, totalCount, currentPage } = usersState;
  const action = setUsers(items, totalCount, currentPage);
  expect(users(null, action)).toEqual(usersState);
});

test("should handle CHANGE_FOLLOWED", () => {
  const action = changeFollowed(1, true);
  expect(users(usersState, action).items[0].followed).toBe(true);
});

//actions
test("should set users after fetching users", async () => {
  const store = mockStore({ users: { pageSize: 3 } });

  await store.dispatch(getUsers());
  const actions = store.getActions();
  expect(actions[0]).toEqual(setUsers(["user1", "user2", "user3"], 3, 1));
});

test("should change followed after following/unfollowing", async () => {
  const store = mockStore({});

  await store.dispatch(toggleFollowed(1, true));
  const actions = store.getActions();
  expect(actions[0]).toEqual(changeFollowed(1, true));
});
