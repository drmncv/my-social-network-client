import users, { changeFollowed, setUsers } from "./users";

const usersState = {
  items: [
    {
      name: "test",
      id: 1,
      photos: { small: null, large: null },
      status: "my status",
      followed: false,
    },
  ],
  totalCount: 1,
  currentPage: 1,
};

test("should handle SET_USERS", () => {
  const { items, totalCount, currentPage } = usersState;
  const action = setUsers(items, totalCount, currentPage);
  expect(users(null, action)).toEqual(usersState);
});

test("should handle CHANGE_FOLLOWED", () => {
  const action = changeFollowed(1, true);
  expect(users(usersState, action).items[0].followed).toBe(true);
});
