import { connect } from "react-redux";
import {
  getUsers,
  selectCurrentPage,
  selectPageSize,
  selectUsers,
  selectUsersCount,
  toggleFollowed,
} from "../../../../bll/users";
import Users from "./Users";

const mapStateToProps = (state) => ({
  users: selectUsers(state),
  count: selectUsersCount(state),
  pageSize: selectPageSize(state),
  currentPage: selectCurrentPage(state),
});

export default connect(mapStateToProps, { getUsers, toggleFollowed })(Users);
