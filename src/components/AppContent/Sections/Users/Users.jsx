import React from "react";
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
