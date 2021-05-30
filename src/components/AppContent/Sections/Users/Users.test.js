import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Users from "./Users";

const users = {
  items: [
    {
      name: "Ivan Ivanov",
      id: 1,
      photos: { small: null, large: null },
      status: "Learning React",
      followed: false,
    },
    {
      name: "Vladimir Petrov",
      id: 2,
      photos: { small: null, large: null },
      status: "Hi there",
      followed: false,
    },
  ],
  totalCount: 1234,
  pageSize: 5,
  currentPage: 1,
};

const getUsers = jest.fn();

test("Renders test users data correctly", () => {
  act(() => {
    render(
      <BrowserRouter>
        <Users
          users={users.items}
          count={users.totalCount}
          pageSize={users.pageSize}
          currentPage={users.currentPage}
          getUsers={getUsers}
        />
      </BrowserRouter>
    );
  });
  expect(screen.getByText("Ivan Ivanov")).toBeInTheDocument();
  expect(screen.getByText("Vladimir Petrov")).toBeInTheDocument();
  expect(screen.getByText("Learning React")).toBeInTheDocument();
  expect(screen.getByText(Math.ceil(1234 / 5))).toBeInTheDocument();
  expect(getUsers).toHaveBeenCalled();
});
