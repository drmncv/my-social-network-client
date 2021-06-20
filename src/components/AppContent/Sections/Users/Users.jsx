import React from "react";
import PropTypes from "prop-types";
import Pagination from "./Pagination";
import UserItem from "./UserItem";

export default class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div>
        <div>
          <Pagination
            count={this.props.count}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            getUsers={this.props.getUsers}
          />
        </div>
        <div>
          {this.props.users.map((item) => (
            <UserItem
              key={item.id}
              {...item}
              toggleFollowed={this.props.toggleFollowed}
            />
          ))}
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  count: PropTypes.number,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  getUsers: PropTypes.func.isRequired,
  toggleFollowed: PropTypes.func.isRequired,
};
