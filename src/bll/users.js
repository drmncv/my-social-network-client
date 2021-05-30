import { usersAPI } from "../api/api";

//action types
const SET_USERS = "my-social-network-client/users/SET_USERS";
const CHANGE_FOLLOWED = "my-social-network-client/users/CHANGE_FOLLOWED";

//initial state
const initialState = {
  items: [],
  totalCount: null,
  pageSize: 5,
  currentPage: 1,
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        items: action.items,
        totalCount: action.totalCount,
        currentPage: action.page,
      };
    case CHANGE_FOLLOWED:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.id) {
            return { ...item, followed: action.isFollowed };
          } else {
            return item;
          }
        }),
      };
    default:
      return state;
  }
};

//action creators
export const setUsers = (items, totalCount, page) => ({
  type: SET_USERS,
  items,
  totalCount,
  page,
});

export const changeFollowed = (id, isFollowed) => ({
  type: CHANGE_FOLLOWED,
  id,
  isFollowed,
});

//side effects
export const getUsers = (page) => async (dispatch, getState) => {
  const pageSize = getState().users.pageSize;
  if (!page) page = 1;
  const { items, totalCount, error } = await usersAPI.getUsers(pageSize, page);
  if (!error) {
    dispatch(setUsers(items, totalCount, page));
  } else {
    return error;
  }
};

export const toggleFollowed = (id, follow) => async (dispatch) => {
  const response = await usersAPI.toggleFollowed(id, follow);
  if (response.resultCode === 0) {
    dispatch(changeFollowed(id, follow));
  }
};

//selectors
export const selectUsers = (state) => state.users.items;
export const selectUsersCount = (state) => state.users.totalCount;
export const selectPageSize = (state) => state.users.pageSize;
export const selectCurrentPage = (state) => state.users.currentPage;
